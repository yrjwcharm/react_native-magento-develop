import { ADMIN_TYPE } from '../../types';

const PAGE_SIZE = 10;

const getSortFieldName = (sortOrder) => {
  switch (sortOrder) {
    case '0':
    case '1':
      return 'name';
    case '2':
    case '3':
      return 'price';
    default:
      return '';
  }
};

const getSortDirection = (sortOrder) => {
  switch (sortOrder) {
    case '0':
    case '2':
      return 'ASC';
    case '1':
    case '3':
      return 'DESC';
    default:
      return '';
  }
};

export default magento => ({
  getStoreConfig: () => (
    new Promise((resolve, reject) => {
      const path = '/V1/store/storeConfigs';

      magento.get(path, undefined, undefined, ADMIN_TYPE)
        .then((data) => {
          resolve(data);
          magento.setStoreConfig(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

  getCategoryTree: () => (
    new Promise((resolve, reject) => {
      const path = '/V1/categories';

      magento.get(path, undefined, undefined, ADMIN_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

  getCategoryProducts: (id, offset = 1, sortOrder, pageSize = PAGE_SIZE) => magento.admin.getProductsWithAttribute('category_id', id, offset, sortOrder, pageSize, 'eq'),

  getProductsWithAttribute: (
    attributeCode,
    attributeValue,
    offset = 1,
    sortOrder,
    pageSize = PAGE_SIZE,
    conditionType = 'like'
  ) => {
    const currentPage = parseInt(offset / pageSize, 10) + 1;
    const params = {
      'searchCriteria[filterGroups][0][filters][0][field]': attributeCode,
      'searchCriteria[filterGroups][0][filters][0][value]': attributeValue,
      'searchCriteria[filterGroups][0][filters][0][conditionType]': conditionType,
      'searchCriteria[filterGroups][1][filters][0][field]': 'visibility',
      'searchCriteria[filterGroups][1][filters][0][value]': '4',
      'searchCriteria[filterGroups][1][filters][0][conditionType]': 'eq',
      'searchCriteria[pageSize]': pageSize,
      'searchCriteria[currentPage]': currentPage,
    };
    if (sortOrder) {
      params['searchCriteria[sortOrders][0][field]'] = getSortFieldName(sortOrder);
      params['searchCriteria[sortOrders][0][direction]'] = getSortDirection(sortOrder);
    }
    return magento.admin.getProductsWithSearchCritaria(params);
  },

  getProductsWithSearchCritaria: params => (
    new Promise((resolve, reject) => {
      const path = '/V1/products';

      magento.get(path, params, undefined, ADMIN_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

  getProductBySku: sku => (
    new Promise((resolve, reject) => {
      const path = `/V1/products/${sku}`;

      magento.get(path, undefined, undefined, ADMIN_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

  getConfigurableChildren: sku => (
    new Promise((resolve, reject) => {
      const path = `/V1/configurable-products/${sku}/children`;
      
      magento.get(path, undefined, undefined, ADMIN_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

  getConfigurableProductOptions: sku => (
    new Promise((resolve, reject) => {
      const path = `/V1/configurable-products/${sku}/options/all`;

      magento.get(path, undefined, undefined, ADMIN_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

  getAttributeByCode: attributeId => (
    new Promise((resolve, reject) => {
      const path = `/V1/products/attributes/${attributeId}`;

      magento.get(path, undefined, undefined, ADMIN_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

  getProductMedia: sku => (
    new Promise((resolve, reject) => {
      const path = `/V1/products/${sku}/media`;

      magento.get(path, undefined, undefined, ADMIN_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

  getCmsBlock: id => (
    new Promise((resolve, reject) => {
      const path = `/V1/cmsBlock/${id}`;

      magento.get(path, undefined, undefined, ADMIN_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

  getCountries: () => (
    new Promise((resolve, reject) => {
      const path = '/V1/directory/countries';

      magento.get(path, undefined, undefined, ADMIN_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

  getOrderList: customerId => (
    new Promise((resolve, reject) => {
      const path = '/V1/orders';

      const params = {
        'searchCriteria[filterGroups][0][filters][0][field]': 'customer_id',
        'searchCriteria[filterGroups][0][filters][0][value]': customerId
      };

      magento.get(path, params, undefined, ADMIN_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

  getOrderDetail: orderId => (
    new Promise((resolve, reject) => {
      const path = `/V1/orders/${orderId}`;

      magento.get(path, undefined, undefined, ADMIN_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

});

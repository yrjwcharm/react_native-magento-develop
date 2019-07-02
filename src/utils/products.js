import { magento } from '../magento';
import { ImageSliderItem } from '../components';

export const getProductThumbnailFromAttribute = (product) => {
  let result = magento.getProductMediaUrl();
  product.custom_attributes.some((attribute) => {
    if (attribute.attribute_code === 'thumbnail') {
      result += attribute.value;
      return true;
    }
  });
  return result;
};

export const getPriceFromChildren = (products) => {
  if (products) {
    const newPrice = products.reduce((minPrice, child) => {
      if (!minPrice) {
        return child.price;
      }
      if (minPrice > child.price) {
        return child.price;
      }
      return minPrice;
    }, false);

    return newPrice;
  }
  return 0;
};

export const parseImageArray = slider => slider.map(item => new ImageSliderItem(item.label, item.file, ''));

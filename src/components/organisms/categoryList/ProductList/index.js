import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { ProductListItem, LoadingView, GenericTemplate } from '../../..';
import Status from '../../../../magento/Status';

const ProductList = ({
  products, // Change it to items
  stateAccessor,
  showHorizontalList,
  columnCount,
  status,
  isLoadingMoreProducts,
  canLoadMoreProducts,
  loadProducts,
  openSelectedProduct,
  updateItem,
  loadFactor,
  errorMessage,
}) => {
  console.log('-------------------------');
  console.log('Inside ProductList render');
  console.log('-------------------------');
  useEffect(() => {
    // componentDidMount
    if (status === Status.DEFAULT) {
      loadProducts(loadFactor);
    }
  }, []);

  const getLayoutManager = () => {
    const layoutManager = {};
    if (showHorizontalList) {
      layoutManager.horizontal = true;
      layoutManager.showsHorizontalScrollIndicator = false;
    } else {
      layoutManager.numColumns = columnCount;
    }
    return layoutManager;
  };

  const renderRow = ({ item, index }) => {
    return (
      <ProductListItem
        item={item}
        stateAccessor={stateAccessor}
        openSelectedProduct={openSelectedProduct}
        columnCount={columnCount}
        updateItem={updateItem}
      />
    );
  };

  const renderFooter = () => {
    if (canLoadMoreProducts) {
      return <LoadingView size="small" />;
    }
    return null;
  };

  const onEndReached = () => {
    if (isLoadingMoreProducts !== Status.LOADING && canLoadMoreProducts) {
      const sortOrder = null;
      loadProducts(loadFactor, products.length, sortOrder);
    }
  };

  return (
    <GenericTemplate
      isScrollable={false}
      status={status}
      errorMessage={errorMessage}
      style={styles.container}
    >
      <FlatList
        {...getLayoutManager()}
        data={products}
        renderItem={renderRow}
        keyExtractor={item => String(item.id)}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

ProductList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  products: PropTypes.array,
  stateAccessor: PropTypes.string.isRequired,
  showHorizontalList: PropTypes.bool.isRequired,
  columnCount: PropTypes.number,
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  isLoadingMoreProducts: PropTypes.oneOf(Object.values(Status)).isRequired,
  canLoadMoreProducts: PropTypes.bool.isRequired,
  loadProducts: PropTypes.func.isRequired,
  loadFactor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  updateItem: PropTypes.func.isRequired,
  openSelectedProduct: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

ProductList.defaultProps = {
  products: [],
  columnCount: 1,
  errorMessage: null,
};

export default ProductList;

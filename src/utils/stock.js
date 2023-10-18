import productosData from './productos.json';

const getProductStock = () => {
  const stock = {};
  productosData.products.forEach(product => {
    stock[product.id] = product.stock;
  });
  return stock;
};

const updateProductStock = (productId, newStock) => {
  productosData.products.forEach(product => {
    if (product.id === productId) {
      product.stock = newStock;
    }
  });
};

export { getProductStock, updateProductStock };

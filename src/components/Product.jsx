import '../styles/product.css';

function Product({ product, onAddToCart, onDeleteToCart }) {

  return (
    <div className="card">
      <img src={`https://raw.githubusercontent.com/titystore/bypanda/master/src/${product.image}`} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <p className='bold'>Stock: {product.stock}</p>
      <div className="card-buttons">
        <button onClick={() => onAddToCart(product)}>Agregar</button>
        <button onClick={() => onDeleteToCart(product)}>Quitar</button>
      </div>
    </div>
  );
}

export default Product;

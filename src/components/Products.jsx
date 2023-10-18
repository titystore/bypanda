import { useEffect, useState } from 'react';
import '../styles/products.css';
import Product from './product';

function Products({ searchTerm, addToCart, deleteToCart, products }) {
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Simula una solicitud de productos
    setTimeout(() => {
      setFilteredProducts(
        (products || []).filter(
          (product) =>
            (product.name.toLowerCase().includes(searchTerm.toLowerCase()) || !searchTerm)
        )
      );
      setLoading(false);
    }, 300); // Simula una demora de 0.3 segundos
  }, [products, searchTerm]);

  return (
    <div className="productsContainer">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="products">
          {filteredProducts.map((product) => (
            <Product key={product.id} product={product} onAddToCart={addToCart} onDeleteToCart={deleteToCart} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;



/* para un futuro fetch cuando tenga plata para la api
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch('/src/utils/productos.json')
          .then(response => response.json())
          .then(data => {
            setProducts(data.products);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching JSON:', error);
            setLoading(false);
          });
      }, []);
      
      const filteredProducts = products.filter(product =>
        (product.name.toLowerCase().includes(searchTerm.toLowerCase()) || !searchTerm) &&
        (product.category === category || !category || category === 'Todas') // Añadimos una opción 'Todas'
      );

    return(
        <div className='productsContainer'>
                 {loading ? (
                    <p>Cargando...</p>
                 ) : (
                    <div className="products">
                    {filteredProducts.map(product => (
                        <Product key={product.id} product={product} onAddToCart={addToCart} onDeleteToCart={deleteToCart} />
                        ))}
                    </div>
                )}
        </div>
    )
}

export default Products */
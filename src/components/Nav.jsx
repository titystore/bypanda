import '../styles/nav.css'
import { ImCart, ImSearch } from "react-icons/im";

function Nav({ onSearchChange, onCartToggle, totalItemsInCart }) {
  return (
    <nav>
      <div className="logo">
      </div>
      <div className="barAndWhatsapp">
        <div className="searchBar">
          <input type="text" placeholder="Buscar..."
            onChange={e => onSearchChange(e.target.value)} />
          <button type="submit" className="searchButton" >
            <ImSearch />
          </button>
        </div>
        <div className="cartToggle">
          <button className="cart-button" onClick={onCartToggle}>
            <ImCart />
            {totalItemsInCart > 0 && (
              <span className="cart-count">{totalItemsInCart}</span>
            )}
          </button>
        </div>
      </div>
    </nav >
  )
}

export default Nav
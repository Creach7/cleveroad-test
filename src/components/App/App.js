import AddProduct from "../add-product/add-product";
import Authorization from "../authorization/authorization";
import EditProduct from "../edit-product/edit-product";
import ProductsList from "../products-list/products-list";
// import { app, analytics } from '../../firebase/firebase.js';
import { connect } from 'react-redux';

import './App.css';

function App({ page }) {
  const Pages = () => {
    switch (page) {
      case 'Authorization':
        return <Authorization />;
      case 'AddProduct':
        return <AddProduct />;
      case 'EditProduct':
        return <EditProduct />;
      case 'ProductsList':
        return <ProductsList />;
      default:
        return <div></div>;
    }
  }
  return (
    <div className="App">
      {
        Pages()
      }
    </div>
  );
}

const mapStateToProps = ({ page }) => {
  return {
    page
  };
}

export default connect(mapStateToProps)(App);

import AddProduct from "../add-product/add-product";
import Authorization from "../authorization/authorization";
import { app, analytics } from '../../firebase.js';
import ProductsList from "../products-list/products-list";
import { connect } from 'react-redux';

function App({ page }) {
  const products = [
    {
      id: 1,
      heading: "1234567890 1234567890 1234567890 1234567890",
      photo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
      description: '1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890',
      price: 100.00,
      discount_percent: 10,
      discount_end_date: '2021-09-21'
    },
    {
      id: 2,
      heading: "Наушники2",
      photo: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Eiffel_Tower_Vertical.JPG',
      description: 'Описание Описание Описание Описание Описание Описание Описани еОписание Описание Описание Описание',
      price: 100.00,
      discount_percent: 20,
      discount_end_date: '2021-09-23'
    }
  ];

  const Pages = () => {
    switch (page) {
      case 'Authorization':
        return <Authorization />;
      case 'AddProduct':
        return <AddProduct />;
      case 'ProductsList':
        return <ProductsList products={products} />;
      default:
        return <div></div>
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

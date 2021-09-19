import AddProduct from "../add-product/add-product";
import Authorization from "../authorization/authorization";
import { app, analytics } from '../../firebase.js';
// import ProductsListItem from "../products-list-item/products-list-item";
import ProductsList from "../products-list/products-list";
function App() {
  const products = [
    {
      id: 1,
      heading: "Наушники",
      photo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
      description: 'Описание Описание Описание Описание Описание Описание Описани еОписание Описание Описание Описание',
      price: 100.00,
      discount_percent: 10,
      discount_end_date: '2021-09-21'
    },
    {
      id: 2,
      heading: "Наушники2",
      photo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
      description: 'Описание Описание Описание Описание Описание Описание Описани еОписание Описание Описание Описание',
      price: 100.00,
      discount_percent: 20,
      discount_end_date: '2021-09-23'
    }
  ];
  return (
    <div className="App">
      {/* <Authorization /> */}
      {/* <AddProduct /> */}
      {/* <ProductsListItem
      product={products[0]}
      /> */}
      <ProductsList products={products} />
    </div>
  );
}

export default App;

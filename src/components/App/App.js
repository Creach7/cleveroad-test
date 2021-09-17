import AddProduct from "../add-product/add-product";
import Authorization from "../authorization/authorization";
import { app, analytics } from '../../firebase.js';
import ProductsListItem from "../products-list-item/products-list-item";
function App() {
  return (
    <div className="App">
      {/* <Authorization /> */}
      {/* <AddProduct /> */}
      <ProductsListItem
        heading={'Наушники'}
        photo={'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'}
        description={'Описание Описание Описание Описание Описание Описание Описани еОписание Описание Описание Описание'}
        price={100}
        discount_percent={10}
        discount_end_date={'2021-09-18'}
      />
    </div>
  );
}

export default App;

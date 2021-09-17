import AddProduct from "../add-product/add-product";
import Authorization from "../authorization/authorization";
import {app, analytics} from '../../firebase.js';
function App() {
  return (
    <div className="App">
      <Authorization />
      <AddProduct />
    </div>
  );
}

export default App;

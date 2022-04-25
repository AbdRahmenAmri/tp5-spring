//import logo from './logo.svg';
import './App.css';
import Products from './component/allproducts/Products';
import Header from './component/header/Header';
import MainProduct from './component/main/MainProduct';


function App() {
  return (
    <div className="App">
      <Header/>
      <MainProduct/>
      <Products/>
    </div>
  );
}

export default App;

import './App.css';
import React, {useEffect, useState} from "react";
import axios from 'axios';
import Product from './productDetails';
import ProductForm from './productForm';

// this function shows a list of all products, total product count, and filter/search feature
function App() {
  const [allProducts, setAllProducts] = useState(); // all existing products
  const [productList, setProductList] = useState(); // products displayed to user
  const [openForm, setOpenForm] = useState(false); // shows/hides add product form
  const [searchWord, setSearchWord] = useState(""); // stores keyword for search function
  const [filterOption, setFilterOption] = useState("Developer"); // filter options: Developer, Scrum Master
 
  useEffect(() => {
    document.title = "IMB"
    getAllProducts()
  }, [])

  // User story 1 API call
  const getAllProducts = () => {
    axios.get("http://localhost:3000/api/get_all_products")
    .then((response) => {
      setAllProducts(response.data.all_products)
      setProductList(response.data.all_products)
    })
    .catch(error => console.error('Error: ${error}'))
  }

  // User story 4 and 5: Filter products by developer or scrum master
  const applyFilter = () => {
    if (filterOption === "Scrum Master") {
      let filteredProducts = [...allProducts.filter(product => product.scrumMasterName.toLowerCase() === searchWord.toLowerCase())]
      setProductList(filteredProducts)
    } else if (filterOption === "Developer") {
      let filteredProducts = [...allProducts.filter(product => product.developers.some(dev => dev.toLowerCase() == searchWord.toLowerCase()))]
      setProductList(filteredProducts)   
    }
  }

  return ( 
    <div className="App">
      <h2>
        Total Products: {productList? productList.length : "Loading..."}
      </h2>
      <div>
        <span>Filter: </span>
        <select value={filterOption} onChange={(event) => setFilterOption(event.target.value)}>
          <option>Developer</option>
          <option>Scrum Master</option>
        </select>
        <input style={{margin:5}} value={searchWord} onChange={(event)=>setSearchWord(event.target.value)}></input>
        <button onClick={() => applyFilter()}>Search</button>
      </div>
      {openForm? <ProductForm setAllProducts={setAllProducts} setProductList={setProductList} openForm={openForm} setOpenForm={setOpenForm} productId={""}/> : null}
      <button className="add-product-button" onClick={() => setOpenForm(!openForm)}>
        {openForm? 'Cancel' : 'Add New Product'}
      </button>
      <div className="table">
        <div className="row">
          <div className="product-row">
            <div className="column-name">Product ID</div>
            <div className="column-name">Product Name</div>
            <div className="column-name">Scrum Master</div>
            <div className="column-name">Product Owner</div>
            <div className="column-name">Developers</div>
            <div className="column-name">Start Date</div>
            <div className="column-name">Methodology</div>
          </div>
          {productList? productList.map((product, index) => {return(<Product key={product.productId} product={product} index={index} productList={productList} setProductList={setProductList} setAllProducts={setAllProducts}/>)}) : "Loading..."}
        </div>
      </div>
    </div>
  );
}

export default App;


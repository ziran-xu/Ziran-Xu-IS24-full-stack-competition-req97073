import React, {useEffect, useState} from "react";
import axios from 'axios';
import ProductForm from './productForm';

// this function displays the details of each product 
function Product(props) {

  const [openEdit, setOpenEdit] = useState(false); // this state shows/hides the edit products form

  return (
    <div className="product">
      {openEdit? 
      // show/hide either edit product form or product details
      <ProductForm setAllProducts={props.setAllProducts} setProductList={props.setProductList} openForm={openEdit} setOpenForm={setOpenEdit} product={props.product}/> 
      : 
      <div>
        <div className="product-section">
          Product Number: {props.product.productId}
        </div>
        <div className="product-section">
          Product Name: {props.product.productName}
        </div>
        <div className="product-section">
          Scrum Master: {props.product.scrumMasterName}
        </div>
        <div className="product-section">
          Product Owner: {props.product.productOwnerName}
        </div>
        <div className="product-section">
          Developer Names: {props.product.developers.map((dev, index) => {return(<span key={index}>{dev}{index + 1 == props.product.developers.length? "" : ", "}</span>)})}
        </div>
        <div className="product-section">
          Start Date: {props.product.startDate}
        </div>
        <div className="product-section">
          Methodology: {props.product.methodology}
        </div>
      </div>
      }
      <button className="edit-button" onClick={() => setOpenEdit(!openEdit)}>
        {openEdit? 'Cancel' : 'Edit Product'}
      </button>
    </div>
  )
}

export default Product;
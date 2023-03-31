import React, {useEffect, useState} from "react";
import axios from 'axios';
import './App.css';

// User story 3: this form allows user to add products and edit products
function ProductForm(props) {
  const DEVELOPER_COUNT = 5
  const [name, setName] = useState(props.product? props.product.productName :"");
  const [scrum, setScrum] = useState(props.product? props.product.scrumMasterName :"");
  const [owner, setOwner] = useState(props.product? props.product.productOwnerName :"");
  const [developerList, setDeveloperList] = useState(new Array(DEVELOPER_COUNT).fill(""));
  const [date, setDate] = useState(props.product? props.product.startDate :"");
  const [methodology, setMethodology] = useState(props.product? props.product.methodology :"");
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (props.product) {
      let newDevList = [...props.product.developers]
      // makes sure developerList array length is exactly 5 
      // (this creates exactly 5 inputs boxes)
      for (let i = newDevList.length; i < DEVELOPER_COUNT; i++) {
        newDevList.push("")
      }
      setDeveloperList(newDevList)
    }
  }, [])


  const productUpdate = (product) => {
    // forbids submission if form is incomplete
    if (!name || !scrum || !owner || !developerList || !date || !methodology){
      setShowError(true)
      return
    }
    setShowError(false)
    setIsLoading(true)
    // below line removes all empty elements from the list of developers 
    // (in case there's less than 5 developers)
    let filteredDevs = developerList.filter(devName => devName != "")
    if (!product) {
      // User story 3 API call for adding product
      axios.post("http://localhost:3000/api/add_product", {
        name : name,
        scrum: scrum,
        owner: owner,
        developers : filteredDevs,
        date: date,
        methodology: methodology,
      })
      .then((response) => {
        props.setAllProducts(response.data.all_products)
        props.setProductList(response.data.all_products)
        props.setOpenForm(false)
        setIsLoading(false)
      })
      .catch(error => console.error('Error: ${error}'))
    } else {
      //User story 3 API call for editing product
      axios.post("http://localhost:3000/api/edit_product", {
        productId : product.productId,
        name : name,
        scrum: scrum,
        owner: owner,
        developers : filteredDevs,
        date: date,
        methodology: methodology,
      })
      .then((response) => {
        props.setAllProducts(response.data.all_products)
        props.setProductList(response.data.all_products)
        props.setOpenForm(false)
        setIsLoading(false)
      })
      .catch(error => console.error('Error: ${error}'))
    }
  }

  // updates developer state array
  const updateDevelopers = (index) => (event) => {
    let newDevList = [...developerList];
    newDevList[index] = event.target.value ;
    setDeveloperList(newDevList);
  }

  return(
    <div className="product-form">
      <div style={{fontSize: 20, fontWeight: "bold", paddingBottom: 10}}>
        {props.product? 'Edit Product Details:': 'New Product Details:'}
      </div>
      <div>
        Product Name: <input value={name} onChange={(event)=>setName(event.target.value)}/>
      </div>
      <div>
        Scrum Master: <input value={scrum} onChange={(event)=>setScrum(event.target.value)}/>
      </div>
      <div>
        Product Owner: <input value={owner} onChange={(event)=>setOwner(event.target.value)}/>
      </div>
      <div>
        Developer Names: {developerList.map((developer, index) => {return(<input key={index} value={developer} onChange={updateDevelopers(index)}/>)})}
      </div>
      <div>
        Start Date: <input type="date" value={date} onChange={(event)=>setDate(event.target.value)}/>
      </div>
      <div>
        Methodology: <input value={methodology} onChange={(event)=>setMethodology(event.target.value)}/>
      </div>
      <button className="submit-button" onClick={() => productUpdate(props.product)}>
        {isLoading? 'Loading...' : 'Submit'}
      </button>
      {showError? <span style={{color: "red"}}>Please complete the form before submitting.</span> : null}
    </div>
  )
}

export default ProductForm;

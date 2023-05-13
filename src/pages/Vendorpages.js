import React, { useState, useEffect } from 'react';
import '../assets/vendorpages.css';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Vendorreqtable from './Vendorreqtable'; // Import Vendorreqtable

const Vendorpages = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    imageUrl: '',
    status: '',
  });

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    // Fetch product list
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    try {
      const response = await axios.get('http://rsudsamrat.site:8080/pengadaan/dev/v1/product-requests');
      setProductList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://rsudsamrat.site:8080/pengadaan/dev/v1/product-requests', formValues);
      console.log(response.data);
      // Refresh product list
      fetchProductList();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <Container>
      <div className="row">
        <div className="col-md-6">
          <h2>Product List</h2>
          <Vendorreqtable productList={productList} />
        </div>
        <div className="col-md-6">
          <h2>Create Product Request</h2>
          <form onSubmit={handleSubmit} className="vendor-pages-form">
            <div className="form-group">
              <p>Vendor</p>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formValues.description}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formValues.price}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formValues.quantity}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="imageUrl">Image URL:</label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formValues.imageUrl}
                onChange={handleChange}
                required
                className="form-control"
              />
          </div>

<div className="form-group">
  <label htmlFor="status">Status:</label>
  <select
    id="status"
    name="status"
    value={formValues.status}
    onChange={handleChange}
    required
    className="form-control"
  >
    <option value="">Select Status</option>
    <option value="OPEN">OPEN</option>
    <option value="CLOSED">CLOSED</option>
    <option value="FULFILLED">FULFILLED</option>
  </select>
</div>

<button type="submit" className="btn btn-primary">
  Create Product Request
</button>
</form>
</div>
</div>
</Container>
);

};

export default Vendorpages;

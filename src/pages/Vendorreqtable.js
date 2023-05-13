import React from 'react';
import { Table } from 'react-bootstrap';
import '../assets/vendorreqtable.css'; // Import vendorreqtable.css

const Vendorreqtable = ({ productList }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Image URL</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {productList.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>
              <img src={product.imageUrl} alt={product.name} style={{ width: '100px' }} />
            </td>
            <td>{product.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Vendorreqtable;

import React, { useEffect, useState } from "react";
import axios from "axios";


const Orderpages = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("orderDate");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetailModal, setShowProductDetailModal] = useState(false);
  const [payoutDetails, setPayoutDetails] = useState(null);

  const calculatePayoutAmount = (orderItems) => {
    let totalAmount = 0;
    for (let i = 0; i < orderItems.length; i++) {
      const orderItem = orderItems[i];
      totalAmount += orderItem.quantity * orderItem.product.price;
    }
    return totalAmount;
  };





  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/orders/items/product-stock?page=${page}&sort=${sort}`
        );
        setData(response.data.content);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [page, sort]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const openModal = async (orderId) => {
    try {
      const response = await axios.get(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${orderId}`
      );
      setSelectedOrder(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handleQuantityChange = (orderItemId, newQuantity) => {

  };

  const handleDeleteOrderItem = (orderItemId) => {
    
  };

  const handleAddProduct = () => {

  };

  const handleDetailProduct = async (productUuid) => {
    try {
      const response = await axios.get(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/products/${productUuid}`
      );
      setSelectedProduct(response.data);
      setShowProductDetailModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayoutDetail = async () => {
    try {
      const response = await axios.get(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${selectedOrder.id}`
      );
      setPayoutDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };




    







  return (
    <div className="container">
      <h2>Order Table</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="mb-3">
            <label htmlFor="sort">Sort By:</label>
            <select
              id="sort"
              className="form-control"
              value={sort}
              onChange={handleSortChange}
            >
              <option value="orderDate">Order Date</option>
              <option value="orderId">Order ID</option>

            </select>
          </div>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.orderItemId}>
                  <td>{item.orderId}</td>
                  <td>{item.orderDate}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => openModal(item.orderId)}
                    >
                      Nota
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedOrder && (
            <div className="modal" style={{ display: "block" }}>
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3 className="modal-title">Order Details</h3>
                    <button
                      type="button"
                      className="close"
                      onClick={closeModal}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <h4>Order Items:</h4>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Product UUID</th>
                          <th>Product Name</th>
                          <th>Product Price</th>
                          <th>Quantity</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.orderItems.map((orderItem) => (
                          <tr key={orderItem.id}>
                            <td>{orderItem.product.productuuid}</td>
                            <td>{orderItem.product.name}</td>
                            <td>{orderItem.product.price}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-secondary"
                                onClick={() =>
                                  handleQuantityChange(
                                    orderItem.id,
                                    orderItem.quantity - 1
                                  )
                                }
                              >
                                -
                              </button>
                              {orderItem.quantity}
                              <button
                                className="btn btn-sm btn-secondary"
                                onClick={() =>
                                  handleQuantityChange(
                                    orderItem.id,
                                    orderItem.quantity + 1
                                  )
                                }
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  handleDeleteOrderItem(orderItem.id)
                                }
                              >
                                Delete
                              </button>
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => handleDetailProduct(orderItem.product.productuuid)}
                              >
                                Detail
                              </button>

                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div>
                      <button className="btn btn-primary" onClick={handleAddProduct}>
                        Add Product
                      </button>
                    </div>

                    <h4>Payment Details:</h4>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Payment ID</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{selectedOrder.payment.id}</td>
                          <td>{selectedOrder.payment.amount}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={handlePayoutDetail}>
                      Payout Detail
                    </button>
                    <button type="button" className="btn btn-primary">
                      Check Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showProductDetailModal && selectedProduct && (
            <div className="modal" style={{ display: "block" }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3 className="modal-title">Product Details</h3>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setShowProductDetailModal(false)}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Product ID: {selectedProduct.id}</p>
                    <p>Product UUID: {selectedProduct.productuuid}</p>
                    <p>Product Name: {selectedProduct.name}</p>
                    <p>Product Description: {selectedProduct.description}</p>
                    <p>Product Price: {selectedProduct.price}</p>
                    <p>Product Quantity: {selectedProduct.quantity}</p>
                    <p>Vendor ID: {selectedProduct.vendor.id}</p>
                    <p>Vendor UUID: {selectedProduct.vendor.vendoruuid}</p>
                    <p>Vendor Name: {selectedProduct.vendor.name}</p>
                    <p>Vendor Address: {selectedProduct.vendor.address}</p>
                    <p>Vendor Phone Number: {selectedProduct.vendor.phoneNumber}</p>
                    <p>Vendor Owner ID: {selectedProduct.vendor.owner.id}</p>
                    <p>Vendor Owner Username: {selectedProduct.vendor.owner.username}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

{payoutDetails && (
  <div className="modal" style={{ display: "block" }}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Payout Details</h3>
          <button
            type="button"
            className="close"
            onClick={() => setPayoutDetails(null)}
          >
            <span>&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <h4>Order ID: {payoutDetails.id}</h4>
          <h4>Order Date: {payoutDetails.orderDate}</h4>
          <h4>Order Items:</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Amount Per Item</th>
              </tr>
            </thead>
            <tbody>
              {payoutDetails.orderItems.map((orderItem) => (
                <tr key={orderItem.id}>
                  <td>{orderItem.product.name}</td>
                  <td>{orderItem.quantity}</td>
                  <td>{orderItem.product.price}</td>
                  <td>{orderItem.quantity * orderItem.product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Payout Amount: {calculatePayoutAmount(payoutDetails.orderItems)}</h4>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={() => setPayoutDetails(null)}>
            Close
          </button>
          <button type="button" className="btn btn-primary" >
            Print
          </button>
        </div>
      </div>
    </div>
  </div>
)}




          <div className="pagination">
            <button
              className="btn btn-secondary"
              disabled={page === 0}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default Orderpages;

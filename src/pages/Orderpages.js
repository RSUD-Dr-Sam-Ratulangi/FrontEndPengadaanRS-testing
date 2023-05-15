import React from "react";
import { ListGroup } from "react-bootstrap";

const Orderpages = () => {
  const orders = [
    {
      id: 1,
      items: [
        {
          id: 1,
          name: "Product 1",
          vendor: "Vendor 1",
          orderId: 1,
          quantity: 1,
          price: 10.0
        },
        {
          id: 2,
          name: "Product 2",
          vendor: "Vendor 2",
          orderId: 1,
          quantity: 1,
          price: 15.0
        }
      ]
    },
    {
      id: 2,
      items: [
        {
          id: 3,
          name: "Product 3",
          vendor: "Vendor 3",
          orderId: 2,
          quantity: 1,
          price: 20.0
        },
        {
          id: 4,
          name: "Product 4",
          vendor: "Vendor 4",
          orderId: 2,
          quantity: 1,
          price: 25.0
        }
      ]
    }
  ];

  const handlePurchase = (orderId, itemId) => {
    console.log("Order ID:", orderId);
    console.log("Item ID:", itemId);
  };

  const handleIncreaseQuantity = (orderId, itemId) => {
    console.log("Increase Quantity - Order ID:", orderId);
    console.log("Increase Quantity - Item ID:", itemId);
  };

  const handleDecreaseQuantity = (orderId, itemId) => {
    console.log("Decrease Quantity - Order ID:", orderId);
    console.log("Decrease Quantity - Item ID:", itemId);
  };

  const handleCheckout = () => {
    console.log("Checkout");
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    orders.forEach((order) => {
      order.items.forEach((item) => {
        totalPrice += item.price * item.quantity;
      });
    });
    return totalPrice.toFixed(2);
  };

  return (
    <div className="container mt-5">
      <h1>Order List</h1>
      <div className="order-list">
        {orders.map((order) => (
          <div className="order-item" key={order.id}>
            <h3>Order ID: {order.id}</h3>
            <div className="order-items">
              <ListGroup>
                {order.items.map((item) => (
                  <ListGroup.Item key={item.id}>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h4>{item.name}</h4>
                        <p>Vendor: {item.vendor}</p>
                        <p>Order ID: {item.orderId}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <div>
                        <img src={`http://rsudsamrat.site:8080/images/${item.id}`} alt={item.name} className="product-image" /> {/* Menampilkan gambar dari API */}
                        <button
                          className="btn btn-danger mr-2"
                          onClick={() => handlePurchase(item.orderId, item.id)}
                        >
                          Remove
                        </button>
                        <button
                          className="btn btn-secondary mr-2"
                          onClick={() => handleDecreaseQuantity(item.orderId, item.id)}
                        >
                          -
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleIncreaseQuantity(item.orderId, item.id)}
                        >
                          +
                        </button>
                        <button
                          className="btn btn-success ml-2"
                          onClick={() => handlePurchase(item.orderId, item.id)}
                        >
                          Beli Sekarang
                          </button>
                        </div>
                        <input
                          type="checkbox"
                          className="checkbox-style ml-2"
                          // Add any logic or event handling for the checkbox here
                        />
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </div>
          ))}
        </div>
        <div className="checkout-section">
          <h3>Total Price: ${calculateTotalPrice()}</h3>
          <button className="btn btn-primary" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    );
  };
  
  export default Orderpages;


import React from "react";


const Productdetails = (props) => {
  const productId = props.match.params.id;

  // Fetch product details based on productId and display them

  return (
    <div>
      <h1>Product Details for ID: {productId}</h1>
      {/* Display product details */}
    </div>
  );
};

export default Productdetails;

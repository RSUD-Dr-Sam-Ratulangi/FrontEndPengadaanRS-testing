import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Badge } from "react-bootstrap";
import '../assets/productpages.css';


const Productpages = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(`http://rsudsamrat.site:8080/pengadaan/dev/v1/products/${currentPage}/10`)
      .then((response) => {
        const productsWithVendor = response.data.content.filter(product => product.vendor !== null);
        setProducts(productsWithVendor);
        setTotalPages(response.data.totalPages);
        console.log(productsWithVendor);
      });
  }, [currentPage]);  
  

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase();
    return (
      product.id.toString().toLowerCase().includes(search) ||
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search) ||
      product.price.toString().toLowerCase().includes(search) ||
      product.quantity.toString().toLowerCase().includes(search) ||
      (product.vendor && product.vendor.name.toLowerCase().includes(search)) // Pencarian berdasarkan nama vendor
    );
  });
  

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mt-5">
      <p>Products</p>
      <div className="my-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name Product&Vendor, Description, Price, or Quantity"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredProducts.map((product) => (
          <div className="col mb-4" key={product.id}>
            <Card className="h-100">
              {/* <Card.Img variant="top" src={product.imageUrl} /> */}
              <Card.Img variant="top" src={product.imageUrl || "https://via.placeholder.com/150"} />
              <Card.Body>
                <p>{product.vendor.name}</p> {/* Menampilkan nama vendor */}
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <Badge bg="primary" className="p-2">
                    {`Rp ${product.price}`}
                  </Badge>
                  <Badge bg="secondary" className="p-2">
                    {`Quantity: ${product.quantity}`}
                  </Badge>
                  <button className="btn btn-primary">
                    Order
                  </button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-primary"
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          Previous Page
        </button>
        <p>
          Page {currentPage + 1} of {totalPages}
        </p>
        <button
          className="btn btn-primary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Productpages;

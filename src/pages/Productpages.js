import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Badge } from "react-bootstrap";
import "../assets/productpages.css";

const Productpages = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedProduct, setSelectedProduct] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const quantity = 1;

  useEffect(() => {
    axios
      .get(`http://rsudsamrat.site:8080/pengadaan/dev/v1/products/${page}/5`)
      .then((response) => {
        const productsWithVendor = response.data.content.filter(
          (product) => product.vendor !== null
        );
        setProducts(productsWithVendor);
        setTotalPages(response.data.totalPages);
        console.log(productsWithVendor);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]); /* Rendering current page */

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const orderProduct = (produk) => {
    // setSelectedProduct(produk.id);
    console.log(produk.name);
    // eslint-disable-next-line no-restricted-globals
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        `Apakah Anda yakin ingin melakukan pemesanan produk ${produk.name}`
      )
    ) {
      axios
        .post("http://rsudsamrat.site:8080/pengadaan/dev/v1/orders", {})
        .then((response) => {
          console.log(response.data);
          const orderId = response.data.id;
          const orderItem = [{ productId: produk.id, quantity: quantity }];
          console.log(orderItem);
          axios
            .post(
              `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${orderId}/items`,
              orderItem
            )
            .then((response) => {
              console.log(response.data);
              alert("Add Item Success");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // pengguna membatalkan operasi
      console.log("Pemesanan dibatalkan.");
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
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
              <Card.Img variant="top" />
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
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      orderProduct(product);
                    }}
                  >
                    Order
                  </button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-primary" onClick={prevPage}>
          Previous Page
        </button>
        <p>
          Page {page + 1} of {totalPages}
        </p>
        <button className="btn btn-primary" onClick={nextPage}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Productpages;

import { useEffect, useState } from "react";
import Layout from "./layouts/Layout.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Modal, Radio } from "antd";
import { Prices } from "./Prices.js";
import { useCart } from "../context/cartContext.jsx";
import { useAuth } from "../context/auth.jsx";
import cartImage from "../../images/cart.png";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [MoreDetailModel, setMoreDetailModel] = useState(false);
  const [MoreDetail, setMoreDetail] = useState({});
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const getCart = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/user/get-cart`,
        {
          email: auth?.user?.email,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      setCart([...data.cart]);
    } catch (error) {
      toast.error("please login first!");
    }
  };
  useEffect(() => {
    if (auth && auth.token) {
      getCart();
    }
  }, [auth]);

  const addtoCart = async (email, id) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/user/add-cart`,
        { email, id },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data.success) {
        toast.success("product added to cart");
        getCart();
      }
    } catch (error) {
      toast.error("please login");
    }
  };
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/products/get-products`
      );
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      toast.error("something went wrong!");
    }
  };
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/admin/get-categories`
      );
      const categories = {};
      if (data.success) {
        data.category.forEach((e) => {
          categories[e._id] = e.name;
        });
      }
      setCategories({ ...categories });
    } catch (error) {
      toast.error("something went wrong while getting product");
    }
  };
  useEffect(() => {
    getAllProducts();
    getCategories();
  }, []);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/products/filter-product`,
        {
          checked,
          radio,
        }
      );
      setProducts(data.products);
    } catch (error) {
      toast.error("Error in getting products");
    }
  };
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    else {
      getAllProducts();
    }
  }, [checked, radio]);
  const handlefilter = (value, id) => {
    if (value) {
      setChecked([...checked, id]);
    } else {
      setChecked(checked.filter((c) => c !== id));
    }
  };

  return (
    <Layout title="SuperMarket for shopping">
      <div className="container-fluid row">
        <div className="col-md-2">
          <h5>Filter by Category</h5>
          {Object.keys(categories).map((c) => (
            <Checkbox
              key={c}
              className="mx-5 my-2"
              onChange={(e) => handlefilter(e.target.checked, c)}
            >
              {categories[c]}
            </Checkbox>
          ))}

          <div className="d-flex flex-column">
            <h5>Filter by Price</h5>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array} className="mx-5 my-2">
                    {p.array[0]}&#8377;-{p.array[1]}&#8377;
                  </Radio>
                </div>
              ))}
            </Radio.Group>

            <button
              className="btn btn-dark w-75 my-3"
              onClick={() => window.location.reload(false)}
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        <div className="col-md-9 offset-1">
          <h1 className="text-center">All Products</h1>

          <div className="row d-flex">
            {products.map((product) => (
              <div
                key={product._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={product.photo}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Price: {product.price}</p>
                    <div className="d-flex">
                      <button
                        className="btn btn-primary d-flex justify-content-center align-items-center"
                        style={{
                          width: "100%",
                          maxWidth: "200px",
                          height: "40px",
                        }} 
                        onClick={() => {
                          setMoreDetailModel(true);
                          const detailObj = {
                            category: product?.category,
                            price: product?.price,
                            name: product?.name,
                            description: product?.description,
                          };
                          setMoreDetail(detailObj);
                        }}
                      >
                        <p className="mb-0" style={{ fontSize: "14px", lineHeight: "20px" }}>More Detail</p>
                      </button>
                      <button
                        className="btn btn-secondary d-flex justify-content-center align-items-center"
                        style={{ width: "100px", height: "40px" }}
                        onClick={()=>{
                         addtoCart(auth?.user?.email,product._id)
                        }}
                      >
                        <img
                          src={cartImage}
                          alt="Cart"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Modal
          onCancel={() => setMoreDetailModel(false)}
          footer={null}
          open={MoreDetailModel}
        >
          <div className="d-block">
            <p>
              <b>Name</b>: {MoreDetail.name}
            </p>
            <p>
              <b>Price</b>: {MoreDetail.price}
            </p>
            <p>
              <b>Category</b>: {categories[MoreDetail.category]}
            </p>
            <p>
              <b>Description</b>: {MoreDetail.description}
            </p>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default Home;

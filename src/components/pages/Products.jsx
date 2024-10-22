import React, { useEffect, useState } from "react";
import Layout from "./layouts/Layout";
import AdminMenu from "./layouts/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import {Modal,Select} from 'antd'
const { Option } = Select;
const Products = () => {
  const [categories, setCategories] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [products, setProducts] = useState([]);
  const [deleteModal,setDeleteModal]=useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [id, setId] = useState('');
  const [auth, setAuth] = useAuth();
  const getAllProducts = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API}/api/v1/products/get-products`
    );
    setProducts(data.products);
  };
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/admin/get-categories`);
      if (data.success) {
        const newCategories = {};  
        data.category.forEach((e) => {
          newCategories[e._id] = e.name;
        });
        setCategories({...newCategories });
    } 
  }
  catch (error) {
      toast.error("Something went wrong in getting catgeory");
    }
  ;
  }
  const deleteProduct = async (e) => {
       e.preventDefault()
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/api/v1/products/delete-product/${id}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data.success) {
        toast.success("product deleted successfully");
        getAllProducts();
        setDeleteModal(false)
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const updateProduct=async(e)=>{        
    e.preventDefault();
    try {
      const {data} = await axios.patch(
        `${import.meta.env.VITE_API}/api/v1/products/update-product/${id}`,
        {name, description, price, quantity,image},
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      if (data.success) {
        toast.success("product updated successfully");
        getAllProducts();
        setUpdateModal(false)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getAllProducts();
    getAllCategory()
  }, []);
  
  return (
    <Layout title="Manage Products">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
            {
            products.map((p) => (
              <div key={p._id} className="col-sm-12 col-md-6 col-lg-4">
              <div className="card m-2" style={{ width: "100%" }}>
                <img src={`${p.photo}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text">Price: {p.price}</p>
                  <p className="card-text">Category: {categories[p.category]}</p>
            
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setDeleteModal(true);
                        setId(p._id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setId(p._id);
                        setUpdateModal(true);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
       <Modal onCancel={()=>setDeleteModal(false)}  footer={null}  open={deleteModal} >
    <form onSubmit={deleteProduct}>
        <div className="form-group">
        <h3>Are you sure to Delete?</h3>
          <div> 
            <button type="submit" className="btn btn-danger">
            <span className="text-md-right">Delete</span>
              </button>
          </div>
        </div>
      </form>
    </Modal>
    <Modal onCancel={()=>setUpdateModal(false)}  footer={null}  open={updateModal}>
    <h4>Please enter only that information that you want to update otherwise keep as empty.</h4>
    <form onSubmit={updateProduct}>
            <div className="m-1 w-75">
              <Select
                placeholder="Select a category"
                size="large"
                showSearch
                value={category}
                className="w-100 mb-3"  
                onChange={(value) => {
                  setCategory(value);
                }}
              >
            {Object.entries(categories).map(([id, name]) => (
      <Option key={id} value={id}>
        {name}
      </Option>
    ))}
                
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {image ? image.name : "Upload image"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Write Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-primary">
                  Edit
                </button>
              </div>
            </div>
            </form>
    </Modal>
    </div>
      </div>
    </Layout>
  );
}
export default Products;

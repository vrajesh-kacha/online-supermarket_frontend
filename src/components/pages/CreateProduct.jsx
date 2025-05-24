import  { useState, useEffect } from "react";
import AdminMenu from "./layouts/AdminMenu.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useAuth } from "../context/auth.jsx";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [auth,setAuth]=useAuth()
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/admin/get-categories`);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      toast.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

   
    if (!name || !description || !price || !category || !quantity || !image) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}/api/v1/products/create-product`, {
        name:name.trim(),
        description: description.trim(),
        price: price,
        category: category.trim(),
        quantity,
        image
      }, {
        headers: {
          Authorization: auth?.token,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (data.success) {
        toast.success(data.message);
        
        setName("");
        setDescription("");
        setPrice("");
        setCategory(null);
        setQuantity("");
        setImage("");
      }
    } catch (error) {
  toast.error("somthing went wrong please try again")
    }
  };

  return (
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>

            <form onSubmit={handleCreate}>
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
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
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
                 id="name"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  id="description"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  id="price"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  placeholder="Write Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-primary">
                  CREATE PRODUCT
                </button>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default CreateProduct;
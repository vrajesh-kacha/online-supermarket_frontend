import React, { useEffect, useState } from "react";
import Layout from "./layouts/Layout.jsx";
import AdminMenu from "./layouts/AdminMenu.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth.jsx";
import { Modal } from "antd";
const CreateCategory = () => {
  const [Category, setCategory] = useState([]);
  const [newCategory, setnewCategory] = useState("");
  const [visible, setVisibel] = useState(false);
  const [id, setId] = useState();
  const [auth, setAuth] = useAuth();
  const [errors, setErrors] = useState("");

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/admin/get-categories`);
      if (data.success) {
        setCategory(data.category);
      } 
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!newCategory) {
      setErrors("Category name is required");
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/admin/create-category`,
        { "name": newCategory.trim() },
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getCategories();
        setnewCategory(""); 
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API}/api/v1/admin/delete-category/${id}`, {
        headers: {
          Authorization: auth.token,
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        getCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const editCategory = async (e) => {
    e.preventDefault();
    if (!newCategory) {
      setErrors("Category name is required");
      return;
    }
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/admin/update-category/${id}`,
        { "name": newCategory.trim() },
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getCategories();
        setVisibel(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout title="Manage categories">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 d-flex flex-column">
            <h1>Manage Category</h1>
            <form onSubmit={handelSubmit}>
              <div className="form-group row">
                <div className="col-md-10">
                  <input
                    type="text"
                    id="newCategory"
                    className="form-control"
                    placeholder="Enter new Category"
                    value={newCategory}
                    onChange={(e) => {
                      setnewCategory(e.target.value);
                      setErrors("");
                    }}
                  />
                  {errors && <div className="text-danger">{errors}</div>}
                </div>
                <div className="col-md-2 text-md-right">
                  <button type="submit" className="btn btn-primary">
                    <span className="text-md-right">Add Category</span>
                  </button>
                </div>
              </div>
            </form>

            <table className="table pt-3">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Category.length > 0 ? (
                  Category.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setVisibel(true);
                            setnewCategory(c.name);
                            setId(c._id);
                            setErrors(""); // Clear errors when editing
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger mx-5"
                          onClick={() => deleteCategory(c._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">Loading categories...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Modal onCancel={() => setVisibel(false)} footer={null} open={visible}>
            <form onSubmit={editCategory}>
              <div className="form-group row">
                <div className="col-md-8">
                  <input
                    type="text"
                    id="modalnewCategory"
                    className="form-control"
                    placeholder="Edit Category"
                    value={newCategory}
                    onChange={(e) => {
                      setnewCategory(e.target.value);
                      setErrors("");
                    }}
                  />
                  {errors && <div className="text-danger">{errors}</div>}
                </div>
                <div className="col-md-2 text-md-right">
                  <button type="submit" className="btn btn-primary">
                    <span className="text-md-right">Edit Category</span>
                  </button>
                </div>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;

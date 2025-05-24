import  { useEffect, useState } from "react";
import { useCart } from "../context/cartContext.jsx";
import { useAuth } from "../context/auth.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import logo from '../../images/weblogo.png'

const Cart = () => {
  const [cart, setCart] = useCart([]);
  const [auth] = useAuth();
  const [total, setTotal] = useState(0);


  useEffect(() => {
    const totalPrice = cart.reduce((sum, value) => sum + value.price, 0);
    setTotal(totalPrice);  
  }, [cart])
  
  const payment = async (amount) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/products/checkout`,
        { amount},
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      if (data.success) {
        const {
          data: { key },
        } = await axios.get(
          `${import.meta.env.VITE_API}/api/v1/products/getkey`,
          {
            headers: {
              Authorization: auth.token,
            },
          }
        );
        const options = {
          key,
          amount: data.order.amount,
          currency: "INR",
          name: "Vrajesh Kacha",
          description: "Test Transaction",
          image: logo,
          order_id: data.order.id,
          callback_url: `${import.meta.env.VITE_API}/api/v1/products/payment`,
          prefill: {
            name: auth.user.name,
            email: auth.user.email,
            contact: auth.user.phone,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    } catch (error) {
      toast.error("somthing went wrong");
    }
  };

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
      toast.error("something went wrong while getting cart item");
    }
  };

  const deleteCart = async (email, id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/api/v1/user/delete-cart`,
        {
          headers: {
            Authorization: auth?.token,
          },
          data: {
            email,
            id,
          },
        }
      );
      if (data.success) {
        toast.success("product deleted from cart");
        getCart();
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              Hello {auth && auth.user.name}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart.map((product) => (
              <div key={product._id} className="row mb-2 card flex-row">
                <div className="col-md-4 col-12 mb-2">
                  <img
                    src={product.photo}
                    className="img-fluid"
                    alt={product.name}
                  />
                </div>
                <div className="col-md-8 col-12 d-flex flex-column justify-content-between">
                  <h5>
                    <b>{product.name}</b>
                  </h5>
                  <p>
                    <b>Price</b>: {product.price}
                  </p>
                  <p>
                    <b>Description</b>: {product.description}
                  </p>
                  <button
                    className="btn bg-danger"
                    style={{ width: "30%" }}
                    onClick={() => deleteCart(auth?.user.email, product._id)}
                  >
                    Delete from cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <h2>Cart Summary</h2>
            <h4>
              Total :{" "}
              {
              total
              }
            </h4>
            <button
              className="btn btn-primary btn-sm btn-lg"
              onClick={()=>payment(total)}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
  );
};
export default Cart;

import React, { useEffect } from "react";
import HeroImg from "../../assets/Login Illustration@2x.png";
import Logo from "../../assets/logo-cocobod.png";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../axios/axios";

const defaultFormFields = {
  email: "",
  password: "",
};

function SignIn() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("user"));
    if (getUser) {
      navigate("/home");
    }
  }, [navigate]);

  const { email, password } = formFields;

  const clearFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api
        .post("/auth/signin", {
          email: email,
          password: password,
        })
        .then((response) =>
          localStorage.setItem(
            "accessToken",
            JSON.stringify(response.data.access_token)
          )
        )
        .then(async () => {
          const userFetched = await api.get("/user/me", {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("accessToken")
              )}`,
            },
          });
          if (userFetched) {
            localStorage.setItem("user", JSON.stringify(userFetched.data.name));
          }
          if (userFetched?.data) {
            navigate("/home");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  console.log(formFields);

  return (
    <div className="login-container grid grid-cols-2 h-screen overflow-hidden">
      <div className="hero-image-container h-full">
        <img
          src={HeroImg}
          alt="hero image"
          className="hero-img object-cover"
          style={{ height: "45rem" }}
        />
      </div>
      <div className="login-form-div h-full grid place-items-center">
        <div className="login-form-container w-96 h-4/6 shadow-xl rounded-xl p-8 grid place-items-center z-10">
          <div className="form-content">
            <h2 className="welcome-text text-center text-lg text-black font-medium mb-5">
              WELCOME TO
            </h2>
            <div className="brand-logo-box flex justify-center items-center gap-2 mb-4">
              <div className="logo-container h-14 ">
                <img src={Logo} alt="cocobod logo" className="logo h-full" />
              </div>

              <div
                className="line w-px h-6"
                style={{ backgroundColor: "#724c2a" }}
              ></div>

              <h2
                className="brand-text text-lg font-semibold "
                style={{ color: "#724c2a" }}
              >
                Ghana Cocoa Board
              </h2>
            </div>

            <span className="mb-4 font-medium block">
              Login to proceed to homepage
            </span>
            <form onSubmit={handleSubmit}>
              <input
                className="mb-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <input
                className="mb-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />

              <button className="transition ease-linear duration-75 bg-gradient-to-r from-green-900 to-green-500 w-full hover:bg-gradient-to-r hover:from-green-500 hover:to-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Sign In
              </button>
            </form>
            <NavLink
              to=""
              className="text-sm block mt-2 hover:text-blue-500 hover:decoration-solid"
            >
              Forgot your password?
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

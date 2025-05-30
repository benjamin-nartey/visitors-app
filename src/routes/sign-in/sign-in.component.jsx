import React, { useEffect } from 'react';
import HeroImg from '../../assets/Login Illustration@2x.png';
import Logo from '../../assets/logo-cocobod.png';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import axios from 'axios';
import SignInLoader from '../../components/circlular-loader/circular-loader';
import { AuthContext } from '../../components/context/useAuth.context';
import { useContext } from 'react';
import { useLocalStorage } from '../../utils/useLocalStorage';

const defaultFormFields = {
  email: '',
  password: '',
};

function SignIn() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/home';
  const { user, setTokens, setUser } = useContext(AuthContext);
  const [authTokens, setAuthTokens] = useLocalStorage('authTokens', null);

  const { email, password } = formFields;

  // useEffect(() => {
  //   if (user) {
  //     navigate("/home");
  //   }
  // }, [user]);

  const clearFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        // "https://receptionapi.cocobod.net/auth/signin",
        'http://localhost:9000/auth/signin',
        {
          email: email,
          password: password,
        }
      );

      const userResponse = await axios.get(
        // "https://receptionapi.cocobod.net/user/me",
        'http://localhost:9000/user/me',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${response?.data?.access_token}`,
          },
        }
      );

      setAuthTokens(response.data);
      setTokens(response.data);
      setUser(userResponse?.data);
      navigate(from, { replace: true });
    } catch (error) {
      setError(true);
      switch (error.code) {
        case 'ERR_NETWORK':
          setErrorMessage('Network Error!, check internet connection');
          break;
        case 'ERR_BAD_REQUEST':
          setErrorMessage('Opps! incorrect email or password!');
          break;
        default:
          console.log(error);
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="login-container flex h-screen overflow-hidden">
      <div className="hero-image-container w-full h-full flex-1">
        <img
          src={HeroImg}
          alt="hero image"
          className="hero-img object-cover w-full h-full"
          // style={{ height: "45rem" }}
        />
      </div>
      <div className="login-form-div h-full w-full flex-1 grid place-items-center">
        <div className="login-form-container w-96 h-4/6 shadow-xl rounded-xl p-8 grid place-items-center z-10">
          <div className="form-content">
            <h2 className="welcome-text text-center text-lg text-gray-700 font-semibold mb-5">
              WELCOME TO
            </h2>
            <div className="brand-logo-box flex justify-center items-center gap-2 mb-4">
              <div className="logo-container h-14 ">
                <img src={Logo} alt="cocobod logo" className="logo h-full" />
              </div>

              <div
                className="line w-px h-6"
                style={{ backgroundColor: '#724c2a' }}
              ></div>

              <h2
                className="brand-text text-lg font-semibold "
                style={{ color: '#724c2a' }}
              >
                Ghana Cocoa Board
              </h2>
            </div>

            <span className="mb-4 font-semibold block text-gray-600">
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
                required
              />
              <input
                className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />

              {error && (
                <span className="mb-5 block text-red-700 text-sm font-semibold">
                  {errorMessage}
                </span>
              )}

              {!loading ? (
                <button className="transition ease-linear duration-75 bg-gradient-to-r from-green-900 to-green-500 w-full hover:bg-gradient-to-r hover:from-green-500 hover:to-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Sign In
                </button>
              ) : (
                <SignInLoader loadingMessage="Signing" />
              )}
            </form>
            <NavLink
              to="/password-reset"
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

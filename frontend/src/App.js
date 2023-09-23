import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDataProduct } from './redux/productSlice';
import { Outlet } from 'react-router-dom';
import Header from './component/Header';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const resData = await res.json();
        dispatch(setDataProduct(resData));
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data');
      }
    })();
  }, [dispatch]);

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_DOMIN}/login`,
        { email, password }
      );
      console.log('Login successful:', response.data);

      // Handle success, e.g., update user state or redirect to a new page
    } catch (error) {
      console.error('Login error:', error);
      // Handle error, e.g., display an error message to the user
    }
  };

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className='pt-20 bg-pink-100 min-h-[calc(100vh)] '>
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Login</button>
          </form>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;






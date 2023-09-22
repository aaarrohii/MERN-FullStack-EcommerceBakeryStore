import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDataProduct } from './redux/productSlice';
import Header from './component/Header';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`);
        const resData = await res.json();
        dispatch(setDataProduct(resData));
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define the data you want to send in the POST request
    const requestData = {
      // Include your request data here
    };

    try {
      // Make a POST request to the backend URL
      const response = await axios.post(
        'https://frostedbites-ecommerce-mern-fullstack-project.vercel.app/',
        requestData
      );

      // Handle the response data
      console.log('Response from server:', response.data);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error while making the POST request:', error);
    }
  };

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className='pt-20 bg-pink-100 min-h-[calc(100vh)]'>
          <form onSubmit={handleSubmit}>
            {/* Add your form fields here */}
            <button type='submit'>Submit</button>
          </form>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;








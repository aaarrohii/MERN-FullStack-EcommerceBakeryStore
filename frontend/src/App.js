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

  
axios.defaults.withCredentials=true;
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('https://frostedbites-ecommerce-mern-fullstack-project.vercel.app/')
    .then(result=>console.log(result))
    .catch(err=>console.log(err))
  }
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








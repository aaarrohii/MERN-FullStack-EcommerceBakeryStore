import Header from './component/Header';
import './App.css';
import {useState } from "react";
import { Outlet } from 'react-router-dom';
import toast, {Toaster} from "react-hot-toast";
import { useEffect } from 'react';
import { setDataProduct } from './redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function App() {

  const dispatch=useDispatch()
  const productData=useSelector((state)=>state.product)

  useEffect(()=>{
    (async()=>{
      const res= await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`)
      const resData=await res.json()
      dispatch(setDataProduct(resData))
    })()
  },[])

  axios.defaults.withCredentials = true;
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
]
    axios
      .post(`${process.env.REACT_APP_SERVER_DOMIN}/product`, formData)
      .then((response) => {
        console.log('Response from backend:', response.data);

        toast.success('Product added successfully')
        setFormData({
          name: '',
          price: 0,]
        });
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        toast.error('Error adding product');
      });
  };
   return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className='pt-20 bg-pink-100 min-h-[calc(100vh)] '>
          {/* Your existing code */}
          <Outlet />

          {/* Example form */}
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Product Name'
              name='name'
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type='number'
              placeholder='Product Price'
              name='price'
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <button type='submit'>Add Product</button>
          </form>
        </main>
      </div>
    </>
  );
}

export default App;









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
    // Initialize your form fields here
    name: '',
    price: 0,
    // Add more fields as needed
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a POST request to your backend
    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/product`, formData)
      .then((response) => {
        // Handle the response from the backend here
        console.log('Response from backend:', response.data);
        // You can update your Redux state or perform other actions as needed

        // Show a success message or perform any other UI updates
        toast.success('Product added successfully');

        // Clear the form or perform any other necessary actions
        setFormData({
          name: '',
          price: 0,
          // Clear other form fields here
        });
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error adding product:', error);
        // Show an error message or perform other error handling as needed
        toast.error('Error adding product');
      });
  };
 
  return (
  <>
  <Toaster/>
  <div>
    <Header/>
    <main className='pt-20 bg-pink-100 min-h-[calc(100vh)] '>
      <Outlet/>
      </main>
      </div>
      </>
  )
}
export default App;









import Header from './component/Header';
import './App.css';
import { Outlet } from 'react-router-dom';
import toast, {Toaster} from "react-hot-toast";
import { useEffect } from 'react';
import { setDataProduct } from './redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'

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

  axios.defaults.withCredentials=true;
   const handleSubmit = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_DOMIN}/https://frostedbites-ecommerce-mern-fullstack-project.vercel.app/`, {

      });
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error while making the POST request:', error);
    }
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

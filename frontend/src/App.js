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
        // Replace 'https://your-backend-url.com' with the actual URL of your backend API
        const backendUrl = 'https://frostedbites-ecommerce-mern-fullstack-project.vercel.app/';

        // Define the data you want to send in the POST request
        const requestData = {
          // Include your request data here
        };

        // Make a POST request to the backend URL
        const response = await axios.post(`${backendUrl}/`, requestData);

        // Handle the response data
        console.log('Response from server:', response.data);
      } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error while making the POST request:', error);
      }
    };

    // Call the handleSubmit function when the component mounts or when you want to trigger the request
    handleSubmit();
  }, []);
    

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

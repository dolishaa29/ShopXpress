import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Stock from './Components/Stock/stock';
import Shop from './Pages/Shop';
import Shopcategory from './Pages/Shopcategory';
import Login from './Pages/Login';
import Slide from './Pages/Slide';
import Login2 from './Pages/Login2';
import Loginpg1 from './Pages/Loginpg1';
import Loginpg2 from './Pages/Loginpg2';
import Sellerprofile from './Pages/Sellerprofile';
import Viewproduct from './Pages/Viewproduct';
import Viewcart from './Pages/Viewcart';
import Addproduct from './Pages/Addproduct';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Newsletter from './Components/Assets/NewsLetter/Newsletter';
import Profile from './Pages/Profile';
import Orderhistory from './Pages/Orderhistory';
function App() {
  return (
    <div>
       <BrowserRouter>
       <Navbar/>
       <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path="/category/:category" element={<Shopcategory />} />
        <Route path='/mens' element={<Shopcategory category="men"/>}/>
        <Route path='/womens' element={<Shopcategory category="women"/>}/>
        <Route path='/kids' element={<Shopcategory category="kid"/>}/>
        <Route path='/accessories' element={<Shopcategory category="accessories"/>}/>
        <Route path='/homedecor' element={<Shopcategory category="homedecor"/>}/>
        <Route path='/slide' element={<Slide/>}/>
        <Route path='/buyer' element={<Login/>}/>
        <Route path='/seller' element={<Login2/>}/>
        <Route path='/loginpg1' element={<Loginpg1/>}/>
        <Route path='/loginpg2' element={<Loginpg2/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/sellerprofile' element={<Sellerprofile/>}/>
        <Route path='/addproduct' element={<Addproduct/>}/>
        <Route path='/viewproduct' element={<Viewproduct/>}/>
        <Route path='/viewcart' element={<Viewcart/>}/>
        <Route path='/orderhistory' element={<Orderhistory/>}/>





        
        <Route path='/addcart' element={<Viewcart/>}/>
        <Route path='/update' element={<Viewcart/>}/>
        <Route path='/delete' element={<Viewcart/>}/>
       </Routes>
       <Stock/>
       <Newsletter/>
       </BrowserRouter>
    </div>
  );
}

export default App;

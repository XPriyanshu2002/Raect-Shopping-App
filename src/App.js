import logo from "./logo.svg";
import "./App.css";
// import { BrowserRouter, Routes, Route, Link } from'react-router-dom';
import { Home } from "./component/home/home";
import { Jewelery } from "./component/jewelery/jewelery";
import { Electronics } from "./component/electronics/electronics";
import { Men } from "./component/men/men";
import { Details } from "./component/details/details";
import { MoreDetails } from "./component/more-details/more-details";
//import { Login } from './component/login/login';
import { dividerClasses } from "@mui/material";
import { FakeStore } from "./component/FakeStore";

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { Login } from "./component/login";
import { Admin } from "./component/Admin";
import { Admindashboard } from "./component/Admindashboard";
import { PaymentGateway } from "./component/Payment-gateway";
// import { Deletedashboard } from "./component/deletedashboard";


function App() {
  return (
    // <div className='container-fluid' >
    //    <BrowserRouter>
    //    <header className='d-flex justify-content-between p-4'>
    //        <div className='h3'>Shopper.</div>
    //        <nav>
    //          <span className='mx-2'> <Link to='/' className='text-decoration-none'>Home</Link> </span>
    //          <span className='mx-2'> <Link to='electronics' className='text-decoration-none'>Electronics</Link> </span>
    //          <span className='mx-2'> <Link to='jewelery' className='text-decoration-none'>Jewelery</Link> </span>
    //          <span className='mx-2'> <Link className='text-decoration-none'>Men Fashion</Link> </span>
    //          <span className='mx-2'> <Link className='text-decoration-none'>Women Fashion</Link> </span>
    //        </nav>
    //        <div>
    //          <span className='bi bi-search mx-2'></span>
    //          <span className='bi bi-person mx-2'></span>
    //          <span className='bi bi-heart mx-2'></span>
    //          <span className='bi bi-cart3 mx-2'></span>
    //        </div>
    //    </header>
    //    <article className='bg-dark text-white p-2 text-center'>
    //        <span className='bi bi-lightning-fill text-warning'></span>
    //        <span> HAPPY HOLIDAY DEALS ON EVERYTHING </span>
    //        <span className='bi bi-lightning-fill text-warning'></span>
    //    </article>
    //    <main>
    //       <Routes>
    //           <Route path='/' element={<Home />} />
    //           <Route path='jewelery' element={<Jewelery />} />
    //           <Route path='electronics' element={<Electronics />} />
    //           <Route path='men' element={<Men />} />
    //           <Route path='details/:id' element={<Details />}>
    //               <Route path='more-details/:id' element={<MoreDetails />} />
    //           </Route>
    //           <Route path='login' element={<Login />} />
    //           <Route path='*' element={<div className='text-danger'><h3>Not Found</h3><p>Path you requested not found.</p></div>} />
    //       </Routes>
    //    </main>
    //    </BrowserRouter>
    // </div>
    <div>
      {/* <BrowserRouter>
        <Routes>
          <Route path='/' Component={<FakeStore/>} />
          <Route path='/login' Component={<Login/>} />
        </Routes>
      </BrowserRouter> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FakeStore/>}></Route>
          <Route path="/home" element={<FakeStore />}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/admin" element={<Admin/>}></Route>
          <Route path="/admin-dashboard" element={<Admindashboard/>}></Route>
          <Route path="/payment-gateway" element={<PaymentGateway/>} />
         {/* <Route path='/delete-dashboard/:id' element={<Deletedashboard/>} /> */}


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

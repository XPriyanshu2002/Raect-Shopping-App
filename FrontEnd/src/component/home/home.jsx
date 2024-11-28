import { Link } from 'react-router-dom';
import './home.css';

export function Home(){
    return(
       <div className='container-fluid'>
         <header className='d-flex justify-content-between p-4'>
            <div className='h3'>Shopper.</div>
            <nav>
              <span className='mx-2'> <Link to='/' className='text-decoration-none'>Home</Link> </span>
              <span className='mx-2'> <Link to='electronics' className='text-decoration-none'>Electronics</Link> </span>
              <span className='mx-2'> <Link to='jewelery' className='text-decoration-none'>Jewelery</Link> </span>
              <span className='mx-2'> <Link className='text-decoration-none'>Men Fashion</Link> </span>
              <span className='mx-2'> <Link className='text-decoration-none'>Women Fashion</Link> </span>
            </nav>
            <div>
              <span className='bi bi-search mx-2'></span>
              <span className='bi bi-person mx-2'></span>
              <span className='bi bi-heart mx-2'></span>
              <span className='bi bi-cart3 mx-2'></span>
            </div>
        </header>
        <article className='bg-dark text-white p-2 text-center'>
            <span className='bi bi-lightning-fill text-warning'></span>
            <span> HAPPY HOLIDAY DEALS ON EVERYTHING </span>
            <span className='bi bi-lightning-fill text-warning'></span>
        </article>
        <div className="row p-3">
            <div className="jewelery col">
                <div className='main-title'>
                    JEWELERY
                </div>
                <div>
                    <Link className='btn btn-light' to="jewelery"> Shop <span className='bi bi-arrow-right'></span> </Link>
                </div>
            </div>
            <div className="men-fashion col">
                <div className='main-title'>
                    MEN FASHION
                </div>
                <div>
                    <Link className='btn btn-light' to="men"> Shop <span className='bi bi-arrow-right'></span> </Link>
                </div>
            </div>
            <div className="women-fashion col">
            <div className='main-title'>
                    WOMEN FASHION
                </div>
                <div>
                    <Link className='btn btn-light' to="women"> Shop <span className='bi bi-arrow-right'></span> </Link>
                </div>
            </div>
        </div>
        <div className='d-flex justify-content-center align-items-center'>
            <Link to="/login" className='btn btn-primary w-25 mt-3 mx-3'>Login</Link>
            <Link to="/login" className='btn btn-danger w-25 mt-3 mx-3'>Register</Link>
        </div>
       </div>
    )
}
import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";


export function Electronics(){

    const [electronics, setElectronics] = useState([{id:0, title:'', price:'', image:'', description:'', category:'', rating:{rate:0, count:0}}]);

    useEffect(()=>{
        axios.get('https://fakestoreapi.com/products/category/electronics')
        .then(response=> {
            setElectronics(response.data);
        })
    },[]);

    return(
        <div className="d-flex flex-wrap">
            {
                electronics.map(product=> 
                 <div key={product.id} className="card m-2 p-2" style={{width:'200px'}}>
                    <img src={product.image} height="130" className="card-img-top" />
                    <div className="card-header" style={{height:'130px'}} >
                        {product.title}
                    </div>
                    <div className="card-footer">
                        <Link to={`/details/${product.id}`} className="btn btn-dark w-100" >Details</Link>
                    </div>
                 </div>
                )
            }
        </div>
    )
}
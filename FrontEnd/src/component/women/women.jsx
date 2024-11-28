import { Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Women() {
    const [women, setWomen] = useState([]);

    useEffect(()=>{
        axios.get("https://fakestoreapi.com/products/category/women\'s clothing")
        .then(response=>{
            setWomen(response.data);
        })
    },[])

    return(
        <div className="container-fluid d-flex flex-wrap">
            {
                women.map(w=>
                    <div className="card m-2 p-2" style={{width:"200px"}}>
                        <img src={w.image} className=" card-img-top" height={150} />
                        <div className=" card-header" style={{height:"120px"}}>
                            {w.title}
                        </div>
                        <div className=" card-footer">
                            <Link to={`/details/${w.id}`} className="btn btn-dark w-100">Details</Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
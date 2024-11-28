import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"


export function MoreDetails(){

    let params = useParams();

    const [product, setProduct] = useState({id:0, title:'', price:'', image:'', description:'', category:'', rating:{rate:0, count:0}});

    useEffect(()=>{
        axios.get(`https://fakestoreapi.com/products/${params.id}`)
        .then(response=> {
            setProduct(response.data);
        })
    },[])

    return(
        <div>
            <h4>More Details</h4>
            <dl>
                <dt>Description</dt>
                <dd>
                    <textarea rows="4" cols="40" value={product.description}></textarea>
                </dd>
                <dt>Rating</dt>
                <dd>
                   {product.rating.rate} <span className="bi bi-star-fill text-success"></span> [{product.rating.count}]
                </dd>
            </dl>
            <Link to={`/details/${product.id}`}>Hide</Link>
        </div>
    )
}
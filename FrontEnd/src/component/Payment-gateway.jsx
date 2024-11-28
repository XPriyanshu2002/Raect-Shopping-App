import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function PaymentGateway() {

    const [product, setProduct] = useState([]);
    const [price, setPrice] = useState([]);
    // const [pri, setPri] = useState();
    // const [num, setNum] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [cookie, setCookie, removeCookie] = useCookies("user-id");
    var navigate = useNavigate();

    function LoadProduct() {
        axios.get(`http://127.0.0.1:3210/get-user/${cookie["user-id"]}`)
        .then(response=>{
            let user = parseInt(response.data.map(u=>u.Mobile));
            axios.get(`http://127.0.0.1:3210/get-products/${user}`)
            .then(response=>{
                let price = response.data.map(p=>p.price);
                setPrice(price);
                setProduct(response.data);
                ProductNumber();
            })
        })
    }

    // function LoadPrice() {
    //     axios.get(`http://127.0.0.1:3210/get-user/${cookie["user-id"]}`)
    //     .then(response=>{
    //         let userRef = parseInt(response.data.map(u=>u.Mobile));
    //         axios.get(`http://127.0.0.1:3210/get-products/${userRef}`)
    //         .then(response=>{
    //             let price = response.data.map(p=>p.price);
    //             setPrice(price);
    //             ProductNumber();
    //             let total = price.reduce((t)=>t);
    //         })
    //     })       
    // }


    function TotalPrice() {
        var v = price.map(p=>p);
        console.log(v);
        var j = 0;
        //console.log(price.map(p=>p));
        for (let i = 0; i < price.length; i++) {
             j += v[i];
            console.log(j);
            setTotalPrice(j);
        }
    }

    function ProductNumber() {
        console.log("ProductNumber Start");
        // var n = "";
        // for (let i = 1; i <= product.length; i++) {
        //     for (let j = 0; j<product.length; j++) {
        //         n += "Product" + i + price[j] + "<br/><br/><br/>";
        //     }  
        // }
        // document.getElementById("productNumber").innerHTML= n;

        let n = "";
        let p = "";
        for(let i = 1; i<=price.length; i++) {
            n += "Product" + i + "<br/>";
            console.log(n);
        }

        document.getElementById("productNumber").innerHTML = n;

        for(let i=0; i<price.length; i++) {
            
            p += "$" + price[i] + "<br/>";
            console.log(price[i]);
        }

        document.getElementById("productPrice").innerHTML = p;
        console.log("ProductNumber End");
    }

    useEffect(()=>{
        if (cookie["user-id"]) {
            LoadProduct();
            //LoadPrice();
            TotalPrice();
        } else {
            navigate("*");
        }       
    },[])

    return (
        <div>
            <h1 className="my-3 ms-4">Payment Gateway</h1>
            <div className="row container-fluid">
                <div className="d-flex flex-wrap col-8">
                    {
                        product.map(prodct=>
                            <Card sx={{maxHeight:700, maxWidth:300, margin:2}}>
                                <CardMedia className="p-3" image={prodct.image} component="img" height={400} />
                                <CardHeader title={prodct.title} />
                                <CardContent sx={{font:"icon"}}>{`\$${prodct.price}`}</CardContent>
                            </Card>
                        )
                    }
                </div>
                <div className="col-4 d-flex align-items-center bg-warning">
                    <div className="w-100">
                        <h3 className="text-primary mb-5" style={{marginLeft:"200px"}}>RECIPT</h3>
                        <div className="d-flex justify-content-center align-items-center w-100">
                            <span className="h5 mt-5 mx-5" id="productNumber"></span>
                            <span className="h5 mt-5 mx-5" id="productPrice"></span>
                        </div>
                        <div className="d-flex justify-content-center align-items-center w-100">
                            <span className="h3 mt-5 mx-5">Grand Total</span>
                            <span className="h3 mt-5 mx-5">{`$${totalPrice}`}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
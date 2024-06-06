import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export function PaymentGateway() {

    const [product, setProduct] = useState([]);
    const [price, setPrice] = useState([]);
    const [pri, setPri] = useState();
    const [num, setNum] = useState();
    const [totalPrice, setTotalPrice] = useState();

    function LoadProduct() {
        axios.get("http://127.0.0.1:3210/get-products")
        .then(response=>{
            console.log(response.data)

            setProduct(response.data);
            
        }
        )
    }

    function LoadPrice() {
        axios.get("http://127.0.0.1:3210/get-products")
        .then(response=>{
            let price = response.data.map(p=>p.price);
            setPrice(price);
            //console.log(response.data.map(p=>p.price));
            ProductNumber();
            let total = price.reduce((t)=>t);
            console.log(price);
        })
    }

    // function TotalPrice() {
    //     product
    // }

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
        for(let i = 1; i<=product.length; i++) {
            n += "Product" + i + "<br/>";
            //console.log(i);
            console.log(n);
        }
        document.getElementById("productNumber").innerHTML = n;
        //setNum(n);
        //console.log(num);

        for(let i=0; i<product.length; i++) {
            
            p += "$" + price[i] + "<br/>";
            console.log(price[i]);
            //console.log(p);
            //setPri(price[i]);
        }        
        document.getElementById("productPrice").innerHTML = p;
        //setPri(p);
        //console.log(pri);
        console.log("ProductNumner Exit");
    }

    useEffect(()=>{
        LoadProduct();
        LoadPrice();       
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
                            <span className="h3 mt-5 mx-5">{}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
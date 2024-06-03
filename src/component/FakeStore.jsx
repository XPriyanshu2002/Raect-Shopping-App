import axios from 'axios';
import { useEffect, useState } from 'react';
import  Modal  from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Card , CardHeader , CardMedia , CardContent , CardActions , Fade , IconButton, Box, Slider, Paper, Menu, MenuItem, Divider, InputBase, Autocomplete, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { PriceRange } from './PriceRange';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export function FakeStore() {
    const [categories,setCategories] = useState([]);
    const [products,setProducts] = useState([]);
    const [cartCount,setCartCount] = useState(0);
    const [modalOpen,setModalOpen] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const mark = [{value:0,label:"$0"},{value:1000,label:"$1000"}];
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filterCategory, setFilterCategory] = useState();
    const [searchItems, setSearchItems] = useState([]);
    const [suggetsions,setSuggestions] = useState([""]);
    const [menuOpen,setMenuOpen] = useState(false);
    const [anchor,setAnchor] = useState(null);
    const [allSuggestions, setAllSuggestions] = useState([]);
    var navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies("user-id");
    const [user , setuser] = useState("")
    

    function LoadCategories() {
        axios.get('https://fakestoreapi.com/products/categories')
        .then(response=>{
            response.data.unshift('all');
            setCategories(response.data);
        })
    }
    function loaduser(){
        if(cookie["user-id"]!==undefined){
            setuser(cookie["user-id"]);
            document.getElementById("greet").innerText=`Welcome ${cookie["user-id"]}`;
            console.log(`Welcome ${cookie["user-id"]}`);

        }else{
            document.getElementById("greet").innerText="";
        }
    }
    
    function LoadProducts(url) {
        axios.get(url)
        .then(response=>{
            setProducts(response.data);
        })
    }

    function LoadTitle() {
        axios.get("https://fakestoreapi.com/products")
        .then(response=>{
            let t=response.data;
            setSearchItems(t.map(m=>m.title));
        })
    }

    useEffect(()=>{
        LoadCategories();
        LoadProducts('https://fakestoreapi.com/products');
        LoadTitle();
        LoadAllSuggestions();
        console.log(cookie["user-id"])
        loaduser();
        //console.log(searchItems)
    },[])


    function handleCategoryChange(e) {
        if(e.target.value=='all') {
            LoadProducts('https://fakestoreapi.com/products');
            setFilterCategory("all");
        } else {
            LoadProducts(`https://fakestoreapi.com/products/category/${e.target.value}`);
            setFilterCategory(e.target.value);
        }
    }

    function handleNavClick(f) {
        if(f.target.value=='all') {
            LoadProducts('https://fakestoreapi.com/products');
            setFilterCategory("all");
        } else {
            LoadProducts(`https://fakestoreapi.com/products/category/${f.target.value}`);
            setFilterCategory(f.target.value);
        }
    }

    function handleAddClick(product) {
        setCartCount(cartCount+1);
        cartItems.push(product);
        if(totalPrice==0) {
            setTotalPrice(product.price);
        } else {
            setTotalPrice(totalPrice + product.price);
        }
    }

    function handleModalOpen() {
        setModalOpen(true);
    }

    function handleModalClose() {
        setModalOpen(false);
    }

    function handleRemoveClick(item) {
        cartItems.splice(cartItems.indexOf(item),1);
        setCartCount(cartItems.length);
        setTotalPrice(totalPrice - item.price);
    }

    function handleRemoveAllClick() {
        setCartItems([]);
        setCartCount(0);
        setTotalPrice(0);
    }

    function handlePriceChange(e,value) {
        setPrice(value);
        setFilteredProducts(products.filter(p=>p.price<=value));
    }

    function handleFilterClick() {
        if(filterCategory==="all") {
            axios.get("http://fakestoreapi.com/products")
            .then(response=>{
                let p = response.data;
                setProducts(p.filter(i=>i.price<=price));
            })
        } else if (filterCategory) {
            axios.get(`https://fakestoreapi.com/products/category/${filterCategory}`)
            .then(response=>{
                let p=response.data;
                setProducts(p.filter(i=>i.price<=price));
            })
        } else {
            axios.get("http://fakestoreapi.com/products")
            .then(response=>{
                let p = response.data;
                setProducts(p.filter(i=>i.price<=price));
            })
        }
    }

    function handleSearch(param,val){ 
        let find = val;
        const suggestion = find && searchItems.filter(d=>d.toLowerCase().includes(find.toLowerCase()));
        setSuggestions(suggestion);
        console.log(param);
        console.log(val);
    }

    function handleMenuClose() {
        setMenuOpen(false);
    }

    function handleSuggestionChange(e) {
        console.log(e.target.outerText);
        if (e.target.outerText) {
            axios.get("https://fakestoreapi.com/products")
            .then(response=>{
                let products = response.data;
                const prodct = [products.find(p=>p.title===e.target.outerText)];
                console.log(prodct);
                setProducts(prodct);
            })
        } else {

        }
    }

    function LoadAllSuggestions() {
        axios.get("https://fakestoreapi.com/products")
        .then(response=>{
            let a = response.data;
            let b = a.map(s=>s.title);
            setAllSuggestions(b)
        })
    }
    function signoutclick(){
        removeCookie("user-id")
    }

    function handlePurchaseClick() {
        if (cartCount===0) {
            alert("Cart is Empty!")
        } else {
            if (cookie["user-id"]) {
                axios.post("http://127.0.0.1:3210/post-product",cartItems)
                .then(()=>{
                    console.log("Items Added to Database");
                })
                navigate("/payment-gateway");
            } else {
                navigate("/login");
            }   
        }
    }

    
    return(
        <div className='container-fluid'>
            <div id='Header' className='d-flex justify-content-between bg-black text-white p-2'>
                <div className='d-flex'><ShoppingBagIcon fontSize='large' sx={{mt:1, mr:1}}/><h1 className='mt-1'>FAKESTORE</h1></div>
                <div className='mt-2'>
                    {
                        categories.map(category=> <Button key={category} component='button' value={category} onClick={handleNavClick} sx={{mx:1}} color='inherit'>{category.toUpperCase()}</Button>)
                    }
                </div>
                <div className='mt-2'>
                    <span className='bi bi-heart-fill me-4'></span>
                    <Link to ="/admin"className='bi bi-person-fill me-4'></Link>
                    <button className='btn btn-warning bi bi-cart4 position-relative' onClick={handleModalOpen}><span className='badge position-absolute bg-danger rounded rounded-circle'>{cartCount}</span></button>
                </div>
            </div>
            <div id='Body' className='row mt-1'>
                <div className='col-2'>
                <div className='d-flex justify-content-between'>
                <h4 id='greet' className='text-primary'></h4>
                {/* <button className='btn btn-warning' onClick={signoutclick}>Signout</button> */}
                
                </div >
                
                    <Paper component="form" sx={{margin:"15px", display: "flex", alignItems: "center", width: 500, ml:"550px" }}>
                    
                        <Autocomplete freeSolo  options={(suggetsions)?suggetsions:allSuggestions} onChange={handleSuggestionChange} fullWidth renderInput={(params)=> <TextField onChange={(e)=>handleSearch(params,e.target.value)}  label="Search Fakestore" {...params}/>} />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon/>
                        </IconButton>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical"/>
                    </Paper>
                    <div className="container-fluid mt-4">
                        <h5>Set Price</h5>
                        <Box>
                            <Slider max={1000} min={0} step={10} value={price} onChange={handlePriceChange} valueLabelDisplay="auto" marks={mark}/>
                            <Button variant="contained"sx={{ml:"60px"}} onClick={handleFilterClick}>Filter</Button>
                        </Box>
                    </div> 
                </div>
                <div className='col-10 d-flex flex-wrap overflow-auto' style={{height:'700px',marginTop:"130px"}}>
                    
                    {
                        products.map(product=> 
                            <div className='card m-4 p-2' key={product.id} style={{width:"300px"}}>
                                <img src={product.image} className='card-image-top ' height="270" />
                                <div className='card-header fw-bold' style={{height:"100px"}}>{product.title}</div>
                                <div className='card-body d-flex justify-content-between'>
                                    <dl>
                                        <dt>Price</dt>
                                        <dd className='mt-1'><span className='bi bi-currency-dollar'></span>{product.price}</dd>
                                    </dl>
                                    <dl>
                                        <dt>Rating</dt>
                                        <dd className='m-1'>{product.rating.rate}<span className='bi bi-star-fill text-success ms-1'></span></dd>
                                    </dl>
                                </div>
                                <div className='card-footer'>
                                    <button className='btn btn-dark bi bi-cart4 w-100' onClick={()=>handleAddClick(product)}>Add to Cart</button>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div>
                    <Modal open={modalOpen} className='d-flex justify-content-center align-items-center'>
                        <Fade in={modalOpen}>
                            <div className='modal-content modal-dialog-scrollable bg-white h-75 w-75'>
                                <div className='modal-header bg-black p-3 d-flex justify-content-between text-white border-bottom border-2'>
                                    <h3>Cart Items<span className='bi bi-cart3 mx-1'></span></h3>
                                    <button onClick={handleModalClose} className='btn btn-danger me-2 p-1'><span className='bi bi-x-lg mx-1'></span></button>
                                </div>
                                <div className='modal-body'>
                                    {
                                       cartItems.map(item=>
                                            <Card sx={{maxHeight:400, display:'flex',width:1170 }}  className='m-2' key={item.id}>
                                                <CardMedia component='img' image={item.image} height='200' sx={{width:300}} />
                                                <CardHeader title={item.title} action={<IconButton color='error'onClick={()=>handleRemoveClick(item)}><Delete fontSize='medium'/></IconButton>} sx={{width:873}} subheader={item.description} />
                                            </Card>
                                       ) 
                                    }
                                </div>
                                <div className='modal-footer d-flex justify-content-between bg-black  border-top border-2 p-2'>
                                    <div className=' d-flex text-white ps-3'>
                                        <div className=' modal-header '>Total Amount :</div>
                                        <div className='ms-3'>
                                            <span className='bi bi-currency-dollar'></span>
                                            {totalPrice.toLocaleString()}
                                        </div>
                                    </div>
                                    <div>
                                        <button className='btn btn-danger mx-2' onClick={handleRemoveAllClick}>Remove All</button>
                                        <button className='btn btn-success' onClick={handlePurchaseClick}>Proceed To Buy</button>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
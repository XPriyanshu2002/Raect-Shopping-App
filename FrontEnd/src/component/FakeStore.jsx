import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Fade,
  IconButton,
  Box,
  Slider,
  Paper,
  Menu,
  MenuItem,
  Divider,
  InputBase,
  Autocomplete,
  TextField,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Delete, Email, Password } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { PriceRange } from "./PriceRange";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Formik, useFormik } from "formik";
import * as yup from "yup";

export function FakeStore() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const mark = [
    { value: 0, label: "$0" },
    { value: 1000, label: "$1000" },
  ];
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState();
  const [searchItems, setSearchItems] = useState([]);
  const [suggetsions, setSuggestions] = useState([""]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [allSuggestions, setAllSuggestions] = useState([]);
  var navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies("user-id");
  const [user, setuser] = useState([
    { UserName: "", UserId: "", Password: "", Email: "", Mobile: "" },
  ]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [customerCareModalOpen, setCustomerCareModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      UserName: user[0].UserName,
      UserId: user[0].UserId,
      Password: user[0].Password,
      Email: user[0].Email,
      Mobile: user[0].Mobile,
    },
    validationSchema: yup.object({
      UserName: yup.string().required("Required"),
      UserId: yup.string().required("Required"),
      Password: yup.string().required("Required"),
      Email: yup.string().required("Required"),
      Mobile: yup
        .string()
        .required("Required")
        .matches(/\d{10}/, "Please Enter a Valid Mobile No."),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      axios
        .put(`http://127.0.0.1:3210/edit-user/${values.UserId}`, values)
        .then(() => {
          console.log("User Updated");
          //navigate("/home");
          setProfileModalOpen(false);
          setDrawerOpen(false);
        });
    },
  });

  // function LoadForm() {
  //   if (cookie["user-id"]) {
  //     const formik = useFormik({
  //       initialValues: {
  //         UserName: user[0].UserName,
  //         UserId: user[0].UserId,
  //         Password:user[0].Password,
  //         Email: user[0].Email,
  //         Mobile: user[0].Mobile
  //       },
  //       enableReinitialize:true,
  //       onSubmit:(values) =>{
  //         console.log(values)
  //       }
  //     });
  //   } else {
  //     const formik = useFormik({
  //       initialValues: {
  //         UserName: user.UserName,
  //         UserId: user.UserId,
  //         Password:user.Password,
  //         Email: user.Email,
  //         Mobile: user.Mobile
  //       },
  //       enableReinitialize:true,
  //       onSubmit:(values) =>{
  //         console.log(values)
  //       }
  //     });
  //   }
  // }

  function LoadCategories() {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => {
        response.data.unshift("all");
        setCategories(response.data);
      });
  }

  function DisplayUser() {
    if (cookie["user-id"] !== undefined) {
      //setuser(cookie["user-id"]);
      document.getElementById("greet").innerText = `Welcome ${cookie[
        "user-id"
      ].toUpperCase()}`;
      //console.log(`Welcome ${cookie["user-id"]}`);
    } else {
      document.getElementById("greet").innerText = "";
    }
  }

  function LoadProducts(url) {
    axios.get(url).then((response) => {
      setProducts(response.data);
    });
  }

  function LoadTitle() {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      let t = response.data;
      setSearchItems(t.map((m) => m.title));
    });
  }

  useEffect(() => {
    if (cookie["user-id"]) {
      LoadCategories();
      LoadProducts("https://fakestoreapi.com/products");
      LoadTitle();
      LoadAllSuggestions();
      DisplayUser();
      LoadUser();
      Cart();
    } else {
      navigate("*");
    }
  }, []);

  function handleCategoryChange(e) {
    if (e.target.value == "all") {
      LoadProducts("https://fakestoreapi.com/products");
      setFilterCategory("all");
    } else {
      LoadProducts(
        `https://fakestoreapi.com/products/category/${e.target.value}`
      );
      setFilterCategory(e.target.value);
    }
  }

  function handleNavClick(f) {
    if (f.target.value == "all") {
      LoadProducts("https://fakestoreapi.com/products");
      setFilterCategory("all");
    } else {
      LoadProducts(
        `https://fakestoreapi.com/products/category/${f.target.value}`
      );
      setFilterCategory(f.target.value);
    }
  }

  async function Cart() {
    await axios
      .get(`http://127.0.0.1:3210/get-user/${cookie["user-id"]}`)
      .then((response) => {
        let user = parseInt(response.data.map((u) => u.Mobile));
        axios
          .get(`http://127.0.0.1:3210/get-products/${user}`)
          .then((response) => {
            setCartItems(response.data);
            setCartCount(response.data.length);
          });
      });
  }

  function handleAddClick(product) {
    setCartCount(cartCount + 1);
    product.userRef = parseInt(user.map((u) => u.Mobile));
    cartItems.push(product);
    if (totalPrice == 0) {
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

  async function handleRemoveClick(item) {
    console.log(item.userRef);
    // await axios.delete(`http://127.0.0.1:3210/delete-product/${item.userRef}`)
    // .then(()=>{
    //   //Cart();
    // })
    // //cartItems.splice(cartItems.indexOf(item), 1);
    // console.log(cartItems);

    setCartCount(cartItems.length);
    setTotalPrice(totalPrice - item.price);
  }

  function handleRemoveAllClick() {
    setCartItems([]);
    setCartCount(0);
    setTotalPrice(0);
  }

  function handlePriceChange(e, value) {
    setPrice(value);
    setFilteredProducts(products.filter((p) => p.price <= value));
  }

  function handleFilterClick() {
    if (filterCategory === "all") {
      axios.get("http://fakestoreapi.com/products").then((response) => {
        let p = response.data;
        setProducts(p.filter((i) => i.price <= price));
      });
    } else if (filterCategory) {
      axios
        .get(`https://fakestoreapi.com/products/category/${filterCategory}`)
        .then((response) => {
          let p = response.data;
          setProducts(p.filter((i) => i.price <= price));
        });
    } else {
      axios.get("http://fakestoreapi.com/products").then((response) => {
        let p = response.data;
        setProducts(p.filter((i) => i.price <= price));
      });
    }
  }

  function handleSearch(param, val) {
    let find = val;
    const suggestion =
      find &&
      searchItems.filter((d) => d.toLowerCase().includes(find.toLowerCase()));
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
      axios.get("https://fakestoreapi.com/products").then((response) => {
        let products = response.data;
        const prodct = [products.find((p) => p.title === e.target.outerText)];
        console.log(prodct);
        setProducts(prodct);
      });
    } else {
    }
  }

  function LoadAllSuggestions() {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      let a = response.data;
      let b = a.map((s) => s.title);
      setAllSuggestions(b);
    });
  }

  function signoutclick() {
    removeCookie("user-id");
  }

  function handlePurchaseClick() {
    if (cartCount === 0) {
      alert("Cart is Empty!");
    } else {
      if (cookie["user-id"]) {
        //cartItems.unshift(user.map(u=>u.Mobile));
        axios.post("http://127.0.0.1:3210/post-product", cartItems).then(() => {
          console.log("Items Added to Database");
        });
        navigate("/payment-gateway");
      } else {
        navigate("/login");
      }
    }
  }

  function handleDrawerClick() {
    setDrawerOpen(true);
  }

  function handleDrawerClose() {
    setDrawerOpen(false);
  }

  function LoadUser() {
    if (cookie) {
      axios
        .get(`http://127.0.0.1:3210/get-user/${cookie["user-id"]}`)
        .then((response) => {
          let u = response.data;
          setuser(u);
        });
    } else {
      navigate("/");
    }
  }

  function handleItemButtonClick(e) {
    if (e === "Profile") {
      setProfileModalOpen(true);
    } else if (e === "Order") {
      setOrderModalOpen(true);
    } else if (e === "Customer Care") {
      setCustomerCareModalOpen(true);
    } else {
      setLogoutModalOpen(true);
    }
  }

  function handleAllModalClose() {
    setProfileModalOpen(false);
    setOrderModalOpen(false);
    setCustomerCareModalOpen(false);
    setLogoutModalOpen(false);
  }
  function yesClick() {
    removeCookie("user-id");
    navigate("/");
    //alert("Yes clicked");
  }
  function noClick() {
    setLogoutModalOpen(false);
  }

  function handleProfileCancle() {
    setProfileModalOpen(false);
    //setDrawerOpen(false);
  }

  return (
    <div className="container-fluid">
      <div
        id="Header"
        className="d-flex justify-content-between bg-black text-white p-2"
      >
        <div className="d-flex">
          {/* <button className='btn' data-bs-toggle="offcanvas" data-bs-target="userOffcanvas" aria-controls="offcanvasWithBothOptions">*/}
          <IconButton onClick={handleDrawerClick}>
            <MenuIcon sx={{ color: "white" }} fontSize="large" />
          </IconButton>
          {/*</button>*/}
          <ShoppingBagIcon fontSize="large" sx={{ mt: 1.2 }} />
          <h1 className="mt-1">FAKESTORE</h1>
        </div>
        {/* <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="userOffcanvas" aria-labelledby="offcanvasWithBothOptionsLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="userOffcanvas">Backdrop with scrolling</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <p>Try scrolling the rest of the page to see this option in action.</p>
                    </div> 
                </div>*/}
        <Drawer open={drawerOpen} onClose={handleDrawerClose}>
          {/* <button className='mt-2' style={{marginLeft:"75px", marginRight:"75px"}}>User Details</button> */}
          {/* {
                        user.map(u=>
                            <List>
                                <ListItem> User-ID : {u.UserId}</ListItem>
                                <ListItem> User Name : {u.UserName}</ListItem>
                                <ListItem> Email : {u.Email}</ListItem>
                                <ListItem> Mobile : {u.Mobile}</ListItem>
                                <ListItem className='d-flex justify-content-center'><Button variant='outlined'>Edit<span className='bi bi-pen ms-3'></span></Button></ListItem>
                            </List>
                        )
                    }                        */}

          <List>
            {["Profile", "Order", "Customer Care", "Log Out"].map(
              (text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      handleItemButtonClick(text);
                    }}
                  >
                    <ListItemIcon>
                      {index % 2 === 0 ? (
                        <AccountCircleIcon />
                      ) : (
                        <LocalMallIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Drawer>
        <Modal
          open={profileModalOpen}
          onClose={handleAllModalClose}
          className="d-flex justify-content-center align-items-center"
        >
          <Fade in={profileModalOpen}>
            <div className="modal-content modal-dialog-scrollable bg-white h-75 w-75">
              <form onSubmit={formik.handleSubmit} className="container-fluid">
                <div className="row">
                  <div className="col-3 ms-4">
                    <h5 className="my-4">User Name</h5>
                    <h5 className="my-4">User Id</h5>
                    <h5 className="my-4">Password</h5>
                    <h5 className="my-4">Email</h5>
                    <h5 className="my-4">Mobile</h5>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      value={formik.values.UserName}
                      onChange={formik.handleChange}
                      name="UserName"
                      className="form-control my-3 w-50"
                    />
                    <div className="text-danger">{formik.errors.UserName}</div>
                    <input
                      type="text"
                      value={formik.values.UserId}
                      readOnly
                      onChange={formik.handleChange}
                      name="UserId"
                      className="form-control my-3 w-50"
                    />
                    <div className="text-danger">{formik.errors.UserId}</div>
                    <input
                      type="password"
                      value={formik.values.Password}
                      onChange={formik.handleChange}
                      name="Pssword"
                      className="form-control my-3 w-50"
                    />
                    <div className="text-danger">{formik.errors.Password}</div>
                    <input
                      type="text"
                      value={formik.values.Email}
                      readOnly
                      onChange={formik.handleChange}
                      name="Email"
                      className="form-control my-3 w-50"
                    />
                    <div className="text-danger">{formik.errors.Email}</div>
                    <input
                      type="text"
                      value={formik.values.Mobile}
                      onChange={formik.handleChange}
                      name="Mobile"
                      className="form-control my-3 w-50"
                    />
                    <div className="text-danger">{formik.errors.Mobile}</div>
                  </div>
                  <div className="text-center mt-4">
                    <button
                      className="btn btn-success mx-3 text-center"
                      type="submit"
                    >
                      Submit
                    </button>
                    <button
                      className="btn btn-danger "
                      style={{ marginRight: "170px" }}
                      type="cancle"
                      onClick={handleProfileCancle}
                    >
                      Cancle
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Fade>
        </Modal>
        <Modal
          open={orderModalOpen}
          onClose={handleAllModalClose}
          className="d-flex justify-content-center align-items-center"
        >
          <Fade in={orderModalOpen}>
            <div className="modal-content modal-dialog-scrollable bg-white h-75 w-75"></div>
          </Fade>
        </Modal>
        <Modal
          open={customerCareModalOpen}
          onClose={handleAllModalClose}
          className="d-flex justify-content-center align-items-center"
        >
          <Fade in={customerCareModalOpen}>
            <div className="modal-content modal-dialog-scrollable bg-white h-75 w-75"></div>
          </Fade>
        </Modal>
        <Modal
          open={logoutModalOpen}
          onClose={handleAllModalClose}
          className="d-flex justify-content-center align-items-center"
        >
          <Fade in={logoutModalOpen}>
            <div className="modal-content modal-dialog-scrollable bg-white h-75 w-75 d-flex justify-content-center align-items-center">
              <div className="alert alert-danger w-25">
                <p>Confirm Logout</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-success" onClick={yesClick}>
                    Yes
                  </button>
                  <button className="btn btn-danger" onClick={noClick}>
                    No
                  </button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
        <div className="mt-2 me-5">
          {categories.map((category) => (
            <Button
              key={category}
              component="button"
              value={category}
              onClick={handleNavClick}
              sx={{ mx: 1 }}
              color="inherit"
            >
              {category.toUpperCase()}
            </Button>
          ))}
        </div>
        <div className="mt-2">
          <span className="bi bi-heart-fill me-4"></span>
          <Link to="/admin" className="bi bi-person-fill me-4"></Link>
          <button
            className="btn btn-warning bi bi-cart4 position-relative"
            onClick={handleModalOpen}
          >
            <span className="badge position-absolute bg-danger rounded rounded-circle">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
      <div id="Body" className="row mt-1">
        <div className="col-2">
          <div className="d-flex justify-content-between">
            <h4 id="greet" className="text-primary"></h4>
            {/* <button className='btn btn-warning' onClick={signoutclick}>Signout</button> */}
          </div>
          <Paper
            component="form"
            sx={{
              margin: "15px",
              display: "flex",
              alignItems: "center",
              width: 500,
              ml: "550px",
              mt: "-20px",
            }}
          >
            <Autocomplete
              freeSolo
              options={suggetsions ? suggetsions : allSuggestions}
              onChange={handleSuggestionChange}
              fullWidth
              renderInput={(params) => (
                <TextField
                  onChange={(e) => handleSearch(params, e.target.value)}
                  label="Search Fakestore"
                  {...params}
                />
              )}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          </Paper>
          <div className="container-fluid mt-4">
            <h5>Set Price</h5>
            <Box>
              <Slider
                max={1000}
                min={0}
                step={10}
                value={price}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                marks={mark}
              />
              <Button
                variant="contained"
                sx={{ ml: "60px" }}
                onClick={handleFilterClick}
              >
                Filter
              </Button>
            </Box>
          </div>
        </div>
        <div
          className="col-10 d-flex flex-wrap overflow-auto"
          style={{ height: "700px", marginTop: "100px" }}
        >
          {products.map((product) => (
            <div
              className="card m-4 p-2"
              key={product.id}
              style={{ width: "300px" }}
            >
              <img
                src={product.image}
                className="card-image-top "
                height="270"
              />
              <div className="card-header fw-bold" style={{ height: "100px" }}>
                {product.title}
              </div>
              <div className="card-body d-flex justify-content-between">
                <dl>
                  <dt>Price</dt>
                  <dd className="mt-1">
                    <span className="bi bi-currency-dollar"></span>
                    {product.price}
                  </dd>
                </dl>
                <dl>
                  <dt>Rating</dt>
                  <dd className="m-1">
                    {product.rating.rate}
                    <span className="bi bi-star-fill text-success ms-1"></span>
                  </dd>
                </dl>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-dark bi bi-cart4 w-100"
                  onClick={() => handleAddClick(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Modal
            open={modalOpen}
            className="d-flex justify-content-center align-items-center"
          >
            <Fade in={modalOpen}>
              <div className="modal-content modal-dialog-scrollable bg-white h-75 w-75">
                <div className="modal-header bg-black p-3 d-flex justify-content-between text-white border-bottom border-2">
                  <h3>
                    Cart Items<span className="bi bi-cart3 mx-1"></span>
                  </h3>
                  <button
                    onClick={handleModalClose}
                    className="btn btn-danger me-2 p-1"
                  >
                    <span className="bi bi-x-lg mx-1"></span>
                  </button>
                </div>
                <div className="modal-body">
                  {cartItems.map((item) => (
                    <Card
                      sx={{ maxHeight: 400, display: "flex", width: 1170 }}
                      className="m-2"
                      key={item.id}
                    >
                      <CardMedia
                        component="img"
                        image={item.image}
                        height="200"
                        sx={{ width: 300 }}
                      />
                      <CardHeader
                        title={item.title}
                        action={
                          <IconButton
                            color="error"
                            onClick={() => handleRemoveClick(item)}
                          >
                            <Delete fontSize="medium" />
                          </IconButton>
                        }
                        sx={{ width: 873 }}
                        subheader={item.description}
                      />
                    </Card>
                  ))}
                </div>
                <div className="modal-footer d-flex justify-content-between bg-black  border-top border-2 p-2">
                  <div className=" d-flex text-white ps-3">
                    <div className=" modal-header ">Total Amount :</div>
                    <div className="ms-3">
                      <span className="bi bi-currency-dollar"></span>
                      {totalPrice.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={handleRemoveAllClick}
                    >
                      Remove All
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={handlePurchaseClick}
                    >
                      Proceed To Buy
                    </button>
                  </div>
                </div>
              </div>
            </Fade>
          </Modal>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

export function Login() {

    const [cookie, setCookie, removeCookie] = useCookies("user-id");
    const [view, setView] = useState(false);
    let navigate = useNavigate();
    const Registerformik = useFormik({
        initialValues:{ UserId:"", UserName:"", Password:"", Email:"", Mobile:0},
        validationSchema: yup.object({UserId:yup.string().required("UserId Required"), 
                                      UserName:yup.string().required("Name Rquired"), 
                                      Password:yup.string().required("Password required"), 
                                      Email:yup.string().required("Email Required"), 
                                      Mobile:yup.string().required("Mobile No. Required").matches(/\d{10}/,"Please Enter a Valid Mobile No.")
                                    }),
        onSubmit:(RegisterInput)=>{
           
                axios.post("http://127.0.0.1:3210/register-user", RegisterInput)
                .then(()=>{
                    alert("Congragulations You have Registered!");
                    setCookie("user-id",RegisterInput.UserName);
                    navigate("/");
                })
            
        }
    })
    function signUpclick(){
        setView(true);

    }
    function handleClose() {
        setView(false);
    }
    

    return(
        <div style={{height:"100vh"}}>
            <div className="d-flex justify-content-center align-items-center" style={{height:"100vh", width:"100%", backgroundColor:"rgba(0, 0, 0, 0.8)"}}>
                <Formik initialValues={{UserId:"", Password:""}}
                        validationSchema={yup.object({UserId: yup.string().required("UserId Required"), Password: yup.string().required("Password Required")})} 
                        onSubmit={(userDetails) => {
                            axios.get("http://127.0.0.1:3210/users")
                            .then(response=>{
                                let user = response.data.find(a=> a.UserId===userDetails.UserId);
                                if (user) {
                                    if (user.Password===userDetails.Password) {
                                        setCookie("user-id",user.UserName);
                                        navigate("/");
                                    } else {
                                        alert("Invalid Password");
                                    }
                                } else {
                                    alert("Access Denied!\nInvalid Credentials");
                                }
                            })
                        }}>
                    <Form className="bg-black pt-5 px-5 pb-4 text-white rounded-4">
                        <h2 className="bi bi-person-fill mb-2 text-primary"> User Login</h2>
                        <dl className="my-4">
                            <dt className="mb-2">User Id</dt>
                            <dd><Field type="text" className="form-control text-dark" name="UserId" placeholder="Enter User Id" /></dd>
                            <dd className="text-danger"><ErrorMessage name="UserId"/></dd>
                            <dt className="mt-4">Password</dt>
                            <dd><Field type="text" className="form-control mt-2" name="Password" placeholder="Enter Password" /></dd>
                            <dd className="text-danger"><ErrorMessage name="Password"/></dd>
                        </dl>
                        <div className=" d-flex justify-content-center align-items-center mt-5">
                            <button type="Submit" className="btn btn-primary mx-2">Login</button>
                            <Link to="/"><button className="btn btn-danger mx-2">Cancle</button></Link>    
                        </div>
                        <div className="mt-4 d-flex justify-content-center align-items-center "><button type="register" onClick={signUpclick} className="btn btn-light w-100">New User SignUp</button></div>
                        <div>
                        <Dialog open={view} fullWidth={true} >
                <form onSubmit={Registerformik.handleSubmit}>
                    <DialogTitle className="fw-bold" sx={{fontSize:"30px"}} >
                        {"Register User"}
                    </DialogTitle>
                    <DialogContent>
                        <dl>
                            <dd><TextField type="text" className="form-control mt-2" onChange={Registerformik.handleChange} name="UserId" label="User Id" /></dd>
                            <dd className="text-danger">{Registerformik.errors.UserId}</dd>
                            <dd><TextField type="text" className="form-control mt-2" onChange={Registerformik.handleChange} name="UserName" label="Name" /></dd>
                            <dd className="text-danger">{Registerformik.errors.UserName}</dd>
                            <dd><TextField type="password" className="form-control mt-2" onChange={Registerformik.handleChange} name="Password" label="Password" /></dd>
                            <dd className="text-danger">{Registerformik.errors.Password}</dd>                               
                            <dd><TextField type="email" className="form-control mt-2" onChange={Registerformik.handleChange} name="Email" label="Email" /></dd>
                            <dd className="text-danger">{Registerformik.errors.Email}</dd>
                            <dd><TextField type="number" className="form-control mt-2" onChange={Registerformik.handleChange} name="Mobile" label="Mobile" /></dd>
                            <dd className="text-danger">{Registerformik.errors.Mobile}</dd>
                        </dl>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit2">Register</Button>
                        <Button onClick={handleClose}>Cancle</Button>
                    </DialogActions>
                </form>
                    </Dialog>
                    </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
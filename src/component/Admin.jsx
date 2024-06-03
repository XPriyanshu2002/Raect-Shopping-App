


import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

export function Admin() {

    const [cookie, setCookie, removeCookie] = useCookies("admin-id");
    let navigate = useNavigate();
    

    return(
        <div style={{height:"100vh", backgroundImage:"url(netflixbanner.jpg)"}}>
            <div className="d-flex justify-content-center align-items-center" style={{height:"100vh", width:"100%", backgroundColor:"rgba(0, 0, 0, 0.8)"}}>
                <Formik initialValues={{UserId:"", Password:""}}
                        validationSchema={yup.object({UserId: yup.string().required("UserId Required"), Password: yup.string().required("Password Required")})} 
                        onSubmit={(adminDetails) => {
                            axios.get("http://127.0.0.1:3210/get-admin")
                            .then(response=>{
                                let admin = response.data.find(a=> a.AdminId===adminDetails.UserId);
                                if (admin) {
                                    if (admin.Password===adminDetails.Password) {
                                        setCookie("admin-id",admin.AdminName);
                                        navigate("/admin-dashboard");
                                    } else {
                                        alert("Invalid Password");
                                    }
                                } else {
                                    alert("Access Denied!\nInvalid Credentials");
                                }
                            })
                        }}>
                    <Form className="bg-black p-5 text-white rounded-4">
                        <h2 className="bi bi-person-fill mb-2 text-primary"> Admin Login</h2>
                        <dl className="my-4">
                            <dt className="mb-2">User Id</dt>
                            <dd><Field type="text" className="form-control" name="UserId" placeholder="Enter User Id" /></dd>
                            <dd className="text-danger"><ErrorMessage name="UserId"/></dd>
                            <dt className="mt-4">Password</dt>
                            <dd><Field type="text" className="form-control mt-2" name="Password" placeholder="Enter Password" /></dd>
                            <dd className="text-danger"><ErrorMessage name="Password"/></dd>
                        </dl>
                        <div className="mt-5">
                            <button type="Submit" className="btn btn-primary mx-2">Login</button>
                            <Link to="/"><button className="btn btn-danger mx-2">Cancle</button></Link>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AdminSignout } from "./admin-signout";
import { useCookies } from "react-cookie";

export function Admindashboard() {
  const [user, setuser] = useState([]);
  const [cookie, setCookie, removeCookie] = useCookies();

  function loaduser() {
    axios.get("http://127.0.0.1:3210/users").then((response) => {
      setuser(response.data);
    });
  }

  useEffect(() => {
    console.log(user);
    if (cookie["admin-id"]) {
      loaduser();
    } else {
    }
  }, []);

  return (
    <div>
      <div
        style={{
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          paddingBottom: "50px",
        }}
      >
        <table
          className="table table-hover text-white mt-5 rounded-3"
          style={{ width: "1500px", marginLeft: "35px" }}
        >
          <thead>
            <th className="col-4">UserName</th>
            <th className="col-4">UserId</th>
            <th className="col-4">Email</th>
            <th className="col-4">Mobile</th>
          </thead>
          <tbody>
            {user.map((u) => (
              <tr>
                <td>
                  <h5>{u.UserName}</h5>
                </td>
                <td>
                  <h5>{u.UserId}</h5>
                </td>
                <td>{u.Email}</td>
                <td>{u.Mobile}</td>
                <td>
                {/* <Link to={`/edit-dashboard/${video.VideoId}`} className="bi bi-pen-fill btn btn-warning mx-2" style={{marginTop:"85px"}} /> */}
                 {/* <Link to={`/delete-dashboard/${u.UserId}`} className="bi bi-trash-fill btn btn-danger" style={{marginTop:"85px"}} /> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { Link ,useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import api from "../api/api";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Native = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', {
        username,
        password,
        email
      });
      console.log(response);
      
      if(response.status === 201){
        Native('/login')
      }
      else{
        alert("something went wrong")
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (e.g., show an error message)
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-28">
        <div className="w-96 border rounded px-7 py-10 bg-white">
          <form onSubmit={(e)=>{handleRegister(e)}}>
            <h4 className="text-2xl mb-7">Register</h4>

            <input className="input" type="text" placeholder="Username" name="" id="" 
            value={username}
            onChange={(e) => {setUsername(e.target.value.trim())}}
            />
            <input className="input" type="text" placeholder="Email" name="" id="" 
            value={email}
            onChange={(e) => {setEmail(e.target.value.trim())}}
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              name=""
              id=""
              value={password}
              onChange={(e) => {setPassword(e.target.value.trim())}}
            />
            <button className="btn-primary" type="submit">Create Account</button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-blue-500 font-medium underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;

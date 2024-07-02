import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext ,useState} from "react";
import { UserContext } from "../context/UserContext";
import api from "../api/api";


function Login() {

  const {setUser} = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', {
        username,
        password
      });
      console.log(response.data);
      const { accessToken, user } = response.data;

      // Save token and user details in local storage or context
      localStorage.setItem('user', JSON.stringify({ ...user, accessToken }));

      // Redirect to dashboard or another route
      setUser({...user, accessToken});
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
          <form onSubmit={(e) => {handleLogin(e)}}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input className="input" type="text" placeholder="Username" name="" id=""
            value={username}
            onChange={(e) => {setUsername(e.target.value.trim())}} 
            />
            <input className="input" type="password" placeholder="Password" name="" id="" 
            value={password}
            onChange={(e) => {setPassword(e.target.value.trim())}}
            />
            <button className="btn-primary" type="submit">Login</button>
          </form>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-blue-500 font-medium underline"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;

import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import api from "../api/api";

const Navbar = () => {
  const { user, setIsModalOpen, setUser } = useContext(UserContext);
  // creat a logout function with axios
  const logout = async () => {
    try {
      const response = await api.post("/auth/logout");
      console.log(response);
      if (response.status > 200) {
        localStorage.removeItem("user");
        setUser(null);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white mr-2">
           {user?.username.split(' ').map((letter)=>letter[0].toUpperCase()).join()}
          </div>
          <div>
            <div className="text-white text-lg font-bold mr-4">
              {user?.username}
            </div>
            <div
              onClick={logout}
              className="underline cursor-pointer text-sm text-white"
            >
              Logout
            </div>
          </div>

          <div className="text-gray-400 text-sm">{user?.role}</div>
        </div>
        <div className="text-white text-lg font-bold">Task Manager</div>

        
         <div className="flex items-center">
         {user?.role === "admin" || user?.role === "manager" && (
         <button
           className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600"
           onClick={() => setIsModalOpen(true)}
         >
           <svg
             xmlns="http://www.w3.org/2000/svg"
             className="h-5 w-5 mr-2"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor"
           >
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth={2}
               d="M12 4v16m8-8H4"
             />
           </svg>
           Create Task
         </button>
            )}
       </div>
     
       
      </div>
    </nav>
  );
};

export default Navbar;

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import { useState ,useEffect, useContext} from "react";
import api from "../api/api";
import Modal from 'react-modal';
import { UserContext } from "../context/UserContext";
import AddEditNote from "../components/AddEditNote";


function Home() {
  const [tasks, setTasks] = useState([]);
  const {isModleOpen, setIsModalOpen ,updateTask } = useContext(UserContext)

  // create a function to fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await api.get('/task');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  // call the function when the component mounts
  useEffect(() => {
    fetchTasks();
  }, [updateTask]);


    return (
        <>
          <Navbar />
        <div className="container mx-auto ">
            <div className="grid grid-cols-3 gap-4 mt-8">
          
            {tasks.map((task) => (
              <TaskCard 
               key={task.id}
               {...task}
               />
            ))}
           
            </div>
          
        </div>

        <Modal
        isOpen={isModleOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }
        }}
        contentLabel=""
        className={"lg:w-[40%] w-[50%] max-h-4/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-y-auto"} 
      >
        <AddEditNote/>
        
      </Modal>

        </>
      );
}

export default Home;
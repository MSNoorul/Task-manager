import { useContext, useEffect ,useState} from "react";
import api from "../api/api";
import { UserContext } from "../context/UserContext";

function TaskCard({ id,title, description, date="10/10/2020",...rest }) {

  const {user,setUpdateTask} = useContext(UserContext)
  const [assignee, setAssignee] = useState(null);

  useEffect(()=>{
    const responst = async ()=>{
 
      try {
        const response = await api.get(`/user/${rest.assigneeId}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`, // Include your access token if necessary
          },
        });
        setAssignee(response.data?.username);
      } catch (error) {
        console.error('Error fetching assignee:', error);
      }
    }
    responst()
  },[])

    const deleteTask = async (taskId) => {
      try {
        const response = await api.delete(`/task/delete/${taskId}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`, // Include your access token if necessary
          },
        });
        setUpdateTask((pre)=>!pre)
        // Handle the response if necessary
        console.log('Task deleted:', response.data);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };
  
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in">
      <div className="flex justify-between items-center">
        <div>
          <h6 className="text-md font-medium">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>

        <span className="text-stone-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
            />
          </svg>
        </span>
      </div>
      <p className="text-xs text-slate-600 mt-2">{description?.slice(0, 60)}</p>

      <div className="flex justify-between mt-2">
        <p className="text-xs mt-4"><span className="text-blue-500"># </span>{assignee?assignee:"Unassigned"}</p>
        {rest?.role === "admin" || rest?.role === "manager" && (
          <div className="flex items-center gap-4">
          <span className="icon-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </span>
          <span className="icon-btn"
          onClick={()=>deleteTask(id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </span>
        </div>
        )}
        
      </div>
    </div>
  );
}

export default TaskCard;

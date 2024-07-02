import Select from "react-select";
import { useState,useContext } from "react";
import { UserContext } from "../context/UserContext";
import api from "../api/api";

const options = [
  { value: 3, label: "Noorul" },
  { value: 5, label: "Sami" },
  { value: 4, label: "Muneeb" },
];

function AddEditNote() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [title ,setTitle] = useState('');
  const [description ,setDescription] = useState('');
  const {user,setIsModalOpen,setUpdateTask} = useContext(UserContext) 


  const handleTaskSubmit = async () => {
    console.log(selectedOption);
    const taskData = {
      title,
      description,
      assigneeId: selectedOption ? selectedOption.value : null
    };
    console.log(user);
    try {
      const response = await api.post(
        '/task/create',
        taskData,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}` // Assuming user.accessToken holds the access token
          }
        }
      );

      if(response.status === 201){
        setTitle('')
        setDescription('')
        setSelectedOption(null)
        setIsModalOpen(false)
        setUpdateTask((pre)=>!pre)
        console.log('Task created successfully:', response.data);
      }
  
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-2">
        <label className="input-label" htmlFor="title">
          Title
        </label>
        <input
          className="text-2xl text-slate-900 outline-none"
          type="text"
          placeholder="Task Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label" htmlFor="description">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows="10"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-slate-900 outline-none text-sm bg-slate-50 p-2 rounded"
        ></textarea>
      </div>

      <div className="mt-4 ">
        <label htmlFor="" className="input-label">
          Assignee
        </label>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
      </div>

      <button className="btn-primary font-medium mt-5 p-3"
      onClick={() => handleTaskSubmit()}
      >ADD</button>
    </div>
  );
}

export default AddEditNote;

// UserContext.js
import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [isModleOpen, setIsModalOpen] = useState(false);
  const [updateTask, setUpdateTask] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser ,isModleOpen, setIsModalOpen ,updateTask,setUpdateTask }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider};

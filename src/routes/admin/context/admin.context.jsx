import React, { createContext, useContext, useState } from 'react';

export const AdminContext = createContext({
  selectedRecord: null,
  setSelectedRecord: () => {},
});

export const useAdminContext = () => {
  return useContext(AdminContext);
};

export const AdminContextProvider = ({ children }) => {
  const [selectedRecord, setSelectedRecord] = useState();
  const [showEmployeeAddModal, setShowEmployeeAddModal] = useState(false);
  const [showEmployeeEditModal, setShowEmployeeEditModal] = useState(false);
  const [showTagAddModal, setShowTagAddModal] = useState(false);
  const [showTagEditModal, setShowTagEditModal] = useState(false);
  const [showRolesAddModal, setShowRolesAddModal] = useState(false);
  const [showRolesEditModal, setShowRolesEditModal] = useState(false);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isTagLoading, setIsTagLoading] = useState(false);
  return (
    <AdminContext.Provider
      value={{
        selectedRecord,
        setSelectedRecord,
        setShowEmployeeAddModal,
        showEmployeeAddModal,
        showEmployeeEditModal,
        setShowEmployeeEditModal,
        showTagAddModal,
        setShowTagAddModal,
        showTagEditModal,
        setShowTagEditModal,
        showRolesAddModal,
        setShowRolesAddModal,
        showRolesEditModal,
        setShowRolesEditModal,
        isAddLoading,
        setIsAddLoading,
        setIsTagLoading,
        isTagLoading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

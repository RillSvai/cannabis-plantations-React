import React, { createContext, useState, useContext, ReactNode } from "react";

interface RoleContextProps {
  role: string | null;
  toggleRole: (role: string) => void;
  agronomistId: number | null;
  customerId: number | null;
  toggleCustomerId: (id: number) => void;
  toggleAgronomistId: (id: number) => void;
}

const RoleContext = createContext<RoleContextProps | undefined>(undefined);

interface RoleProviderProps {
  children: ReactNode;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const [role, setRole] = useState<string | null>(null);

  const [customerId, setCustomerId] = useState<number | null>(null);

  const [agronomistId, setAgronomistId] = useState<number | null>(null);

  const toggleRole = (newRole: string) => {
    setRole(newRole);
  };

  const toggleCustomerId = (id: number) => {
    setCustomerId(id);
  };

  const toggleAgronomistId = (id: number) => {
    setAgronomistId(id);
  };

  const contextValue: RoleContextProps = {
    role,
    toggleRole,
    agronomistId,
    customerId,
    toggleCustomerId,
    toggleAgronomistId,
  };
  return (
    <RoleContext.Provider value={contextValue}>{children}</RoleContext.Provider>
  );
};

export const useRoleContext = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRoleContext must be used within a RoleProvider");
  }
  return context;
};

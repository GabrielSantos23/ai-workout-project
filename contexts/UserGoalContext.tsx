"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

type UserGoal = "gain_muscle" | "lose_weight" | "maintain";

interface UserGoalContextType {
  userGoal: UserGoal;
  setUserGoal: (goal: UserGoal) => void;
}

const UserGoalContext = createContext<UserGoalContextType | undefined>(
  undefined
);

export function UserGoalProvider({ children }: { children: ReactNode }) {
  const [userGoal, setUserGoal] = useState<UserGoal>("maintain");

  return (
    <UserGoalContext.Provider value={{ userGoal, setUserGoal }}>
      {children}
    </UserGoalContext.Provider>
  );
}

export function useUserGoal() {
  const context = useContext(UserGoalContext);
  if (context === undefined) {
    throw new Error("useUserGoal must be used within a UserGoalProvider");
  }
  return context;
}

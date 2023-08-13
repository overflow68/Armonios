import React from "react"
import {Navigate} from "react-router-dom"
import { useWallet } from "./contexts/walletContext";

export const ProtectedRoute = ({children }) => {
    const {wallet} = useWallet()
  if (!wallet) {
    return <Navigate to="/new-wallet" replace />;
  }

  return children;
};

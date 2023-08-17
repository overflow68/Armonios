import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ProtectedRoute } from "./protectedRoute";
import { WalletProvider } from "./contexts/walletContext";
import { DynamicProvider } from "./contexts/DynamicContext";
import Header from "./components/Header";
import {
  createHashRouter,
  RouterProvider
} from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import NewWallet from "./pages/NewWallet";
import GenerateWallet from "./pages/Generate";
import ImportWallet from "./pages/Import";
const router = createHashRouter([
  {
    path: "/",
    element: <ProtectedRoute><Home/></ProtectedRoute>,
  },
  {
    path: "/new-wallet",
    element:<NewWallet/>,
  },
  {
    path: "/new-wallet/import",
    element:<ImportWallet/>,
  },
  {
    path: "/new-wallet/generate",
    element:<GenerateWallet/>,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <WalletProvider>
      <Header></Header>
      <DynamicProvider>
    <RouterProvider router={router} />
    </DynamicProvider>
    </WalletProvider>
    
  </React.StrictMode>
);




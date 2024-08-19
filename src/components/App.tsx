import { Outlet } from "react-router-dom";
import { Header } from "./Header";
//import "./App.css";

export function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}


import { Outlet } from "react-router-dom";
import ScrollManager from "./ScrollManager";

function RootLayout() {
  return (
    <>
      <ScrollManager />
      <Outlet />
    </>
  );
}

export default RootLayout;
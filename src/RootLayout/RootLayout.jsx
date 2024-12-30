import Navbar from "../Components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const RootLayout = () => {
  const auth = useSelector((state) => state.authSlice.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate("/signIn");
    }
  }, [auth]);
  return (
    <>
      {auth ? (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      ) : null}
    </>
  );
};

export default RootLayout;

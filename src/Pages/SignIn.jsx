import { useEffect, useState } from "react";
import Flex from "../Layouts/Flex";
import signInImg from "../assets/logIn.jpg";
import Input from "../Layouts/Input";
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useLoginMutation } from "../Redux/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../Redux/slices/authSlice";

const SignIn = () => {
  const auth = useSelector((state) => state.authSlice.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth]);

  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [eye, seteye] = useState(false);

  const handleEye = () => {
    seteye(!eye);
  };

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [signInDataErr, setSignInDataErr] = useState({
    email: "",
    password: "",
  });

  const handleInputValues = (e) => {
    const { name, value } = e.target;
    setSignInData((olddata) => ({ ...olddata, [name]: value }));
    setSignInDataErr((oldError) => ({ ...oldError, [name]: "" }));
  };

  const handleSubmit = async () => {
    if (!signInData.email) {
      setSignInDataErr((oldError) => ({ ...oldError, email: "Email is required" }));
    }
    if (!signInData.password) {
      setSignInDataErr((oldError) => ({
        ...oldError,
        password: "Password is required",
      }));
    }
    if (signInData.email && signInData.password) {
      setLoading(true);
      try {
        const result = await login(signInData);
        dispatch(setAuth(result.data.data));
        setSignInData({
          email: "",
          password: "",
        });
        toast.success("Success! Login successful", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 2000);
      } catch (error) {
        toast.error("Login failed. Try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  return (
    <>
      {auth ? null : (
        <Flex className="w-screen h-screen">
          <ToastContainer />
          <Flex className="w-full lg:w-[60%] justify-center items-center bg-slate-300 px-4 lg:px-0">
            <div>
              <h1 className="text-[#03014C] font-[700] text-[34px] font-[nunito] mb-6">
                Login to your account!
              </h1>

              <h5 className="mt-[30px] border px-[23px] py-[16px] border-[#03014C] rounded-[8px] inline-block mb-6">
                <FcGoogle className="inline-block mr-3 text-[30px]" />
                Login with Google
              </h5>

              <Input
                label={"Email Address"}
                onChange={handleInputValues}
                name={"email"}
                value={signInData.email}
              />
              <p className="text-red-400 capitalize text-xl">
                {signInDataErr.email}
              </p>

              <div className="relative">
                <Input
                  type={eye ? "text" : "password"}
                  label={"Password"}
                  onChange={handleInputValues}
                  name={"password"}
                  value={signInData.password}
                />
                <div
                  className="absolute cursor-pointer right-8 bottom-5"
                  onClick={handleEye}
                >
                  {eye ? <FaEye /> : <IoMdEyeOff />}
                </div>
              </div>
              <p className="text-red-400 capitalize text-xl">
                {signInDataErr.password}
              </p>

              <div className="text-center">
                <Flex className="items-center justify-center">
                  {loading ? (
                    <ThreeDots
                      visible={true}
                      height="80"
                      width="80"
                      color="#5F35F5"
                      radius="9"
                      ariaLabel="three-dots-loading"
                    />
                  ) : (
                    <button
                      className="bg-[#5F35F5] text-[#fff] items-center mt-[40px] font-[600] text-[20px] font-[nunito] w-[368px] px-[50px] py-[20px] rounded-[86.003px]"
                      onClick={handleSubmit}
                    >
                      Login to Continue
                    </button>
                  )}
                </Flex>
                <Link to={"/SignUp"}>
                  <p className="text-[#03014C] font-[400] text-[13px] font-[open] mt-[25px]">
                    Don’t have an account?{" "}
                    <span className="text-[#EA6C00] font-[700] text-[13px] font-[open] cursor-pointer">
                      Sign Up
                    </span>
                  </p>
                </Link>

                <Link to={"/passwordForgot"}>
                  <p className="text-[#EA6C00] font-[700] text-[13px] font-[open] mt-[25px] cursor-pointer inline-block">
                    Forget password
                  </p>
                </Link>
              </div>
            </div>
          </Flex>
          <div className="hidden lg:block w-[40%] h-full">
            <img
              src={signInImg}
              alt="Sign In"
              className="object-cover w-full h-full"
            />
          </div>
        </Flex>
      )}
    </>
  );
};

export default SignIn;

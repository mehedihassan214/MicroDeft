import React, { useState } from 'react';
import Flex from '../Layouts/Flex';
import signUPImg from '../assets/logIn.jpg';
import Input from '../Layouts/Input';
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../Redux/apiSlice';

const SignUp = () => {
    const [register] = useRegisterMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [eye, seteye] = useState(false);
    const handleEye = () => seteye(!eye);

    const [signupData, setSignupData] = useState({
        email: '',
        name: '',
        password: ''
    });

    const [signupDataErr, setSignupDataErr] = useState({
        email: '',
        name: '',
        password: ''
    });

    const handleInputValues = (e) => {
        const { name, value } = e.target;
        setSignupData((oldData) => ({ ...oldData, [name]: value }));
        setSignupDataErr((oldError) => ({ ...oldError, [name]: "" }));
    };

    const handleSubmit = async () => {
        let isValid = true;

        if (!signupData.email) {
            setSignupDataErr((oldError) => ({ ...oldError, email: "Email is required" }));
            isValid = false;
        } else if (
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                signupData.email
            )
        ) {
            setSignupDataErr((oldError) => ({ ...oldError, email: "Invalid email address" }));
            isValid = false;
        }

        if (!signupData.name) {
            setSignupDataErr((oldError) => ({ ...oldError, name: "Name is required" }));
            isValid = false;
        }

        if (!signupData.password) {
            setSignupDataErr((oldError) => ({ ...oldError, password: "Password is required" }));
            isValid = false;
        } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(signupData.password)) {
            setSignupDataErr((oldError) => ({ ...oldError, password: "Password must be stronger" }));
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        setLoading(true);
        try {
            const result = await register(signupData).unwrap();
            setSignupData({
                email: '',
                name: '',
                password: ''
            });
            toast.success('Success! Registration successful.', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setTimeout(() => {
                setLoading(false);
                navigate('/signIn');
            }, 5000);
        } catch (error) {
            toast.error('Registration failed. Try again.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex className="w-full h-screen">
            <ToastContainer />
            <Flex className="w-full md:w-[60%] justify-center items-center bg-slate-300">
                <div className="p-5 sm:p-10">
                    <h1 className="text-[#11175D] font-bold text-2xl sm:text-3xl md:text-4xl font-[nunito]">
                        Get started with easily register
                    </h1>
                    <p className="text-[#000] font-medium text-lg sm:text-xl mb-10">
                        Free register <span className="text-[#808080]">and</span> you can enjoy it
                    </p>
                    <Input
                        label="Email Address"
                        onChange={handleInputValues}
                        name="email"
                        value={signupData.email}
                    />
                    <p className="text-red-400 capitalize text-xl">{signupDataErr.email}</p>
                    <Input
                        label="Full Name"
                        onChange={handleInputValues}
                        name="name"
                        value={signupData.name}
                    />
                    <p className="text-red-400 capitalize text-xl">{signupDataErr.name}</p>

                    <div className="relative">
                        <Input
                            type={eye ? "text" : "password"}
                            label="Password"
                            onChange={handleInputValues}
                            name="password"
                            value={signupData.password}
                        />
                        <div
                            className="absolute right-8 bottom-5 cursor-pointer"
                            onClick={handleEye}
                        >
                            {eye ? <FaEye /> : <IoMdEyeOff />}
                        </div>
                    </div>
                    <p className="text-red-400 capitalize text-xl">{signupDataErr.password}</p>

                    <div className="text-center">
                        <Flex className="justify-center items-center">
                            {loading ? (
                                <ThreeDots
                                    visible={true}
                                    height="80"
                                    width="80"
                                    color="#5F35F5"
                                    radius="9"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                />
                            ) : (
                                <button
                                    className="bg-[#5F35F5] text-white font-semibold text-xl w-full sm:w-[368px] px-[50px] py-[20px] rounded-[86px] mt-8"
                                    onClick={handleSubmit}
                                >
                                    Sign up
                                </button>
                            )}
                        </Flex>
                        <Link to="/signIn">
                            <p className="text-[#03014C] font-medium text-sm sm:text-base mt-6">
                                Already have an account?{" "}
                                <span className="text-[#EA6C00] font-bold text-sm sm:text-base cursor-pointer">
                                    Sign In
                                </span>
                            </p>
                        </Link>
                    </div>
                </div>
            </Flex>
            <div className="hidden md:block md:w-[40%] h-full">
                <img src={signUPImg} alt="" className="w-full h-full object-cover" />
            </div>
        </Flex>
    );
};

export default SignUp;

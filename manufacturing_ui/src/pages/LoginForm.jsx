import React from 'react'
// import '../styles/auth.css'
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { Login } from "../components/Login.jsx";
import { Signup } from '../components/Signup.jsx';
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
// import boy from '../assets/a boy standing  5dc9d970-8c4f-48ab-a215-e490926e192d.png'
import boy from '../assets/Login_pic.jpg'


const LoginForm = () => {
    return (
        <div className="px-4 max-w-7xl mx-auto lg:space-x-20 flex justify-center items-center h-screen -mt-8"> {/* Added -mt-8 for upward movement */}
            <div className="lg:w-[50%]">
                <Login />
                <div className="pb-4 text-sm flex items-center justify-between">
                    <p>Don't have an account?</p>
                    <button className="font-semibold underline" onClick={() => window.location.href = '/signup'}>Sign up</button>
                </div>
                <div className="flex items-center space-x-4">
                    <hr className="w-full" />
                    <p className="shrink-0">Login with Others</p>
                    <hr className="w-full" />
                </div>
                <div className="my-4 flex items-center justify-center border border-black rounded-lg space-x-1 p-2">
                    <FaGoogle />
                    <p>Login with Google</p>
                </div>
                <div className="flex items-center justify-center border border-black rounded-lg space-x-1 p-2">
                    <FaFacebookF />
                    <p>Login with Facebook</p>
                </div>
            </div>
            <div className="w-1/2 hidden lg:block" style={{ marginTop: '3cm' }}> {/* Changed to 2cm for more space */}
                <img className="rounded-2xl" src={boy} alt="" />
            </div>
        </div >
    );
}

export default LoginForm

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import {toast} from 'react-toastify'
import{authContext} from "../context/AuthContext.jsx"
import HashLoader from "react-spinners/HashLoader.js"
const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {dispatch} = useContext(authContext)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/v1/auth/login`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const result = await res.json()
            if (!res.ok) {
                throw new Error(result.message)
            }
            dispatch(
                {
                    type:"LOGIN_SUCCESS",
                    payload:{
                        user:result.data,
                        token:result.token,
                        role:result.role,
                    },
                }
            )
            console.log(result, "login data")
            setLoading(false)
            toast.success(result.message)
            navigate('/home')
        } catch (error) {
            setLoading(false)
            toast.error(error.message)
        }
    }
    return <section className="px-5 lg:px-0">
        <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10:">
            <h3 className="text-headinColor text-[22px] leading-9 font-bold mb-10">
                Xin chào! <span className="text-primaryColor">Chào mừng bạn</span> quay trở lại 🎉🎉🎉
            </h3>
            <form className="py-4 md:py-0" onSubmit={submitHandler}>
                <div className="mb-5">
                    <input
                        type="email"
                        name="email"
                        placeholder="Hãy điền email của bạn"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                    focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                    placeholder:text-textColor rounded-md cursor-pointer"
                        required />
                </div>
                <div className="mb-5">
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                    focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                    placeholder:text-textColor cursor-pointer"
                        required />
                </div>
                <div className="mt-7">
                    <button type="submit" className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
                    {loading ? (<HashLoader size={25} color="#ffffff" />) : ('Đăng nhập')}
                    </button>
                </div>
                <p className="mt-5 text-textColor text-center">
                    Bạn có tài khoản chưa ? <Link to="/register" className="text-primaryColor font-medium ml-1">Đăng ký</Link>
                </p>

            </form>
        </div>
    </section>
}
export default Login
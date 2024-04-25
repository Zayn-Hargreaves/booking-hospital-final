import convertTime from "../../utils/convertTime.js"
import React from "react";
import { token } from "../../config.js"
import { toast } from "react-toastify"
const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
    const bookingHandler = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/v1/bookings/checkout-section/${doctorId}`, {
                method: "post",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.message + " thử lại")
            }
            if (data.session.url) {
                window.location.href = data.session.url
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    console.log(timeSlots)
    return (
        <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
            <div className="flex items-center justify-between">
                <p className="text__para mt-0 font-semibold">Hoá đơn</p>
                <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">{ticketPrice} VND</span>
            </div>
            <div className="mt-[30px]">
                <p className="text__para mt-0 font-semibold text-headingColor">
                    Các khung giờ có sẵn
                </p>
                <ul className="mt-3">
                    {timeSlots?.map((item, index) => (
                        <li key={index} className="flex items-center justify-between mb-2">
                            <p className="text-[15px] leading-6 text-textColor font-semibold">
                                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                            </p>
                            <p className="text-[15px] leading-6 text-textColor font-semibold">
                            {item?.startingTime ? convertTime(item.startingTime) : ''} - {item?.endingTime ? convertTime(item.endingTime) : ''}
                            </p>
                        </li>
                    ))}
                </ul>

            </div>
            <button onClick={bookingHandler} className="btn px-2 w-full rounded-md">Đặt lịch</button>
        </div>
    )
}
export default SidePanel
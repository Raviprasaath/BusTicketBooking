import { FaBottleWater } from "react-icons/fa6";
import { BsFillUsbPlugFill } from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import { GiPillow } from "react-icons/gi";
import BusWireFrame from "./BusWireFrame";
import { useState } from "react";
import { Link } from "react-router-dom";
import BookingDetailsDialog from "./BookingDetailsDialog";

const BookingPage = () => {
    const [toggler, setToggler] = useState(false);
    const handlerClearingDetails = () => {
        localStorage.clear('token');
        localStorage.clear('userId');
        localStorage.clear('email');
    }

    return (
        <>
            <div className='p-4 bg-gray-100 flex flex-col justify-center h-dvh'>

                    <div className="flex justify-between gap-4">
                        <div></div>
                        <div className="flex gap-4 my-4">
                            <BookingDetailsDialog />
                            
                            <Link to='/' onClick={handlerClearingDetails}>
                                <button className="px-2 py-1 bg-red-400 rounded-e-md hover:bg-red-300">Logout</button>
                            </Link>
                        </div>
                    </div>
                    <div className='flex justify-between items-center border p-4 rounded-t-xl bg-white'>
                        <div className="flex flex-col justify-center items-center">
                            <p className="font-bold">RP Travels</p>
                            <p>A/C Sleeper (2+1)</p>
                        </div>
                        <span className='flex gap-4 justify-center items-center'>
                            <p className="font-semibold text-xl">22:00</p>
                            <p>26 MAR</p>
                        </span>
                        <p className='border w-1/6 flex justify-center items-center h-0 '></p>
                        <p>07hrs 05mins</p>
                        <p className='border w-1/6 flex justify-center items-center h-0 '></p>
                        <span className='flex gap-4 justify-center items-center'>
                            <p  className="font-semibold text-xl">05:00</p>
                            <p>27 MAR</p>
                        </span>
                        <p className="text-xl font-black">
                            ₹ 1500
                        </p>
                    </div>
                    <p className='border w-full flex justify-center items-center h-0 bg-white'></p>
                    <div className='flex bg-white p-4 justify-between rounded-b-xl'>
                        <div className="flex gap-4">
                            <div className="flex justify-center items-center gap-1">
                                <FaBottleWater />
                                <p>Water Bottle</p>
                            </div>
                            <div className="flex justify-center items-center gap-1">
                                <BsFillUsbPlugFill />
                                <p>Charging Point</p>

                            </div>
                            <div className="flex justify-center items-center gap-1">
                                <IoTicketOutline />
                                <p>M-Ticket</p>
                            </div>
                            <div className="flex justify-center items-center gap-1">
                                <GiPillow />
                                <p>Pillow</p>
                            </div>            
                        </div>
                        <button onClick={()=>setToggler(!toggler)} className='bg-blue-500 px-5 py-1 rounded-lg text-white hover:bg-blue-400'>Select Seat</button>
                    </div>
                    {toggler &&
                        <div className="rounded-xl bg-white p-4">
                            <BusWireFrame />
                        </div>
                    }
                
            </div>
        </>
  )
}

export default BookingPage

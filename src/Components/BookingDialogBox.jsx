import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './BookingDialogBox.css'
import { BASE_URL } from '../Constants';

const BookingDialogBox = ( { selectedSeat, handlerBookingUpdate } ) => {

    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [passengerDetails, setPassengerDetails] = useState([]);
    const [bookingSort, setBookingSort] = useState([]);
    const [loader, setLoader] = useState(false);

    const [passengerNumber, setPassengerNumber] = useState("");
    const email = JSON.parse(localStorage.getItem('email'));
    const token = JSON.parse(localStorage.getItem('token'));
    
    const handlerTicketsConform = () => {
        handlerBookingUpdate();
        setBookingSuccess(true);

        for (let i=0; i<selectedSeat.length; i++) {
            passengerDetails[i].seatNumber = selectedSeat[i];
        }
        setPassengerNumber(passengerDetails);
        for (let i=0; i<selectedSeat.length; i++) {
            fetchFunction(passengerDetails[i], email, token)
        }
        setBookingSort();
    }
    console.log('passengerDetails', passengerDetails);

    const fetchFunction = async(passengerDetail, email, token) => {

        let myHeaders = new Headers();
        myHeaders.append("projectID", "abcd");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);
    
        console.log("check")
        setLoader(true);
        let url = `${BASE_URL}bookingData/${passengerDetail.seatNumber}`
        let body = {
            "emailString": email,
            "details" : passengerDetail
        }
        const options = {
            method: "POST",
            body: JSON.stringify(body),
            headers: myHeaders,
        }
        try {
            const response = await fetch(url, options);
            console.log('re', response);
            if (response.ok) {
                const result = await response.json();
                console.log("seat booked",result);
            } else {
                const result = await response.json();
                console.log(result);
            }

        } catch (e) {
            console.error(e);
        }
        setLoader(false);
    }

    const handlerBookingReset = () => {
        setBookingSuccess(false);
    }

    const handlerInputs = (e, type, index) => {

        if (type === "mobile") {
            setPassengerNumber(e.target.value.slice(0, 10).replace(/\D/g, ''))
        }
        const values = e.target.value;

        const updatedPassengerDetails = [...passengerDetails];

        updatedPassengerDetails[index] = {
            ...updatedPassengerDetails[index],
            [type]: values
        };

        setPassengerDetails(updatedPassengerDetails);
    }
    
    console.log(passengerDetails);
    
    return (
        <Dialog.Root>
            {selectedSeat.length === 0 ?
            <div>
                <button className="bg-yellow-400 rounded-md px-2 py-1 cursor-not-allowed hover:bg-yellow-300">Book Tickets</button>
            </div> :
            <Dialog.Trigger asChild>
                <button onClick={handlerBookingReset} className="bg-yellow-400 rounded-md px-2 py-1 hover:bg-yellow-300">Book Tickets</button>
            </Dialog.Trigger>
            }
            <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent flex justify-between items-start">
                    {!bookingSuccess ? (
                    <div className=''>
                        <h2 className='font-semibold'> Passenger Details</h2>
                        <div>
                            <input type="number" placeholder='Mobile Number' className='border px-2 py-1 mt-3' maxLength="10" onInput={(e)=>handlerInputs(e, "mobile")} value={passengerNumber} />
                            {selectedSeat.map((item, index)=>(
                                <span key={index} className='flex gap-2'>
                                    <input type="text" placeholder={`Passenger Name ${index+1}`} className='border px-2 py-1 mt-3' onInput={(e)=>handlerInputs(e, "name", index)}  />
                                    <input type="number" placeholder={`Age`} className='border px-2 py-1 mt-3' onInput={(e)=>handlerInputs(e, "age", index)} />
                                </span>
                            ))}
                            <button onClick={handlerTicketsConform} className='bg-green-400 hover:bg-green-300 px-2 py-1 rounded-md mt-3'> Conform Tickets </button>

                        </div>
                    </div>) : 
                    (<div>
                        Booking Success
                    </div>
                    )}
                    <Dialog.Close asChild>
                        <button className="IconButton" aria-label="Close">
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default BookingDialogBox

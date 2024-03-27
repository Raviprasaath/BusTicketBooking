import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './BookingDialogBox.css'
import { useState } from 'react';

const BookingDialogBox = ( {selectedSeat, handlerBookingUpdate} ) => {

    const [bookingSuccess, setBookingSuccess] = useState(false);

    const [passengerDetails, setPassengerDetails] = useState({name: "", age: ""})
    const [passengerNumber, setPassengerNumber] = useState("")
    
    const handlerTicketsConform = () => {
        handlerBookingUpdate();
        setBookingSuccess(true);
    }
    
    const handlerBookingReset = () => {
        setBookingSuccess(false);
    }
    console.log("dia", selectedSeat);

    const handlerInputs = (e, value) => {
        if (value === "mobile") {
            setPassengerNumber(e.target.value.slice(0, 10).replace(/\D/g, ''))
        } else if (value === "name") {
            setPassengerDetails((prev)=>({...prev, name: e.target.value}))
        } else if (value === "age") {
            setPassengerDetails((prev)=>({...prev, age: e.target.value.slice(0, 2).replace(/\D/g, '')}))
        }
    }
    console.log(passengerNumber);
    
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
                                <input type="text" placeholder={`Passenger Name ${index+1}`} className='border px-2 py-1 mt-3' onInput={(e)=>handlerInputs(e, "name")}  />
                                <input type="number" placeholder={`Age`} className='border px-2 py-1 mt-3' onInput={(e)=>handlerInputs(e, "age")} />
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

import { useEffect, useState } from "react";
import Seats from "./Seats"
import { steeringWheel } from "../Constants";
import BookingDialogBox from "./BookingDialogBox";

const BusWireFrame = () => {
  const lRow1 = [1,3,5,7,9];
  const lRow2 = [2,4,6,8,10];
  const lRow3 = [11,12,13,14,15];
  const tRow1 = [16,18,20,22,24];
  const tRow2 = [17,19,21,23,25];
  const tRow3 = [26,27,28,29,30];

  const [selectedSeat, setSelectedSeat] = useState([]);
  const [blockedSeat, setBlockedSeat] = useState([5, 15]);
  const [bookingChanges, setBookingChanges] = useState(false);

  const handlerSeatSelection = (item) => {
    if (!blockedSeat.includes(item)) {
      if (selectedSeat.includes(item)) {
        const temp = selectedSeat;
        setSelectedSeat(temp.filter((items)=>items !== item));
      } else {
        setSelectedSeat((prev)=>([...prev, item]));
      }
    }
  }

  const handlerBookingUpdate = () => {
    setBookingChanges(!bookingChanges);
  }

  useEffect(()=> {

  }, [bookingChanges])

  console.log(selectedSeat, bookingChanges);

  return (
    <>
      <section className="flex flex-col gap-2 justify-center items-center">
        <h3>Lower Deck</h3>
        <div className="border w-fit p-4 flex justify-center items-center ">
          <div className="flex flex-row-reverse justify-between bg-red-300 -rotate-90">
            <div className="flex flex-row-reverse w-full bg-gray-200 p-3 justify-around">
              <img src={steeringWheel} alt="steer" className="w-4 h-4" />
              <div className="w-10"></div>
            </div>
          </div>
          <main>
            <div className="flex gap-2">
              {lRow1.map((item, index)=>(
                <button onClick={()=>handlerSeatSelection(item)} key={index}>
                  {blockedSeat.includes(item)?
                      <Seats colorValue={'grey'} /> :
                      selectedSeat.includes(item)?
                      <Seats colorValue={'red'} />:
                      <Seats colorValue={'white'} />
                    }
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-1">
              {lRow2.map((item, index)=>(
                <button onClick={()=>handlerSeatSelection(item)} key={index}>
                    {blockedSeat.includes(item)?
                      <Seats colorValue={'grey'} /> :
                      selectedSeat.includes(item)?
                      <Seats colorValue={'red'} />:
                      <Seats colorValue={'white'} />
                    }
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {lRow3.map((item, index)=>(
                <div key={index} className="w-6 h-6"></div>
              ))}
            </div>
            <div className="flex gap-2">
              {lRow3.map((item, index)=>(
                <button onClick={()=>handlerSeatSelection(item)} key={index}>
                    {blockedSeat.includes(item)?
                      <Seats colorValue={'grey'} /> :
                      selectedSeat.includes(item)?
                      <Seats colorValue={'red'} />:
                      <Seats colorValue={'white'} />
                    }
                </button>
              ))}
            </div>
          </main>
          <main className="-rotate-90 w-fit h-fit ">
            <button onClick={()=>handlerSeatSelection("l1")} >
                  {blockedSeat.includes("l1")?
                      <Seats colorValue={'grey'} /> :
                      selectedSeat.includes("l1")?
                      <Seats colorValue={'red'} />:
                      <Seats colorValue={'white'} />
                    }
            </button>
          </main>
        </div>
        <h3>Upper Deck</h3>
        <div className="border w-fit p-4 flex justify-center items-center">
          <main>
            <div className="flex gap-2">
              {tRow1.map((item, index)=>(
                <button onClick={()=>handlerSeatSelection(item)} key={index}>
                  {blockedSeat.includes(item)?
                    <Seats colorValue={'grey'} /> :
                    selectedSeat.includes(item)?
                    <Seats colorValue={'red'} />:
                    <Seats colorValue={'white'} />
                  }
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-1">
              {tRow2.map((item, index)=>(
                <button onClick={()=>handlerSeatSelection(item)} key={index}>
                  {blockedSeat.includes(item)?
                    <Seats colorValue={'grey'} /> :
                    selectedSeat.includes(item)?
                    <Seats colorValue={'red'} />:
                    <Seats colorValue={'white'} />
                  }
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {tRow2.map((item, index)=>(
                <div key={index} className="w-6 h-6"></div>
              ))}
            </div>
            <div className="flex gap-2">
              {tRow3.map((item, index)=>(
                <button onClick={()=>handlerSeatSelection(item)} key={index}>
                  {blockedSeat.includes(item)?
                    <Seats colorValue={'grey'} /> :
                    selectedSeat.includes(item)?
                    <Seats colorValue={'red'} />:
                    <Seats colorValue={'white'} />
                  }
                </button>
              ))}
            </div>
          </main>
          <main className="-rotate-90 w-fit h-fit ">
            <button onClick={()=>handlerSeatSelection("u1")} >
                  {blockedSeat.includes("u1")?
                      <Seats colorValue={'grey'} /> :
                      selectedSeat.includes("u1")?
                      <Seats colorValue={'red'} />:
                      <Seats colorValue={'white'} />
                    }
                </button>
          </main>
        </div>
        
        <div className="mt-4 flex gap-6 flex-wrap">
          <p className="flex justify-center items-center gap-1">
            Already Booked Seats
            <Seats colorValue={'grey'} />
          </p>
          <p className="flex justify-center items-center gap-1">
            Selected Seat
            <Seats colorValue={'red'} />
          </p>
          <p className="flex justify-center items-center gap-1">
            Available Seats
            <Seats colorValue={'white'} />
          </p>
        </div>
          <BookingDialogBox selectedSeat={selectedSeat} handlerBookingUpdate={handlerBookingUpdate} />
      </section>
    </>
  )
  

}

export default BusWireFrame

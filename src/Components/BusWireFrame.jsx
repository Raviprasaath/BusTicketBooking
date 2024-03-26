import { useState } from "react";
import Seats from "./Seats"
import { steeringWheel } from "../Constants";

const BusWireFrame = () => {
  const lRow1 = [1,2,3,4,5];
  const lRow2 = [11,12,13,14,15];
  const lRow3 = [21,22,23,24,25];
  const tRow1 = [31,32,33,34,35];
  const tRow2 = [41,42,43,44,45];
  const tRow3 = [51,52,53,54,55];

  const [selectedSeat, setSelectedSeat] = useState([]);
  const [blockedSeat, setBlockedSeat] = useState([2, 12, 23, 35, 42, 41, 53]);


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
      </section>
    </>
  )
  

}

export default BusWireFrame

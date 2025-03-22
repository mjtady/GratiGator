import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, subMonths, addMonths } from 'date-fns';

export default function Dashboard() {
  var username = "USER"
  
    const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  
  const startDate = startOfWeek(startOfMonth(currentDate));
  const endDate = endOfWeek(endOfMonth(currentDate));
  
  const days = [];
  let day = startDate;
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const handleToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());  // Optionally select today's date
  };

  return (
        <div className="bg-slate-900 min-w-full min-h-screen text-center">



<div className='inline-block w-8/12 text-left'>
<h1 className="instrument-serif-regular font-bold text-4xl text-emerald-300 pt-10 text-left">
    Hello, {username} ! </h1>
    <p className="text-left text-white">
        Let's continue to work on a positive mindset today!
        </p>
    <button className="text-green-400 noto-sans mt-4 p-1 px-4 rounded-full border border-green-400 transition-all duration-150
    hover:bg-green-400 hover:text-slate-900 hover:font-bold active:bg-slate-950 active:text-slate-950 active:border-slate-950">
        Let's Journal!
        </button>
</div>
<div className='mt-5 bg-slate-800 h-1 w-full'></div>
<div className='inline-block w-8/12 text-left'>
<h1 className="instrument-serif-regular font-bold text-4xl text-emerald-300 pt-10 text-left">
    Your Past Entries: </h1>

</div>

    <div className="w-9/12 inline-flex flex-col lg:flex-row p-4 gap-4">
      {/* Calendar Section */}
      <div className="w-full lg:w-1/3">
        <div className="text-center ">
          <div className="w-72 inline-flex flex-row items-center mb-2 ">
            <button 
              onClick={() => setCurrentDate(subMonths(currentDate, 1))} 
              className="px-2 py-1 rounded-full text-cyan-500 border-2 border-slate-900
              hover:border-2 hover:border-emerald-950"
            >
              ◀
            </button>
            <h2 className="text-md text-center w-full text-white noto-sans px-12">{format(currentDate, "MMMM yyyy")}</h2>
            <button 
              onClick={() => setCurrentDate(addMonths(currentDate, 1))} 
              className="px-2 py-1 rounded-full text-cyan-500 border-2 border-slate-900
              hover:border-2 hover:border-emerald-950"
            >
              ▶
            </button>
          </div>
          <p></p>
          <div className="inline-block border-2 border-slate-800 rounded">
            <div className="grid grid-cols-7 gap-0 max-w-fit min-h-0">
              {days.map((day, index) => (
                <button
                  key={index}
                  className={`w-10 h-10 flex items-center justify-center border border-slate-800 transition-all duration-150 
                    active:bg-white active:rounded-full active:transition-all active:duration-150 hover:rounded-full hover:border-emerald-600 hover:duration-150 
                    ${isSameDay(day, selectedDate) ? "bg-emerald-600 text-white font-bold border-white border-2 rounded-full" : "text-slate-500"}`}
                  onClick={() => setSelectedDate(day)}
                >
                  {format(day, "d")}
                </button>
              ))}
              
            </div>
            
          </div>
          <div className="block justify-center">
                <button 
                    onClick={handleToday} 
                    className={`text-white p-1 px-8 rounded-full border-2 mt-4 hover:border-emerald-600 transition-all duration-150
                        ${isSameDay(selectedDate, Date()) ? "bg-emerald-600 border-emerald-600 hover:border-emerald-300" : "border-slate-800"}`}
                >
                    Today
                </button>
            </div>
        </div>
      </div>

      {/* Info Blurb Section */}
      <div className="w-full lg:w-2/3 h-fit min-h-80 py-4 bg-slate-800 shadow-lg border border-slate-600 rounded-md text-center">
        {selectedDate && (
            <div>
          <div className="text-2xl instrument-serif-regular text-left text-emerald-500 px-4 pb-4">
            
            <p> {format(selectedDate, "PPP")}</p>

            {/* Additional details can go here */}

          </div>
          <div className='bg-slate-600 h-0.5 w-full p-0'></div>
          <p className="text-left p-4 ">
            <span className="text-emerald-500 font-bold">Gratitudes:</span>
            <ul className="text-white text-sm">
                <li>
                I got to go to Copperline Coffee today! I ordered a latte and managed to get a lot of work done.
                </li>
                
                
            </ul>
            </p>
          <p className="text-left px-4 text-white">Mood: 5/5 (not fully fleshed out)</p>
          </div>
        )}
      </div>
    </div>
    </div>

  );
}


  // export default function Dashboard(){
//     var username = "Anthony";

//     return(
//     <div className="bg-slate-900 min-w-full min-h-screen text-center">
//         <div className='inline-block w-8/12 text-left'>
//         <h1 className="instrument-serif-regular font-bold text-4xl text-emerald-300 pt-10 text-left">
//             Hello {username} ! </h1>
//             <p className="text-left text-white">Lets maintain your daily journaling streak!</p>
//             <button className="bg-green-400">Let's Journal!</button>
//         </div>
//         <div className='mt-5 bg-slate-800 h-1 w-full'></div>
//         <div className='inline-block w-8/12 text-left'>
//         <h1 className="instrument-serif-regular font-bold text-4xl text-emerald-300 pt-10 text-left">
//             Your Past Entries: </h1>

//         </div>

//     </div>
//     )
// }
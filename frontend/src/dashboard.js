import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, subMonths, addMonths } from 'date-fns';

  const getMoodMessage = (rating) => {
    switch (rating) {
      case 1:
        return "You are feeling very low today. It's okay to have tough days.";
      case 2:
        return "You might be struggling, but remember that you are strong.";
      case 3:
        return "You're doing alright. Hang in there!";
      case 4:
        return "You're feeling good! Keep up the positive energy.";
      case 5:
        return "You're at your best today!";
      default:
        return "";
    }
  };

export default function Dashboard() {
  var username = "USER"
  
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  const [mood, setMood] = useState(null);
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
        <a>
          <button 
          onClick={() => setIsOpen(true)}

          className="text-green-400 noto-sans mt-4 p-1 px-4 rounded-full border border-green-400 transition-all duration-150
        hover:bg-green-400 hover:text-slate-900 hover:font-bold active:bg-slate-950 active:text-slate-950 active:border-slate-950">
          Let's Journal!
          </button>
        </a>
        {isOpen && (
          
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">

    <div className="bg-slate-200 p-6 rounded-sm shadow-lg w-96 text-center relative">

      {/* Step 1 */}
      {step === 1 && (
        <>
          <h1 className="text-2xl mb-4 font-semibold instrument-serif-regular text-emerald-800 text-left">
            What are you grateful for today?
          </h1>
          <textarea
            placeholder="Think about the good things today. Don't be afraid of how big or small."
            className="w-full resize-y p-2 border rounded-md max-h-full overflow-auto h-48 playpen-sans
            focus:outline-dashed focus:outline-1 focus:outline-emerald-700"
          ></textarea>
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => {
                setIsOpen(false);
                setStep(1);
              }}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 hover:underline-offset-4 hover:underline"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <>
          <h1 className="text-2xl mb-4 font-semibold instrument-serif-regular text-emerald-800 text-left">
            What challenged you today?
          </h1>
          <textarea
            placeholder="Reflect on anything that was difficult or uncomfortable."
            className="w-full resize-y p-2 border rounded-md max-h-full overflow-auto h-48 playpen-sans
            focus:outline-dashed focus:outline-1 focus:outline-emerald-700"
          ></textarea>
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Back
            </button>
            <button
              onClick={() => {setStep(3); setMood(null);}}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 hover:underline-offset-4 hover:underline"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <>
          <h1 className="text-2xl mb-4 font-semibold instrument-serif-regular text-emerald-800 text-left">
            So overall, how do you feel today?
          </h1>
          <h1 className="text-xl mb-2 font-semibold instrument-serif-regular text-emerald-800 text-left">
            Your positive thoughts:
          </h1>
          <p
            className="w-full border rounded-md max-h-full overflow-auto h-32 playpen-sans
            text-left text-sm bg-white p-4"
          >
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.            
          </p>
          <h1 className="text-xl mb-2 font-semibold instrument-serif-regular text-emerald-800 text-left mt-2">
            Your negative thoughts:
          </h1>
          <p
            className="w-full border rounded-md max-h-full overflow-auto h-32 playpen-sans
          text-left text-sm bg-white p-4"
          >
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.            
          </p>

          <h1 className="text-xl mb-1 font-semibold instrument-serif-regular text-emerald-800 text-left mt-2">
            Rate Your Mood:
          </h1>
          {
            <a className="p-0 mb-1 text-sm playpen-sans">{getMoodMessage(mood)}</a>
          }
          <div className="mt-4 text-left">
      <div className ="block items-center text-center">
      <div className="inline-block gap-2 text-center">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            onClick={() => setMood(value)}
            className={`w-10 h-10 rounded-full border-2 font-bold transition-all duration-200 mx-2 
              ${mood === value 
                ? 'bg-emerald-600 text-white border-emerald-800 playpen-sans' 
                : 'bg-white text-emerald-800 border-emerald-500 hover:bg-emerald-100 playpen-sans'}`}
          >
            {value}
          </button>
        ))}

      </div>
  </div>
</div>

          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Back
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setStep(1);
              }}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 hover:underline-offset-4 hover:underline"
            >
              Finish
            </button>
          </div>
        </>
      )}
      
    </div>
  </div>
)}

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

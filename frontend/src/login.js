import React from 'react';
import ReactDOM from 'react-dom/client';

export default function Login(){
    return(
      <div className ="bg-slate-900" >
      <div>
      <h1 className="text-white font-bold text-3xl">Gratigator</h1>
      </div>
      <div className="min-h-screen min-w-full flex bg-slate-900 items-center justify-center">

        <div>
        <div className="text-center -translate-y-16">
          <div className="w-36 h-36 bg-teal-600 inline-block rounded-full pt-14 translate-y-14  relative"> 
            placeholder :3
          </div>
          
          <div className="bg-slate-800 px-4 rounded-lg pb-5 text-center"> 
            
            <h1 className= "text-white pt-24 text-center text-2xl font-black">
            Login
            </h1>

            <div className="w-72 mt-5">
              <input type="text" id="username" name="username" placeholder="username or email" className='block w-full rounded-md px-2 py-0.5'></input>
              <input type="password" name="password" placeholder="enter your password" className='block w-full mt-2 rounded-md px-2 py-0.5'></input>
            </div>

            <a href="/">
              <button className="bg-emerald-900 py-1 px-10 rounded-full mt-5 border-2 border-emerald-600 text-white font-bold">
                Sign-in
              </button>
            </a>
          </div>  
          </div>
          <a href="/" className="text-teal-50 text-center flex justify-center -translate-y-12">
              No account? Register.
            </a>

        </div>
        
      </div>
      </div>
      )
  };

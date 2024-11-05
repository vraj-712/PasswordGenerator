import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

const App = () => {

  const [lowerAllow, setLowerAllow] = useState(true)
  const [upperAllow, setUpperAllow] = useState(false)
  const [numerAllow, setNumberAllow] = useState(false)
  const [specialCharAllow, setSpecialCharAllow] = useState(false)
  const [passwordLength, setPasswordLength] = useState(25)
  const [password, setPassword] = useState("")

  const ref = useRef(null)

  const generatePassword = () => {
    let tempPassword = ""
    let str = ""
    if (lowerAllow) str += "abcdefghijklmnopqrstuvwxyz"
    if (upperAllow) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numerAllow) str += "0123456789"
    if (specialCharAllow) str += "!@#$%^&*()_+-=[]{}|;:'\",./<>?"
    str = shuffleString(str)
    for (let i = 0; i < passwordLength; i++) {
      tempPassword += str[Math.floor(Math.random() * str.length)];
    }
    setPassword(tempPassword)
  }

  const shuffleString = (str) => {
    const chars = str.split(''); // Convert string to array of characters
  
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate random index
      [chars[i], chars[j]] = [chars[j], chars[i]]; // Swap characters
    }
  
    return chars.join(''); // Convert array back to string
  }

  const handleCopy = () => {
    const textToCopy = ref.current.value;
    
    // Copy to clipboard
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        toast.success('Copied to clipboard!');
      })
      .catch(err => {
        toast.error('Failed to copy text: ', err);
      });
  }

  useEffect(() => {
    generatePassword();
  },[passwordLength, lowerAllow, upperAllow, numerAllow, specialCharAllow])


  return (
    <div className="h-screen w-full bg-gray-400">
      <div className="w-4/5 h-3/4 bg-indigo-500 p-4 top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2 rounded-xl">
        <div className="h-full w-full bg-indigo-200 rounded-xl p-2 flex flex-col gap-2">
          <div className="bg-indigo-500 md:p-5 p-3 rounded-xl">
            <p className="text-white font-bold text-center md:text-3xl text-xl">
              Password Generator
            </p>
          </div>
          <div className="bg-indigo-500 md:p-5 p-3 rounded-xl h-full flex flex-col md:gap-5 gap-2 justify-evenly">
            <div className="flex flex-row justify-center">
              <input
                type="text"
                className="w-10/12 m-1 md:h-16 h-10 rounded-xl md:p-2 p-1 md:text-xl text-md focus:outline-none text-indigo-500 font-bold"
                value={password}
                ref={ref}
                readOnly
              />
              <button onClick={handleCopy} className="m-1 text-xl bg-indigo-300 w-full flex-1 hover:bg-indigo-400 p-2 rounded-xl font-bold text-white">
                Copy
              </button>
            </div>
            <div className="flex flex-row mx-auto w-3/4 ">
              <div className="bg-indigo-300 md:p-5 p-3 md:px-7 rounded-xl m-1">
                <p className="text-white font-extrabold  text-center text-lg items-center">
                  {passwordLength}
                </p>
              </div>
              <div className="md:p-5 p-2 rounded-xl w-full m-1 md:px-10 px-3">
                <input
                  type="range"
                  name=""
                  min="8"
                  max="64"
                  value={passwordLength}
                  onChange={(e) => setPasswordLength(e.target.value)}
                  className="align-middle w-full slider"
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-11/12 mx-auto ">
              <div className="bg-indigo-300 md:p-5 p-2 rounded-xl m-1 flex flex-row items-center w-3/4 mx-auto gap-2">
                <input type="checkbox" id="uppercase" onChange={(e) => setUpperAllow(e.target.checked)}  checked={upperAllow} className="w-1/4 h-[13px] md:h-[25px]  cursor-pointer" />
                <p className="text-white font-extrabold text-center flex-1 w-full text-md md:text-xl" >
                  Uppercase
                </p>
              </div>
              <div className="bg-indigo-300 md:p-5 p-2 rounded-xl m-1 flex flex-row items-center w-3/4 mx-auto gap-2">
                <input type="checkbox" onChange={(e) => setLowerAllow(e.target.checked)} checked={lowerAllow} className="w-1/4 h-[13px] md:h-[25px] cursor-pointer" />
                <p className="text-white font-extrabold text-center flex-1 w-full text-md md:text-xl">
                  Lowercase
                </p>
              </div>
              <div className="bg-indigo-300 md:p-5 p-2 rounded-xl m-1 flex flex-row items-center w-3/4 mx-auto gap-2">
                <input type="checkbox" onChange={(e) => setNumberAllow(e.target.checked)} checked={numerAllow} className="w-1/4 h-[13px] md:h-[25px] cursor-pointer" />
                <p className="text-white font-extrabold text-center flex-1 w-full text-md md:text-xl">
                  Number
                </p>
              </div>
              <div className="bg-indigo-300 md:p-5 p-2 rounded-xl m-1 flex flex-row items-center w-3/4 mx-auto gap-2">
                <input type="checkbox" onChange={(e) => setSpecialCharAllow(e.target.checked)} checked={specialCharAllow} className="w-1/4 h-[13px] md:h-[25px] cursor-pointer" />
                <p className="text-white font-extrabold text-center flex-1 w-full text-md md:text-xl">
                  Punctutation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default App;

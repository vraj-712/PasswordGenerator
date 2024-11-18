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
    if(!lowerAllow && !upperAllow && !numerAllow && !specialCharAllow) {
      toast.error('Please select at least one character type')
      setPassword(password)
      return
    }
    let tempPassword = ""
    let str = ""
    if (lowerAllow) str += "abcdefghijklmnopqrstuvwxyz"
    if (upperAllow) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numerAllow) str += "0123456789"
    if (specialCharAllow) str += "!@#$%^&*()_+-=[]{}|;:'\",./<>?"
    str = shuffleString(str)
    console.log(str);
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
  const handleRegenrate = () => {
    generatePassword()
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
              <button onClick={handleRegenrate} className="m-1 text-xl bg-indigo-300 w-full flex-1 hover:bg-indigo-400 p-2 rounded-xl font-bold text-white flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30" fill="#fff"><path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/></svg>
              </button>
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

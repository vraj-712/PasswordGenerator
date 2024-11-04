import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setnumberAllow] = useState(false);
  const [specialCharAllow, setSpecialCharAllow] = useState(false);
  const [capitalAllow, setCapitalAllow] = useState(false);
  const [smallAllow, setSmallAllow] = useState(false);
  const [password, setpassword] = useState("");
  const passwordRef = useRef(null);

  function generatePassword() {
    let pass = "";
    let str = "";
    if (capitalAllow) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (smallAllow) str += "abcdefghijklmnopqrstuvwxyz";
    if (numberAllow) str += "0123456789";
    if (specialCharAllow) str += "!@#$%^&*()_-~`{}[]?,.";
    str = stringShuffle(str);
    for (let i = 1; i <= length; i++) {
      let randomIndex = Math.floor(Math.random() * (str.length - 0) + 0);
      pass += str.charAt(randomIndex);
    }
    setpassword(pass);
  }
  function stringShuffle(str) {
    let tempStr = str.split("");
    for (let i = tempStr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
      const tmp = tempStr[i];
      tempStr[i] = tempStr[j];
      tempStr[j] = tmp;
    }
    return tempStr.join("");
  }
  function handleCopy() {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  useEffect(() => {
    generatePassword();
  }, [length, numberAllow, specialCharAllow, capitalAllow, smallAllow, setpassword]);

  return (
    <>
      <div
        className="w-1/2 h-1/2 mx-auto p-5 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 rounded-md"
        style={{
          backgroundColor: "#ADEFD1FF",
          color: "#ADEFD1FF",
          border: "2px solid #00203FFF",
        }}
      >
        <div className="flex flex-col h-full">
          <div
            style={{ backgroundColor: "#00203FFF" }}
            className="text-center p-3 text-white font-serif text-2xl rounded-xl my-1"
            id="passwodgenerator"
          >
            Password Generator
          </div>
          <div
            style={{ backgroundColor: "#00203FFF" }}
            className=" rounded-xl px-2 py-7 my-1 h-full flex flex-col justify-around items-center"
          >
            <div className="w-11/12 h-1/5 mx-auto flex justify-center mt-2 mb-1">
              <input
                type="text"
                className="w-full text-md rounded-l-xl p-1"
                value={password}
                style={{ color: "#00203FFF" }}
                ref={passwordRef}
                readOnly
              />
              <button
                className="rounded-r-xl text-md bg-blue-500 p-2"
                onClick={handleCopy}
              >
                Copy
              </button>
            </div>
            <div className="p-3 m-3 grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-1 xl:gap-10 gap-3 grid-wrap">
              <div className="flex text-lg justify-between align-middle ">
                <input
                  type="range"
                  min={8}
                  max={100}
                  id="length"
                  value={length}
                  className="h-[25px] me-3"
                  onChange={(e) => {
                    setLength(e.target.value);
                  }}
                />
                <label htmlFor="length" style={{alignSelf: "center"}} className="text-2xl font-bold">{`Length: ${length}`}</label>
              </div> 
              <div className="flex text-lg justify-between ">
                <input
                  type="checkbox"
                  id="number"
                  className="w-[25px]"
                  onClick={() => {
                    setnumberAllow((prev) => !prev);
                  }}
                />
                <label htmlFor="number" style={{alignSelf: "center"}} className="text-2xl font-bold">Number</label>
              </div>
              <div className="flex text-lg justify-between align-middle align-self-center">
                <input
                  type="checkbox"
                  id="char"
                  className="w-[25px]"
                  onClick={() => {
                    setSpecialCharAllow((prev) => !prev);
                  }}
                />
                <label htmlFor="char" className="text-2xl font-bold  " style={{alignSelf: "center"}}>Character</label>
              </div>
              <div className="flex text-lg justify-between align-middle">
                <input
                  type="checkbox"
                  id="capitalchar"
                  className="w-[25px]"
                  onClick={() => {
                    setCapitalAllow((prev) => !prev);
                  }}
                />
                <label htmlFor="capitalchar" className="text-2xl font-bold" style={{alignSelf: "center"}}>A - Z</label>
              </div>
              <div className="flex text-lg justify-between align-middle">
                <input
                  type="checkbox"
                  id="smallchar"
                  className="w-[25px]"
                  onClick={() => {
                    setSmallAllow((prev) => !prev);
                  }}
                />
                <label htmlFor="smallchar" className="text-2xl font-bold" style={{alignSelf: "center"}}>a - z</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

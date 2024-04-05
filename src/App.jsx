import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setnumberAllow] = useState(false);
  const [charAllow, setcharAllow] = useState(false);
  const [password, setpassword] = useState("");
  const passwordRef = useRef(null);

  function generatePassword() {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*()_-~`{}[]?,.";
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
  }, [length, numberAllow, charAllow, setpassword]);

  return (
    <>
      <div
        className="w-1/2 mx-auto p-5 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 rounded-md"
        style={{
          backgroundColor: "#ADEFD1FF",
          color: "#ADEFD1FF",
          border: "2px solid #00203FFF",
        }}
      >
        <div className="p-3">
          <div
            style={{ backgroundColor: "#00203FFF" }}
            className="text-center p-3 text-white font-serif text-2xl rounded-xl my-1"
            id="passwodgenerator"
          >
            Password Generator
          </div>
          <div
            style={{ backgroundColor: "#00203FFF" }}
            className=" rounded-xl px-2 py-7 my-1"
          >
            <div className="w-11/12 mx-auto flex justify-center mt-2 mb-1">
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
            <div className="mx-auto p-3 xl:justify-around mt-2 mb-2 flex-row xl:flex">
              <div className="flex text-lg justify-center align-middle">
                <input
                  type="range"
                  min={6}
                  max={100}
                  id="length"
                  value={length}
                  className="me-2"
                  onChange={(e) => {
                    setLength(e.target.value);
                  }}
                />
                <label htmlFor="length">Length: {length}</label>
              </div>
              <div className="flex text-lg justify-center align-middle">
                <input
                  type="checkbox"
                  id="number"
                  className="me-2"
                  onClick={() => {
                    setnumberAllow((prev) => !prev);
                  }}
                />
                <label htmlFor="number">Number</label>
              </div>
              <div className="flex text-lg justify-center align-middle">
                <input
                  type="checkbox"
                  id="char"
                  className="me-2"
                  onClick={() => {
                    setcharAllow((prev) => !prev);
                  }}
                />
                <label htmlFor="char">Character</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

import { useState,useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [length, setLength] = useState(6)
  const [password, setPassword] = useState("")
  const [isNumberAllowed, setNumberAllowed] = useState(false)
  const [isCharacterAllowed, setCharacterAllowed] = useState(false)
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(function () {
    let pswd = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    for (let i = 0; i < length; i++) {
      if (isNumberAllowed) str += "0123456789"
      if (isCharacterAllowed) str += "~!@#$%^&*()_+-={}|[]\:\"<>?,./`"
      pswd += str.charAt(Math.floor(Math.random()* str.length + 1))
    }

    setPassword(pswd)

  },[length,isCharacterAllowed,isNumberAllowed, setPassword])

  const copyPasswordToClipBoard = useCallback(function () {

    passwordRef.current.select()
    passwordRef.current.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(password)
    alert("Password copied to clipboard")

  })

  useEffect(() => {
    passwordGenerator()
  }, [length,isCharacterAllowed, isNumberAllowed, passwordGenerator])

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-custom">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyPasswordToClipBoard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              value={length}
              min={6}
              max={100}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="">Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              id="numberInput"
              type="checkbox"
              defaultChecked={isNumberAllowed}
              onChange={(e) => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              id="charInput"
              type="checkbox"
              defaultChecked={isCharacterAllowed}
              onChange={(e) => setCharacterAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App

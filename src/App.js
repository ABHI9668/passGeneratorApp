import "./App.css";
import { useState } from "react";
import Checkbox from "./components/Checkbox";
import usePasswordGenerator from "./hooks/use-password-generator";
import PasswordStrengthIndicator from "./components/Strength-Checker";
import Button from "./components/Button";

function App() {
  const [length, setLength] = useState(4);
  const[copied,setCopied]=useState(false)
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include UpperCase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);

  const handleCheckBoxesChange = (i) => {
    const updateCheckBoxData=[...checkboxData];
     updateCheckBoxData[i].state= !updateCheckBoxData[i].state;
     setCheckboxData(updateCheckBoxData)
  };
  const handleCopy=()=>{
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      
      setCopied(false);
    }, 2000);
  }
  const {password,ErrorMessage,generatePassword}=usePasswordGenerator();
  return (
    <div className="container">
      {/* password text and copy button  */}
      {password && <div className="header">
        <div className="title">{password}</div>
      
        <Button text={copied ? "copied":"copy"} onClick={handleCopy} customClass="copyBtn"/>
      </div>
}
      
      {/* Character Length */}

      <div className="charlength">
        <span>
          <label htmlFor="">Character length</label>
          <label htmlFor="">{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => {
            setLength(e.target.value);
          }}
        />
      </div>

      {/* checkboxes */}
      <div className="checkBoxes">
        {checkboxData.map((checkBox, index) => {
           return (
            <Checkbox
              key={index}
              title={checkBox.title}
              onChange={() => handleCheckBoxesChange(index)}
              state={checkBox.state}
            />
          );
        })}
      </div>

      {/* Strength */}
      <PasswordStrengthIndicator password={password}/>

      {/* Error Handling */}
      {ErrorMessage && <div className="erroMessage">{ErrorMessage}</div>}

      {/* Generate Button */}
      <Button customClass="generateBtn" onClick={() => generatePassword(checkboxData,length)}  text="Generate Password"/>
    </div>
  );
}

export default App;

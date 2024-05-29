import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generatePassword = (checkBoxData, length) => {
    let charSet = "";
    let generatedPassword = "";

    const selectedOptions = checkBoxData.filter((checkbox) => checkbox.state);

    if (selectedOptions.length === 0) {
      setErrorMessage("Select at least one option.");
      setPassword("");
      return;
    }

    selectedOptions.forEach((option) => {
      switch (option.title) {
        case "Include UpperCase Letters":
          charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Include Lowercase Letters":
          charSet += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Include Numbers":
          charSet += "0123456789";
          break;
        case "Include Symbols":
          charSet += "!@#$%^&*()";
          break;
        default:
          break;
      }
    });

    for (let index = 0; index < length; index++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      generatedPassword += charSet[randomIndex];
    }

    setPassword(generatedPassword);
    setErrorMessage("");
  };

  return { password, errorMessage, generatePassword };
};

export default usePasswordGenerator;

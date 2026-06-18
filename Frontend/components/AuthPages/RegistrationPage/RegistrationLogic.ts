import { getApiUrl } from '../../../config/api';

export const handleRegistration = async (
  emailText: string,
  passwordText: string,
  passwordRepText: string,
  nickname: string,
) => {
  console.log("AttemptLogEmail: ", emailText);
  console.log("AttemptLogPass: ", passwordText);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Email
  if (!emailRegex.test(emailText)) {
    console.log("Email Fail");
    alert("Wrong Email");
    return false;
  }

  // PassCap
  if (!/[A-Z]/.test(passwordText)) {
    console.log("Pass capitalization Fail");
    alert("Wrong password(No capitalized letter)");
    return false;
  }

  // PassSmall
  if (!/[a-z]/.test(passwordText)) {
    console.log("Pass small letter Fail");
    alert("Wrong password(No small letter)");
    return false;
  }

  // PassLength
  if (passwordText.length < 8) {
    console.log("Pass length fail");
    alert("Wrong password, too short. Must be longer than eight characters");
    return false;
  }

  if (passwordText != passwordRepText) {
    console.log("Pass length fail");
    alert("Repeated password is diffrent, than provided password.");
    return false;
  }

  console.log("Registration attempt");

  try {
    const response = await fetch(getApiUrl('/api/register/'), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailText,
        nickname: nickname,
        password: passwordText,
        repeat_password: passwordRepText,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Registration Success", data);
      alert("Konto założone pomyślnie! Możesz się zalogować.");
      return true;
    } else {
      console.log("Registration Fail from Backend:", data);

      alert(JSON.stringify(data)); 
      return false;
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("Brak połączenia z serwerem backendu.");
    return false;
  }
  return false;
};


export  const handleLogin = (emailText: string, passwordText: string) => {
    console.log("AttemptLogEmail: ", emailText);
    console.log("AttemptLogPass: ", passwordText);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email
    if (!emailRegex.test(emailText)) {
      console.log("Email Fail");
      alert("Wrong Email");
      return;
    }

    // PassCap
    if (!/[A-Z]/.test(passwordText)) {
      console.log("Pass capitalization Fail");
      alert("Wrong password(No capitalized letter))");
      return;
    }

    // PassSmall
    if (!/[a-z]/.test(passwordText)) {
      console.log("Pass small letter Fail");
      alert("Wrong password(No small letter)");
      return;
    }

    // PassLength
    if (passwordText.length < 8) {
      console.log("Pass length fail");
      alert("Wrong password, too short. Must be longer than eight characters");
      return;
    }

    console.log("Try login");
    navigation.navigate("Home");

    console.log("Success");
  };
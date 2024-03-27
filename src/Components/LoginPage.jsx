import { useState } from 'react'
import { BASE_URL, loginPageBusImage } from '../Constants'
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: "",
    })
    const [errorConditions, setErrorConditions] = useState({
        nameError: false,
        emailError: false,
        passwordError: false,
    })
    const [fetchError, setFetchError] = useState("");
    const [signing, setSigning] = useState(false);
    const [loader, setLoader] = useState(false);


    const handlerToggleBtn = (e) => {
        e.preventDefault();
        setSigning(!signing);
        setUserDetails(prev=>({...prev, username: "", email: "", password: ""}));
        setErrorConditions(prev=>({...prev, nameError: false, emailError: false, passwordError: false}));
    }
    
    const handlerSigningBtn = (e, value) => {
        e.preventDefault();
        if (value === "active") {
            fetchingFunction(userDetails);
        }
    }

    const handlerInputs = (e, values) => {
        function validateEmail(email) {
            let re = /\S+@\S+\.\S+/;
            return re.test(email);
        }

        function validateForm(name) {
            let nameRegex = /^[a-zA-Z\-]+$/;
            return nameRegex.test(name);
        }
        
        if (values === "username") {
            setUserDetails((prev)=>({...prev, username: e.target.value}));
            if (!validateForm(e.target.value)) {
                setErrorConditions(prev => ({...prev, nameError: true}));
            } else {
                setErrorConditions(prev => ({...prev, nameError: false}));
            }
        } else if (values === "email") {
            setUserDetails((prev)=>({...prev, email: e.target.value}));
            let errorCheck = (validateEmail(e.target.value));
            if (errorCheck) {
                setErrorConditions((prev)=>({...prev, emailError: false}));
            } else {
                setErrorConditions((prev)=>({...prev, emailError: true}));
            }
            
        } else if (values === "password") {
            setUserDetails((prev)=>({...prev, password: e.target.value}));
            if (e.target.value.length < 9) {
                setErrorConditions((prev)=>({...prev, passwordError: true}));
            } else {
                setErrorConditions((prev)=>({...prev, passwordError: false}));
            }
        }
    }

    const fetchingFunction = async (user) => {
        if (user.username.length !== 0) {
            setLoader(true);
            let url = `${BASE_URL}auth/register/`
            let body = {
                "username": user.username,
                "email": user.email,
                "password": user.password
            }
            const options = {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            }
            try {
                const response = await fetch(url, options);
                console.log('re', response);
                if (response.ok) {
                    const result = await response.json();
                    console.log(result);
                    setFetchError("Success");
                    setTimeout(()=> {
                        setFetchError("");
                        setSigning(!signing);
                        setUserDetails(prev=>({...prev, username: "", email: "", password: ""}));
                        setErrorConditions(prev=>({...prev, nameError: false, emailError: false, passwordError: false}));
                    }, 500)
                } else {
                    const result = await response.json();
                    setFetchError(result);
                }

            } catch (e) {
                console.error(e);
            }
            setLoader(false);
        } else {
            setLoader(true);
            let url = `${BASE_URL}auth/login/`
            let body = {
                "email": user.email,
                "password": user.password
            }
            const options = {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            }

            try {
                const response = await fetch(url, options);
                if (response.ok) {
                    const result = await response.json();
                    console.log(result);
                    localStorage.setItem("token", JSON.stringify(result.accessToken));
                    localStorage.setItem("email", JSON.stringify(result.email));
                    localStorage.setItem("userId", JSON.stringify(result.userId));
                    setFetchError("Success");
                    setTimeout(()=> {
                        navigate('/booking');
                    }, 1000)
                } else {
                    const result = await response.json();
                    setFetchError(result);
                }
            } catch (e) {
                console.error(e);
            }
            setLoader(false);
        }
    }

    return (
        <>
            <div className='relative bg-teal-500 flex flex-col justify-center items-center h-dvh'>
                <h1 className='uppercase font-bold text-2xl font-sans px-2 my-1'>Trip Trekker</h1>
                <img src={loginPageBusImage} alt="" className='w-3/5' />
                <form action="login" className='absolute top-15 backdrop-blur-3xl backdrop-opacity-50 bg-zinc-500/60 w-60 h-96 sm:w-72 md:w-96 flex flex-col justify-center items-center rounded-3xl'>
                    {!signing &&
                        <>
                            <input type="text" onChange={(e)=>handlerInputs(e, "username")} value={userDetails.username} className='border w-50 md:w-70 px-2 py-1' placeholder='User Name' />
                            {errorConditions.nameError && 
                                <p className='text-sm text-red-500'>Enter Valid Name</p>
                            }
                        </>
                    }
                    <input type="email" onChange={(e)=>handlerInputs(e, "email")} value={userDetails.email} className='border w-50 md:w-70 px-2 py-1 mt-4' placeholder='Email' />
                    {errorConditions.emailError && 
                        <p className='text-sm text-red-500'>Enter Valid Email</p>
                    }
                    <input type="password" onChange={(e)=>handlerInputs(e, "password")} value={userDetails.password} className='border w-50 md:w-70 px-2 py-1 mt-4' placeholder='Password' />
                    {errorConditions.passwordError &&
                        <p className='text-sm text-red-500'>Password Should Minimum 8</p>
                    }
                    {!signing ?
                    <>
                        {!errorConditions.nameError && !errorConditions.emailError && !errorConditions.passwordError && userDetails.username.length !== 0 &&
                        userDetails.email.length !== 0 && userDetails.password.length !== 0 ? 
                            <button onClick={(e)=>handlerSigningBtn(e, "active")} className='bg-yellow-300 px-4 py-1 rounded-md mt-4'>{!signing?"Sign Up":"Login"}</button>
                            :
                            <button onClick={(e)=>handlerSigningBtn(e, "none")} className='bg-yellow-100 px-4 py-1 rounded-md mt-4 cursor-not-allowed'>{!signing?"Sign Up":"Login"}</button>
                    }
                    {fetchError && <p className={`text-sm ${fetchError==="Success"?'text-green-400':'text-red-500' }`}>{fetchError}</p>}
                    </>
                    : 
                    <>
                    {!errorConditions.emailError && !errorConditions.passwordError &&
                        userDetails.email.length !== 0 && userDetails.password.length !== 0 ? 
                        <button onClick={(e)=>handlerSigningBtn(e, "active")} className='bg-yellow-300 px-4 py-1 rounded-md mt-4'>{!signing?"Sign Up":"Login"}</button>
                        :
                        <button onClick={(e)=>handlerSigningBtn(e, "none")} className='bg-yellow-100 px-4 py-1 rounded-md mt-4 cursor-not-allowed'>{!signing?"Sign Up":"Login"}</button>
                    }
                    {fetchError && <p className={`text-sm ${fetchError==="Success"?'text-green-400':'text-red-500' }`}>{fetchError}</p>}
                    </>
                }
                    <button onClick={handlerToggleBtn} className='mt-4'>
                        {!signing ? "Already Have a Account":"New User"}
                    </button>
                </form>
                {loader && <>Loader...</>}
            </div>
        </>
    )
}

export default LoginPage

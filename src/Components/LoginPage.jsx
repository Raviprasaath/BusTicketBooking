import { useState } from 'react'
import { loginPageBusImage } from '../Constants'


const LoginPage = () => {
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

    const handlerInputs = (e, values) => {
        let numberCheck = false;
        if (e.target.value.includes >= 0 && e.target.value.includes <= 9) {
            numberCheck = true;
        } else {
            numberCheck = false;
        }
        console.log(numberCheck)
        if (values === "username") {
            setUserDetails((prev)=>({...prev, username: e.target.value}));
            if (e.target.value.length < 3 || numberCheck) {
                setErrorConditions(prev => ({...prev, nameError: true}));
            } else {
                setErrorConditions(prev => ({...prev, nameError: false}));
            }
        } else if (values === "email") {
            setUserDetails((prev)=>({...prev, email: e.target.value}))
        } else if (values === "password") {
            setUserDetails((prev)=>({...prev, password: e.target.value}))
        }
    }
    console.log(userDetails);


    return (
        <>
            <div className='relative bg-teal-500 flex flex-col justify-center items-center h-dvh'>
                <h1 className='uppercase font-bold text-2xl font-sans px-2 my-1'>Trip Trekker</h1>
                <img src={loginPageBusImage} alt="" className='w-3/5' />
                <form action="login" className='absolute top-15 backdrop-blur-3xl backdrop-opacity-50 bg-zinc-500/60 w-60 h-96 sm:w-72 md:w-96 flex flex-col justify-center items-center rounded-3xl'>
                    <input type="text" onChange={(e)=>handlerInputs(e, "username")} className='border w-50 md:w-70 px-2 py-1' placeholder='User Name' />
                    {errorConditions.nameError && 
                        <p className='text-sm text-red-500'>Enter Valid Name</p>
                    }
                    <input type="text" onChange={(e)=>handlerInputs(e, "email")} className='border w-50 md:w-70 px-2 py-1 mt-4' placeholder='Email' />
                    {errorConditions.emailError && 
                        <p className='text-sm text-red-500'>Enter Valid Email</p>
                    }
                    <input type="text" onChange={(e)=>handlerInputs(e, "password")} className='border w-50 md:w-70 px-2 py-1 mt-4' placeholder='Password' />
                    {errorConditions.passwordError &&
                        <p className='text-sm text-red-500'>Password Should Minimum 8</p>
                    }
                    <button className='bg-yellow-300 px-4 py-1 rounded-md mt-4'>Sign Up</button>
                    <button className='mt-4'>Already Have a Account</button>
                </form>
            </div>
        </>
    )
}

export default LoginPage

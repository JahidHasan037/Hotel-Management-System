import React, { useEffect } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import SocialLogin from '../../shared-component/social-login/SocialLogin';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {


    // all hooks     
    const { loginUser } = useAuth();//loading auth functions using useAuth hook
    const navigate = useNavigate();
    const { state } = useLocation();
    const desiredRoute = state || '/'; console.log(desiredRoute);


    // function for loading captcha 
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm();

    //handle onSubmit for submitting data 
    const onSubmit = (data) => {

        const { email, password, captcha } = data;

        if (!validateCaptcha(captcha)) {

            setError("captcha", {
                type: "manual",
                message: "Invalid Captcha",  // Custom error message
            });

            return;
        }

        loginUser(email, password)
            .then(result => {
                ('log in success', result.user);

                Swal.fire(
                    {
                        icon: 'success',
                        title: 'login success',
                    }
                )

                navigate(desiredRoute);

            })
            .catch(err => {
                console.log(err);
            })


    }

    return (
        <section className="flex lg:items-center">
            <div className="w-full px-4 sm:px-6 lg:w-1/2 scale-75">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Please Login!</h1>

                    <p className="mt-4 text-gray-500 dark:text-white">
                        Enter the information accurately
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate="" action="" className="mx-auto mb-0 mt-8 max-w-md space-y-4">


                    <div className="space-y-1 text-sm">

                        <label htmlFor="email" className="block text-gray-400 dark:text-white">Email</label>

                        <input type="email" {...register('email', { required: 'email is required' })} id="Email" placeholder="Email" className="w-full px-4 py-3 rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800 focus:border-blue-400 focus:dark:border-blue-600" />

                        {/* showing error  */}

                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

                    </div>

                    {/* password input field  */}

                    <div className="space-y-1 text-sm">

                        <label htmlFor="password" className="block text-gray-400 dark:text-white">Password</label>

                        <input type="password" {...register('password', { required: 'Password is required' })} id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800 focus:border-blue-400 focus:dark:border-blue-600" />

                        {/* showing error  */}

                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

                        <div className="flex justify-end text-xs text-gray-400 dark:text-white">
                            <a rel="noopener noreferrer" href="#">Forgot Password?</a>
                        </div>
                    </div>

                    {/* captcha input field  */}

                    <div className="space-y-1 text-sm">

                        <label htmlFor="password" className="block text-gray-400 dark:text-white">Captcha</label>

                        <input type="text" {...register('captcha', { required: 'Captcha is required' })} id="captcha" placeholder="captcha" className="w-full px-4 py-3 rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800 focus:border-blue-400 focus:dark:border-blue-600" />

                        {/* showing error  */}

                        {errors.captcha && <p className='text-red-500'>{errors.captcha.message}</p>}

                    </div>

                    <LoadCanvasTemplate />

                    <button className="block btn w-full p-3 text-center rounded-sm text-gray-900 dark:text-gray-50 bg-blue-400 dark:bg-blue-600">Login</button>

                    <div className="flex text-sm gap-2">
                        <p>Don't Have a Account ? Please </p> <Link to={`/register`} className="underline text-blue-400"> Register</Link>
                    </div>

                </form>

                {/* main form ends here  */}

                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 bg-gray-700 dark:bg-gray-300"></div>
                    <p className="px-3 text-sm text-gray-400 dark:text-white">Login with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 bg-gray-700 dark:bg-gray-300"></div>
                </div>

                {/* social login entry point */}

                <div className='md:w-[80%] mx-auto'>
                    <SocialLogin desiredRoute={desiredRoute} />
                </div>

            </div>

            <div className="hidden md:block w-full lg:w-1/2">
                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                    className=" inset-0 h-full w-full object-cover"
                />
            </div>
        </section>
    );
};

export default Login;
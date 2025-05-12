import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../../Hooks/useAuth'
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {


    const { createNewUser, updateUser } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    // using react hook form 

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {

        // console.log(data);

        const { name, email, photoUrl, password } = data;

        try {
            const createdUser = await createNewUser(email, password);

            const { user } = createdUser;

            if (user) {

                updateUser({ displayName: name, photoURL: photoUrl })
                    .then(result => {

                        axiosPublic.post('/user', { name, email, photoUrl, membership: "Bronze", role: "user", meal_added: 0 })
                            .then(res => {
                                // console.log(res);
                                if (res.data.insertedId) {

                                    Swal.fire(
                                        {
                                            icon: 'success',
                                            title: 'user added to db'
                                        }
                                    )

                                    navigate('/');
                                    reset(); return;
                                }

                                Swal.fire({ icon: 'warning', title: 'User Already Exists please login' })
                                navigate('/login');

                            })

                    }) //err that can occur while updating user
            }
        } catch (error) {
            // console.error('Error creating user:', error.message);
            Swal.fire({ icon: 'error', title: `${error.message}` })
        }
    }

    return (
        <section className="flex lg:h-screen lg:items-center">
            <div className="w-full px-4  sm:px-6  lg:w-1/2 lg:px-8 scale-75">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Register Your Account!</h1>

                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate="" action="" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm">Name</label>
                            <input type="text" name="name" id="name" {...register("name")} placeholder="Jhankar Mahbub" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-green-600" />

                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm">Email address</label>
                            <input type="email" {...register("email", { required: "Email is Required" })} id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-green-600" />

                            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

                        </div>
                        <div className="space-y-2">
                            <label htmlFor="photoUrl" className="block text-sm">PhotoUrl</label>
                            <input type="url" {...register("photoUrl")} id="photo" placeholder="https://image.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-green-600" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label htmlFor="password" className="text-sm">Password</label>

                            </div>
                            <input type="password" {...register("password",
                                {
                                    required: "Password Required",
                                    minLength: {
                                        value: 5,
                                        message: "Username must be at least 5 characters",
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "Username cannot exceed 15 characters",
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                                        message: "Enter a password with at least 6 character, one uppercase , one lowercase and a special character"
                                    }
                                }
                            )} id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-green-600" />

                            {errors.password && <p className='text-red-400'>{errors.password.message}</p>}

                        </div>
                    </div>
                    <button className="w-full btn px-8 py-3 font-semibold rounded-md text-gray-50 bg-blue-600">Register</button>
                    <div className="flex text-sm gap-2">
                        <p>Already Have a Account ? consider </p> <Link to={`/login`} className="underline text-blue-400"> Login</Link>
                    </div>
                </form>

            </div>

            <div className="hidden md:block  w-full lg:h-full lg:w-1/2">
                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                    className="inset-0 h-full w-full object-cover opacity-80"
                />
            </div>
        </section>
    );
};

export default Register;
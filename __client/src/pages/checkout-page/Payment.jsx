import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../shared-component/section-title/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Pk);


const Payment = () => {

    const { state } = useLocation(); console.log(state);

    return (
        <div>

            <SectionTitle title={'Payment'} />

            <div className="grid grid-cols-1 md:grid-cols-2 justify-start items-center">

                <div className="flex justify-center lg:p-10 p-5">
                    <div className="card  shadow-xl lg:w-[70%] w-full dark:bg-slate-800">
                        <div className="card-body text-center">
                            <h1 className="text-2xl font-bold text-blue-400">{state?.name} Membership</h1>
                            <p className="text-xl text-gray-600 dark:text-white mt-2">Just {state?.price} USD/month</p>
                            <div className="divider my-4"></div>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-blue-400">Features:</h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-white ">
                                {state?.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>


                <div className="w-full md:w-[35vw] mx-auto shadow-2xl p-4 bg-yellow-200 dark:bg-slate-800">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm membershipCard={state} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;
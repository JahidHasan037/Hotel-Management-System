import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import moment from "moment";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";




const CheckoutForm = ({ membershipCard }) => {

    console.log(membershipCard);

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState(null);
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate();

    const totalPrice = parseFloat(membershipCard?.price);

    useEffect(() => {

        if (totalPrice > 0) {
            if (totalPrice > 0) {
                axiosSecure.post('/create-payment-intent', { price: totalPrice })
                    .then(res => {
                        console.log(res.data.clientSecret);
                        setClientSecret(res.data.clientSecret);
                    })
            }
        }
    }, [totalPrice])

    const handleFormSubmit = async (e) => {

        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }//if payment is success
        else {
            console.log('payment intent', paymentIntent)

            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);
            }

            // now save the payment in the user collection
            const payment = {
                user_email: user?.email,
                price: totalPrice,
                transactionId: paymentIntent.id,
                payment_date: moment(new Date()).format("YYYY-MM-DD"), // utc date convert. use moment js to 
                status: 'success',
            }

            try {

                const res = await axiosSecure.post('/payment', payment); //console.log(res.data);

                if (res.data.insertedId) {

                    const membershipUpdateRes = await axiosSecure.patch(`/user/${user?.email}?membership=${membershipCard?.name}`);console.log(membershipUpdateRes);

                    if (membershipUpdateRes.data.modifiedCount) {

                        navigate('/dashboard/payment-history')
                        Swal.fire({ icon: 'success', title: 'Payment Successful and membership updated' });

                    }
                    Swal.fire({ icon: 'success', title: 'Payment Successful and membership updated' });
                }

            } catch (error) {
                console.log(error)
            }
        }

    }

    return (
        <form onSubmit={handleFormSubmit}>

            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />

            <button className="btn btn-primary mt-8" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-500 text-sm">{error}</p>
        </form>
    );
};

export default CheckoutForm;
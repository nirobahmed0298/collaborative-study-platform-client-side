import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../Provider/AuthProvider';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useSession from '../../../../Hooks/useSession';
import html2canvas from 'html2canvas';
const CheckOutForm = ({ session }) => {
    const stripe = useStripe();
    const elements = useElements();
    let [error, setError] = useState([]);
    const [transaction, setTransaction] = useState([]);
    let axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState("");
    let [sessions, , refetch] = useSession()
    let fee = session.RegistrationFee;

    useEffect(() => {
        if (fee > 0) {
            axiosSecure.post('/create-payment-intent', { price: fee })
                .then((res) => setClientSecret(res.data.clientSecret));

        }
    }, [axiosSecure, fee]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
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
            setError(error.message)
        } else {
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
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                setTransaction(paymentIntent);
                // now save the payment in the database
                const payment = {
                    email: user.email,
                    price: fee,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    session: [
                        session
                    ],
                    status: 'pending'
                }
                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res.data);
                refetch();
                if (res.data?.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Your $ ${fee} payment successfully.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        }



    };


    return (
        <>
            <form className='border my-10 p-10 ' onSubmit={handleSubmit}>
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
                <p className='text-red-500'>{error}</p>
                <button className={`btn btn-sm mt-6 rounded-none border-green-600 px-8`} type="submit"
                    disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                {/* {transaction.id && <p className="text-green-600"> Your transaction id: {transaction.id}</p>} */}
                {transaction.id &&
                    <div className='my-5 p-4 border md:w-8/12 mx-auto shadow-md'>
                        <p>Name : {user && user.displayName}</p>
                        <p>Email : {user && user.email}</p>
                        <p>Transaction Id : {transaction.id}</p>
                        <p>Amount : ${parseInt(transaction.amount / 100)}</p>
                    </div>
                }
            </form >

        </>

    );
};

export default CheckOutForm;
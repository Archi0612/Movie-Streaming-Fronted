import StripeCheckout from 'react-stripe-checkout'
import { payment } from '../redux/actions/paymentAction';
import { useDispatch, useSelector } from 'react-redux'

export default function Checkout({ subscriptionType, total }: any) {
    const dispatch = useDispatch()

    const tokenHandler = (token) => {
        try {
            if (token) {
                dispatch(payment(token, total, subscriptionType));
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <StripeCheckout
                token={tokenHandler}
                amount={total}
                shippingAddress
                billingAddress
                stripeKey='pk_test_51QvyRUSD1tLFpFuZlMFvs0xNZDOI6tXv3j0LCyvGAmSLJ79CHvPe4SjKSFvwkG79iYsF2PyJQCLaZbKSwgkWwD0100NwK0sDgQ'
                currency='INR'
            >
                <button> Paynow</button>
            </StripeCheckout>
        </div >
    )
}

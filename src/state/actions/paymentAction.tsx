import axios from "axios";
import { Dispatch } from "redux";

interface PaymentAction {
    type: string;
}

export const payment = (token: any, subscriptionType: string, total: number) =>
    async (dispatch: Dispatch<PaymentAction>, getState: any) => {
        dispatch({ type: 'PLACE_ORDER_REQUEST' });

        const currentUser = getState().loginUserReducer.currentUser;

        try {
            const response = await axios.post('/api/subscription/payment', {
                token,
                currentUser,
                subscriptionType,
                total
            });

            dispatch({ type: 'PLACE_ORDER_SUCCESS' });
            console.log(response);
        } catch (err) {
            dispatch({ type: 'PLACE_ORDER_FAILED' });
            console.error(err);
        }
    };

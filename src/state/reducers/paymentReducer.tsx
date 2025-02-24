export const paymentReducer = (state = {}, action) => {
    switch (action.type) {
        case 'PAYMENT_REQUEST':
            return {
                loading: true
            };
        case 'PAYMENT_SUCCESS':
            return {
                loading: false,
                success: true
            };
        case 'PAYMENT_FAILED':
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

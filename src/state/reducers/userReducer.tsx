import { Reducer } from "redux";

// Define action types as constants
export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILED = "USER_REGISTER_FAILED";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

// Define the state types
interface AuthState {
    loading?: boolean;
    success?: boolean;
    error?: string;
    currentUser?: any;
}

// Define the action type
interface AuthAction {
    type: string;
    payload?: any;
}

// Register User Reducer
export const registerUserReducer: Reducer<AuthState, AuthAction> = (
    state = {},
    action
) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, success: true };
        case USER_REGISTER_FAILED:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Login User Reducer
export const loginUserReducer: Reducer<AuthState, AuthAction> = (
    state = {},
    action
) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, success: true, currentUser: action.payload };
        case USER_LOGIN_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

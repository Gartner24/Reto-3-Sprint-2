import { GET_USERS, LOGGED_IN } from "../types/types";

export default function (state, action) {
    const { payload, type } = action;

    switch (type) {
        case GET_USERS:
            return {
                ...state,
                users: payload
            };
        case LOGGED_IN:
            return {
                ...state,
                selectedUser: payload
            };
        default:
            return state;
    }
}
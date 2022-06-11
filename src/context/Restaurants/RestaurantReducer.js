import { GET_RESTAURANTS } from "../types/types";

export default function (state, action) {
    const { payload, type } = action;

    switch (type) {
        case GET_RESTAURANTS:
            return {
                ...state,
                restaurantsData: payload
            };
        default:
            return state;
    }
}
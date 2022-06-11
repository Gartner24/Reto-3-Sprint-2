import { GET_FOOD} from "../types/types";

export default function (state, action) {
    const { payload, type } = action;

    switch (type) {
        case GET_FOOD:
            return {
                ...state,
                foodData: payload
            };
        default:
            return state;
    }
}
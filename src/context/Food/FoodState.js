import React, { useReducer } from "react"
import FoodReducer from "./FoodReducer"
import axios from "axios"
import FoodContext from "./FoodContext"

const foodURL = "https://food-hut-api.herokuapp.com/food"

const FoodState = (props) => {
    const initialState = {
        foodData: [],
        selectedFood: null
    }

    const [state, dispatch] = useReducer(FoodReducer, initialState)

    const getFood = async (pathParams) => {
        try {
            const { data } = await axios.get(foodURL + "?restaurant=" + pathParams)
            dispatch({
                type: 'GET_FOOD',
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }

    const deleteFood = () => { }

    const createFood = () => { }

    return (
        <FoodContext.Provider value={
            {
                foodData: state.foodData,
                selectedFood: state.selectedFood,
                getFood,
                deleteFood,
                createFood
            }
        } >
            {props.children}
        </FoodContext.Provider>
    )
}

export default FoodState;
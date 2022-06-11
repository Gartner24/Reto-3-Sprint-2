import React, { useReducer } from "react"
import RestaurantReducer from "./RestaurantReducer"
import axios from "axios"
import RestaurantContext from "./RestaurantContext"

const restaurantURL = "https://food-hut-api.herokuapp.com/restaurants"

const RestaurantState = (props) => {
    const initialState = {
        restaurantsData: [],
        selectedRestaurant: null
    }

    const [state, dispatch] = useReducer(RestaurantReducer, initialState)

    const getRestaurants = async () => {
        try {
            const { data } = await axios.get(restaurantURL)
            dispatch({
                type: 'GET_RESTAURANTS',
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }

    const deleteRestaurant = () => { }

    const updateRestaurant = () => { }

    const createRestaurant = () => { }

    return (
        <RestaurantContext.Provider value={
            {
                restaurantsData: state.restaurantsData,
                selectedRestaurant: state.selectedRestaurant,
                getRestaurants,
                deleteRestaurant,
                updateRestaurant,
                createRestaurant
            }
        } >
            {props.children}
        </RestaurantContext.Provider>
    )
}

export default RestaurantState;
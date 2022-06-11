import React, { useReducer } from "react"
import UserReducer from "./UserReducer"
import UserContext from "./UserContext"
import axios from "axios"

const userURL = "https://food-hut-api.herokuapp.com/users"

const UserState = (props) => {
    const initialState = {
        users: [],
        selectedUser: null
    }

    const [state, dispatch] = useReducer(UserReducer, initialState)

    const getUsers = async () => {
        const { data } = await axios.get(userURL)
        dispatch({
            type: 'GET_USERS',
            payload: data
        })
    }

    const loggedIn = (user) => {
        dispatch({
            type: 'LOGGED_IN',
            payload: user
        })
    }

    return (
        <UserContext.Provider value={
            {
                users: state.users,
                selectedUser: state.selectedUser,
                getUsers,
                loggedIn
            }
        } >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;
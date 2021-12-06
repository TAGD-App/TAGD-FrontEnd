import axios from 'axios';
import { authenticateRequest } from '../gateKeepingMiddleware';

//ACTION TYPES
const GET_USER = 'GET_USER';
const CREATE_USER = 'CREATE_USER';

//ACTION CREATORS
const getUser = (user) => {
    return {
        type: GET_USER,
        user
    }
}

const createUser = (newUser) => {
    return {
        type: CREATE_USER,
        newUser
    }
}

//THUNKS
export const fetchSingleUser = (email, password) => {
    return async (dispatch) => {
        try {
            const { user } = await axios.post('https://tagd-backend.herokuapp.com/auth/login', {
                email,
                password
            })
            dispatch(getUser(user))
        } catch (error) {
            console.log(error)
        }
    }
}

export const createSingleUser = (userData) => async dispatch => {
    try {

        const { data: user } = await axios.post(`https://tagd-backend.herokuapp.com/api/users`, userData)
        if (user) {
            dispatch(createUser(user))
        }
    } catch (error) {
        console.log(error)
    }
}


export default function usersReducer(state = {}, action) {
    switch (action.type) {
        case GET_USER:
            return action.user
        case CREATE_USER:
            return { ...state, user: action.newUser }
        default:
            return state;
    }
}

import { combineReducers } from 'redux'
import AuthReducer from './Auth/AuthReducer.js'

// create root reducer
const rootReducer = combineReducers({

    auth : AuthReducer

})

// export reducer
export default rootReducer
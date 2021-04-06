import { createStore } from "redux";

const initState = {
    user: {
        login: false,
        email: null,
        displayName: null,
        id: null
    },
    nweets: [],
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: { login: true, email: action.user, id: action.id, displayName: action.displayName } }
        case "LOGOUG":
            return { ...state, user: { login: false, email: null } }
        case "SET_NWEETS":
            return { ...state, nweets: action.nweetArray }
        default:
            return state
    }
}

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
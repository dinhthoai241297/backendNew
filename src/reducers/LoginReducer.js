import * as actionTypes from './../actionTypes/UserActionTypes';

let initState = {
    username: '',
    password: '',
    roles: []
};

const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN: {
            let { username, password, email, fullName, roles } = action.user;
            return { username, password, email, fullName, roles };
        }
        case actionTypes.LOGOUT: {
            return {
                username: '',
                password: '',
                roles: []
            };
        }
        default: {
            return { ...state };
        }
    }
}

export default loginReducer;
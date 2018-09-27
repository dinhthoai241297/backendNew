import * as actionTypes from './../actionTypes/UserActionTypes';

let initState = {
    user: {
        username: '',
        password: '',
        roles: []
    },
    session: ''
};

const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN: {
            return {
                user: {
                    ...action.data.user,
                    role: JSON.parse(action.data.user.role.roles)
                },
                session: action.data.session
            };
        }
        case actionTypes.LOGOUT: {
            return {
                user: {
                    username: '',
                    password: '',
                    roles: []
                },
                session: ''
            };
        }
        default: {
            return { ...state };
        }
    }
}

export default loginReducer;
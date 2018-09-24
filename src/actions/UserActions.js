import userApi from './../api/UserApi';
import * as actionTypes from './../actionTypes/UserActionTypes';
import UserApi from './../api/UserApi';

export const addUserApi = user => {
    return dispatch => userApi.add(JSON.stringify(user)).then(res => {
        if (res.body.code === 200) {
            dispatch(addUserState(user));
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        throw (error);
    });
};

export const addUserState = user => {
    return {
        type: actionTypes.ADD_USER,
        user
    };
};

export const updateUserApi = user => {
    return dispatch => userApi.update(JSON.stringify(user)).then(res => {
        if (res.body.code === 200) {
            dispatch(updateUserState(user));
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        throw (error);
    });
};

export const updateUserState = user => {
    return {
        type: actionTypes.UPDATE_USER,
        user
    };
};

export const deleteUserApi = id => {
    return dispatch => userApi.delete(id).then(res => {
        if (res.body.code === 200) {
            dispatch(deleteUserState(id));
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        throw (error);
    });
};

export const deleteUserState = id => {
    return {
        type: actionTypes.DELETE_USER,
        id
    };
};

export const loadAllUserApi = page => {
    return dispatch => userApi.getAll(page).then(res => {
        if (res.body.code === 200) {
            dispatch(loadAllUserState(res.body.data));
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        throw (error);
    });;
};

export const loadAllUserState = data => {
    return {
        type: actionTypes.LOAD_ALL_USER,
        data
    };
};

export const loginApi = (username, password) => {
    return dispatch => UserApi.login(JSON.stringify({ username, password })).then(res => {
        if (res.body.code === 200) {
            localStorage.setItem('user', JSON.stringify(res.body.data));
            dispatch(loginState(res.body.data));
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        throw (error);
    });
}

export const loginState = user => {
    return {
        type: actionTypes.LOGIN,
        user
    }
}

export const logOutState = () => {
    localStorage.setItem('user', null);
    return {
        type: actionTypes.LOGOUT
    }
}

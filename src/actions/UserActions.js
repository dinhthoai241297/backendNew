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
        type: actionTypes.ADD_SECTOR,
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
        type: actionTypes.UPDATE_SECTOR,
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
        type: actionTypes.DELETE_SECTOR,
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
        type: actionTypes.LOAD_ALL_SECTOR,
        data
    };
};

export const loadUserByUsernameApi = (username, password) => {
    return dispatch => UserApi.loadUserByUsernameApi(JSON.stringify({username, password})).then(res => {
        if (res.body.code === 200) {
            dispatch(loadUserByUsernameState(res.body.data));
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        throw(error);
    });
}

export const loadUserByUsernameState = user => {
    return {
        type: actionTypes.LOAD_ALL_USER_BY_USERNAME,
        user
    }
}

import userApi from './../api/UserApi';
import * as actionTypes from './../actionTypes/UserActionTypes';

export const addUserApi = user => {
    return (dispatch, getState) => {
            return userApi.add({
                user,
                session: getState().LoginReducer.session
            }).then(res => {
            if (res.body.code === 200) {
                dispatch(addUserState(user));
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            throw (error);
        });
    }
};

export const addUserState = user => {
    return {
        type: actionTypes.ADD_USER,
        user
    };
};

export const updateUserApi = user => {
    return (dispatch, getState)=> {
            return userApi.update({
                user,
                session: getState().LoginReducer.session
            }).then(res => {

            if (res.body.code === 200) {
                dispatch(updateUserState(user));
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            throw (error);
        });
    }
};

export const updateUserState = user => {
    return {
        type: actionTypes.UPDATE_USER,
        user
    };
};

export const deleteUserApi = id => {
    return (dispatch, getState) => {
            return userApi.delete({
                id,
                session: getState().LoginReducer.session
            }).then(res => {
            if (res.body.code === 200) {
                dispatch(deleteUserState(id));
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            throw (error);
        });
    }
};

export const deleteUserState = id => {
    return {
        type: actionTypes.DELETE_USER,
        id
    };
};

export const loadAllUserApi = page => {
    return (dispatch, getState) => {
        console.log(getState().LoginReducer.session);
        return userApi.getAll(page).then(res => {
            if (res.body.code === 200) {
                dispatch(loadAllUserState(res.body.data));
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            throw (error);
        });;
    }
};

export const loadAllUserState = data => {
    return {
        type: actionTypes.LOAD_ALL_USER,
        data
    };
};

export const loginApi = (username, password) => {
    return (dispatch,getState) => {
            return userApi.login({ 
                username, 
                password,
                session: getState().LoginReducer.session
            }).then(res => {
            console.log(res.body);
            if (res.body.code === 200) {
                localStorage.setItem('data', JSON.stringify(res.body.data));
                dispatch(loginState(res.body.data));
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            throw (error);
        });
    }
};

export const loginState = data => {
    return {
        type: actionTypes.LOGIN,
        data
    }
}

export const logoutApi = () => {
    return (dispatch, getState) => {
            return userApi.logout({ 
             session: getState().LoginReducer.session
            }).then(res => {
            console.log(res);
            if (res.body.code === 200) {
                dispatch(logoutState());
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            throw (error);
        });
    }
};

export const logoutState = () => {
    localStorage.setItem('data', null);
    return {
        type: actionTypes.LOGOUT
    }
}

export const updateStatusApi = (id, status) => {
    return (dispatch, getState) => {
            return userApi.updateStatus({ 
                id,
                status: status.id,
                session: getState().LoginReducer.session
                }).then(res => {
            if (res.body.code === 200) {
                dispatch(updateStatusState(id, status));
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            throw (error);
        });
    }
};

export const updateStatusState = (id, status) => {
    return {
        type: actionTypes.UPDATE_STATUS,
        id,
        status
    }
}
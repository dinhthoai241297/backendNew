import roleApi from './../api/RoleApi';
import * as actionTypes from './../actionTypes/RoleActionTypes';

export const addRoleApi = role => {
    return (dispatch, getState) => {
            return roleApi.add({
                role,
                session: getState().LoginReducer.session
            }).then(res => {
            console.log(res.body);
            if (res.body.code === 200) {
                dispatch(addRoleState(role));
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            throw (error);
        });
    }
};

export const addRoleState = role => {
    return {
        type: actionTypes.ADD_ROLE,
        role
    };
};

export const updateRoleApi = role => {
    return (dispatch, getState) => {
            return roleApi.update({
                role,
                session: getState().LoginReducer.session
            }.then(res => {
            if (res.body.code === 200) {
                dispatch(updateRoleState(role));
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            throw (error);
        });
    }
};

export const updateRoleState = role => {
    return {
        type: actionTypes.UPDATE_ROLE,
        role
    };
};

export const deleteRoleApi = id => {
    return (dispatch, getState) => {
            return roleApi.delete({
                id,
                session: getState().LoginReducer.session
            }).then(res => {
            if (res.body.code === 200) {
                dispatch(deleteRoleState(id));
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            throw (error);
        });
    }
};

export const deleteRoleState = id => {
    return {
        type: actionTypes.DELETE_ROLE,
        id
    };
};

export const loadAllRoleApi = page => {
    return (dispatch,getState) => {
            return roleApi.getAll({
                page,
                session: getState().LoginReducer.session
            }).then(res => {
            if (res.body.code === 200) {
                dispatch(loadAllRoleState(res.body.data));
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            throw (error);
        });;
    }
};

export const loadAllRoleState = data => {
    return {
        type: actionTypes.LOAD_ALL_ROLE,
        data
    };
};

export const updateStatusApi = (id, status) => {
    return (dispatch, getState) => {
            return roleApi.updateStatus({ 
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

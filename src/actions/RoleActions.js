import roleApi from './../api/RoleApi';
import * as actionTypes from './../actionTypes/RoleActionTypes';

export const addRoleApi = role => {
    return dispatch => roleApi.add(JSON.stringify(role)).then(res => {
        if (res.body.code === 200) {
            dispatch(addRoleState(role));
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        throw (error);
    });
};

export const addRoleState = role => {
    return {
        type: actionTypes.ADD_ROLE,
        role
    };
};

export const updateRoleApi = role => {
    return dispatch => roleApi.update(JSON.stringify(role)).then(res => {
        if (res.body.code === 200) {
            dispatch(updateRoleState(role));
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        throw (error);
    });
};

export const updateRoleState = role => {
    return {
        type: actionTypes.UPDATE_ROLE,
        role
    };
};

export const deleteRoleApi = id => {
    return dispatch => roleApi.delete(id).then(res => {
        if (res.body.code === 200) {
            dispatch(deleteRoleState(id));
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        throw (error);
    });
};

export const deleteRoleState = id => {
    return {
        type: actionTypes.DELETE_ROLE,
        id
    };
};

export const loadAllRoleApi = page => {
    return dispatch => roleApi.getAll(page).then(res => {
        if (res.body.code === 200) {
            dispatch(loadAllRoleState(res.body.data));
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        throw (error);
    });;
};

export const loadAllRoleState = data => {
    return {
        type: actionTypes.LOAD_ALL_ROLE,
        data
    };
};

import majorApi from './../api/MajorApi';
import * as actionTypes from './../actionTypes/MajorActionTypes';

export const addMajorApi = major => {
    return dispatch => majorApi.add(JSON.stringify(major)).then(res => {
        if (res.body.code === 200) {
            dispatch(addMajorState(major));
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        throw (error);
    });
};

export const addMajorState = major => {
    return {
        type: actionTypes.ADD_MAJOR,
        major
    };
};

export const updateMajorApi = major => {
    return dispatch => majorApi.update(JSON.stringify(major)).then(res => {
        if (res.body.code === 200) {
            dispatch(updateMajorState(major));
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        throw (error);
    });
};

export const updateMajorState = major => {
    return {
        type: actionTypes.UPDATE_MAJOR,
        major
    };
};

export const deleteMajorApi = id => {
    return dispatch => majorApi.delete(id).then(res => {
        if (res.body.code === 200) {
            dispatch(deleteMajorState(id));
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        throw (error);
    });
};

export const deleteMajorState = id => {
    return {
        type: actionTypes.DELETE_MAJOR,
        id
    };
};

export const loadAllMajorApi = page => {
    return dispatch => majorApi.getAll(page).then(res => {
        if (res.body.code === 200) {
            dispatch(loadAllMajorState(res.body.data));
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        throw (error);
    });
};

export const loadAllMajorState = data => {
    return {
        type: actionTypes.LOAD_ALL_MAJOR,
        data
    };
};

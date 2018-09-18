import majorApi from './../api/MajorApi';
import * as actionTypes from './../actionTypes/MajorActionTypes';

export const addMajorApi = major => {
    return dispatch => majorApi.add(JSON.stringify(major)).then(data => {
        dispatch(addMajorState(major));
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
    return dispatch => majorApi.update(JSON.stringify(major)).then(data => {
        dispatch(updateMajorState(major));
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
    return dispatch => majorApi.delete(id).then(data => {
        dispatch(deleteMajorState(id));
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
    return dispatch => majorApi.getAll(page).then(data => {
        dispatch(loadAllMajorState(data.body.data));
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

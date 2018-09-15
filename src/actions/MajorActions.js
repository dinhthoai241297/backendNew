import majorApi from './../api/MajorApi';
import * as actionTypes from './../actionTypes/MajorActionTypes';

export const addMApi = major => {
    return dispatch => majorApi.add(major).end((error, data) => {
        if (error) {
            throw (error);
        } else {
            dispatch(addMajorState(major));
        }
    });
};

export const addMajorState = major => {
    return {
        type: actionTypes.ADD_MAJOR,
        major
    };
};

export const updateMajorApi = major => {
    return dispatch => majorApi.update(major).end((error, data) => {
        if (error) {
            throw (error);
        } else {
            dispatch(updateMajorState(major));
        }
    });
};

export const updateMajorState = major => {
    return {
        type: actionTypes.UPDATE_MAJOR,
        major
    };
};

export const deleteMajorApi = id => {
    return dispatch => majorApi.delete(id).end((error, data) => {
        if (error) {
            //
            throw (error);
        } else {
            dispatch(deleteMajorState(id));
        }
    });
};

export const deleteMajorState = id => {
    return {
        type: actionTypes.DELETE_MAJOR,
        id
    };
};

export const loadAllMajorApi = page => {
    return dispatch => majorApi.getAll(page).end((error, data) => {
        if (error) {
            //
            throw (error);
        } else {
            dispatch();
        }
    });
};

export const loadAllMajorState = majors => {
    return {
        type: actionTypes.LOAD_ALL_MAJOR,
        majors
    };
};

import schoolApi from './../api/SchoolApi';
import * as actionTypes from './../actionTypes/SchoolActionTypes';

export const addSchoolApi = school => {
    return dispatch => schoolApi.add(school).end((error, data) => {
        if (error) {
            throw (error);
        } else {
            dispatch(addSchoolState(school));
        }
    });
};

export const addSchoolState = school => {
    return {
        type: actionTypes.ADD_SCHOOL,
        school
    };
};

export const updateSchoolApi = school => {
    return dispatch => schoolApi.update(school).end((error, data) => {
        if (error) {
            throw (error);
        } else {
            dispatch(updateSchoolState(school));
        }
    });
};

export const updateSchoolState = school => {
    return {
        type: actionTypes.UPDATE_SCHOOL,
        school
    };
};

export const deleteSchoolApi = id => {
    return dispatch => schoolApi.delete(id).end((error, data) => {
        if (error) {
            //
            throw (error);
        } else {
            dispatch(deleteSchoolState(id));
        }
    });
};

export const deleteSchoolState = id => {
    return {
        type: actionTypes.DELETE_SCHOOL,
        id
    };
};

export const loadAllSchoolApi = page => {
    return dispatch => schoolApi.getAll(page).end((error, data) => {
        if (error) {
            //
            throw (error);
        } else {
            dispatch(loadAllSchoolState(JSON.parse(data.text).data.list));
        }
    });
};

export const loadAllSchoolState = schools => {
    return {
        type: actionTypes.LOAD_ALL_SCHOOL,
        schools
    };
};

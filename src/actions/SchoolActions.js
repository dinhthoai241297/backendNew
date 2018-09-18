import schoolApi from './../api/SchoolApi';
import * as actionTypes from './../actionTypes/SchoolActionTypes';

export const addSchoolApi = school => {
    return dispatch => schoolApi.add(JSON.stringify(school)).then(res => {
        if (res.body.code === 200) {
            dispatch(addSchoolState(school));
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        throw (error);
    });
};

export const addSchoolState = school => {
    return {
        type: actionTypes.ADD_SCHOOL,
        school
    };
};

export const updateSchoolApi = school => {
    return dispatch => schoolApi.update(JSON.stringify(school)).then(res => {
        if (res.body.code === 200) {
            dispatch(updateSchoolState(school));
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        throw (error);
    });
};

export const updateSchoolState = school => {
    return {
        type: actionTypes.UPDATE_SCHOOL,
        school
    };
};

export const deleteSchoolApi = id => {
    return dispatch => schoolApi.delete(id).then(res => {
        if (res.body.code === 200) {
            dispatch(deleteSchoolState(id));
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        throw (error);
    });
};

export const deleteSchoolState = id => {
    return {
        type: actionTypes.DELETE_SCHOOL,
        id
    };
};

export const loadAllSchoolApi = page => {
    return dispatch => schoolApi.getAll(page).then(res => {
        if (res.body.code === 200) {
            dispatch(loadAllSchoolState(res.body.data));
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        throw (error);
    });
};

export const loadAllSchoolState = data => {
    return {
        type: actionTypes.LOAD_ALL_SCHOOL,
        data
    };
};

import subjectApi from './../api/SubjectApi';
import * as actionTypes from './../actionTypes/SubjectActionTypes';

export const addSubjectApi = subject => {
    return dispatch => subjectApi.add(subject).end((error, data) => {
        if (error) {
            throw (error);
        } else {
            dispatch(addSubjectState(subject));
        }
    });
};

export const addSubjectState = subject => {
    return {
        type: actionTypes.ADD_SUBJECT,
        subject
    };
};

export const updateSubjectApi = subject => {
    return dispatch => subjectApi.update(subject).end((error, data) => {
        if (error) {
            throw (error);
        } else {
            dispatch(updateSubjectState(subject));
        }
    });
};

export const updateSubjectState = subject => {
    return {
        type: actionTypes.UPDATE_SUBJECT,
        subject
    };
};

export const deleteSubjectApi = id => {
    return dispatch => subjectApi.delete(id).end((error, data) => {
        if (error) {
            //
            throw (error);
        } else {
            dispatch(deleteSubjectState(id));
        }
    });
};

export const deleteSubjectState = id => {
    return {
        type: actionTypes.DELETE_SUBJECT,
        id
    };
};

export const loadAllSubjectApi = page => {
    return dispatch => subjectApi.getAll(page).end((error, data) => {
        if (error) {
            //
            throw (error);
        } else {
            dispatch(loadAllSubjectState(JSON.parse(data.text).data));
        }
    });
};

export const loadAllSubjectState = data => {
    return {
        type: actionTypes.LOAD_ALL_SUBJECT,
        data
    };
};

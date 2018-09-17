import subjectApi from './../api/SubjectApi';
import * as actionTypes from './../actionTypes/SubjectActionTypes';

export const addSubjectApi = subject => {
    return dispatch => subjectApi.add(subject).end(data => {
        dispatch(addSubjectState(subject));
    }).catch(error => {
        throw (error);
    });
};

export const addSubjectState = subject => {
    return {
        type: actionTypes.ADD_SUBJECT,
        subject
    };
};

export const updateSubjectApi = subject => {
    return dispatch => subjectApi.update(subject).end(data => {
        dispatch(updateSubjectState(subject));
    }).catch(error => {
        throw (error);
    });
};

export const updateSubjectState = subject => {
    return {
        type: actionTypes.UPDATE_SUBJECT,
        subject
    };
};

export const deleteSubjectApi = id => {
    return dispatch => subjectApi.delete(id).end(data => {
        dispatch(deleteSubjectState(id));
    }).catch(error => {
        throw (error);
    });
};

export const deleteSubjectState = id => {
    return {
        type: actionTypes.DELETE_SUBJECT,
        id
    };
};

export const loadAllSubjectApi = page => {
    return dispatch => subjectApi.getAll(page).end(data => {
        dispatch(loadAllSubjectState(JSON.parse(data.text).data));
    }).catch(error => {
        throw (error);
    });
};

export const loadAllSubjectState = data => {
    return {
        type: actionTypes.LOAD_ALL_SUBJECT,
        data
    };
};

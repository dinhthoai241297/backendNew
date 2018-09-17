import subjectGroupApi from './../api/SubjectGroupApi';
import * as actionTypes from './../actionTypes/SubjectGroupActionTypes';

export const addSubjectGroupApi = subjectGroup => {
    return dispatch => subjectGroupApi.add(JSON.stringify(subjectGroup)).then(data => {
        dispatch(addSubjectGroupState(subjectGroup));
    }).catch(error => {
        throw (error);
    });
};

export const addSubjectGroupState = subjectGroup => {
    return {
        type: actionTypes.ADD_SUBJECTGROUP,
        subjectGroup
    };
};

export const updateSubjectGroupApi = subjectGroup => {
    return dispatch => subjectGroupApi.update(JSON.stringify(subjectGroup)).then(data => {
        dispatch(updateSubjectGroupState(subjectGroup));
    }).catch(error => {
        throw (error);
    });
};

export const updateSubjectGroupState = subjectGroup => {
    return {
        type: actionTypes.UPDATE_SUBJECTGROUP,
        subjectGroup
    };
};

export const deleteSubjectGroupApi = id => {
    return dispatch => subjectGroupApi.delete(id).then(data => {
        dispatch(deleteSubjectGroupState(id));
    }).catch(error => {
        throw (error);
    });
};

export const deleteSubjectGroupState = id => {
    return {
        type: actionTypes.DELETE_SUBJECTGROUP,
        id
    };
};

export const loadAllSubjectGroupApi = page => {
    return dispatch => subjectGroupApi.getall(page).then(data => {
        dispatch(loadAllSubjectGroupState(JSON.parse(data.text).data));
    }).catch(error => {
        throw (error);
    });
};

export const loadAllSubjectGroupState = data => {
    return {
        type: actionTypes.LOAD_ALL_SUBJECTGROUP,
        data
    };
};

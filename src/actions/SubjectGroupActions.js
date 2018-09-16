import subjectGroupApi from './../api/SubjectGroupApi';
import * as actionTypes from './../actionTypes/SubjectGroupActionTypes';

export const addSubjectGroupApi = subjectGroup => {
    return dispatch => subjectGroupApi.add(subjectGroup).end((error, data) => {
        if (error) {
            throw (error);
        } else {
            dispatch(addSubjectGroupState(subjectGroup));
        }
    });
};

export const addSubjectGroupState = subjectGroup => {
    return {
        type: actionTypes.ADD_SUBJECTGROUP,
        subjectGroup
    };
};

export const updateSubjectGroupApi = subjectGroup => {
    return dispatch => subjectGroupApi.update(subjectGroup).end((error, data) => {
        if (error) {
            throw (error);
        } else {
            dispatch(updateSubjectGroupState(subjectGroup));
        }
    });
};

export const updateSubjectGroupState = subjectGroup => {
    return {
        type: actionTypes.UPDATE_SUBJECTGROUP,
        subjectGroup
    };
};

export const deleteSubjectGroupApi = id => {
    return dispatch => subjectGroupApi.delete(id).end((error, data) => {
        if (error) {
            //
            throw (error);
        } else {
            dispatch(deleteSubjectGroupState(id));
        }
    });
};

export const deleteSubjectGroupState = id => {
    return {
        type: actionTypes.DELETE_SUBJECTGROUP,
        id
    };
};

export const loadAllSubjectGroupApi = page => {
    return dispatch => subjectGroupApi.getAll(page).end((error, data) => {
        if (error) {
            //
            throw (error);
        } else {
            dispatch(loadAllSubjectGroupState(JSON.parse(data.text).data));
        }
    });
};

export const loadAllSubjectGroupState = data => {
    return {
        type: actionTypes.LOAD_ALL_SUBJECTGROUP,
        data
    };
};

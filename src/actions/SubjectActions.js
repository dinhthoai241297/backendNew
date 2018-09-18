import subjectApi from './../api/SubjectApi';
import * as actionTypes from './../actionTypes/SubjectActionTypes';

export const addSubjectApi = subject => {
    return dispatch => subjectApi.add(JSON.stringify(subject)).then(res => {
        if (res.body.code === 200) {
            dispatch(addSubjectState(subject));
            return true;
        } else {
            return false;
        }
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
    return dispatch => subjectApi.update(JSON.stringify(subject)).then(res => {
        if (res.body.code === 200) {
            dispatch(updateSubjectState(subject));
            return true;
        } else {
            return false;
        }
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
    return dispatch => subjectApi.delete(id).then(res => {
        if (res.body.code === 200) {
            dispatch(deleteSubjectState(id));
            return true;
        } else {
            return false;
        }
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
    return dispatch => subjectApi.getAll(page).then(res => {
        if (res.body.code === 200) {
            dispatch(loadAllSubjectState(res.body.data));
            return true;
        } else {
            return false;
        }
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

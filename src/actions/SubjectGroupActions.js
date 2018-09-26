import subjectGroupApi from './../api/SubjectGroupApi';
import * as actionTypes from './../actionTypes/SubjectGroupActionTypes';

export const addSubjectGroupApi = subjectGroup => {
    return dispatch => subjectGroupApi.add(JSON.stringify(subjectGroup)).then(res => {
        if (res.body.code === 200) {
            dispatch(addSubjectGroupState(subjectGroup));
            return true;
        } else {
            return false;
        }
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
    return dispatch => subjectGroupApi.update(JSON.stringify(subjectGroup)).then(res => {
        if (res.body.code === 200) {
            dispatch(updateSubjectGroupState(subjectGroup));
            return true;
        } else {
            return false;
        }
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
    return dispatch => subjectGroupApi.delete(id).then(res => {
        if (res.body.code === 200) {
            dispatch(deleteSubjectGroupState(id));
            return true;
        } else {
            return false;
        }
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
    return dispatch => subjectGroupApi.getAll(page).then(res => {
        if (res.body.code === 200) {
            dispatch(loadAllSubjectGroupState(res.body.data));
            return true;
        } else {
            return false;
        }
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

export const updateStatusApi = (id, status) => {
    return dispatch => subjectGroupApi.updateStatus({ id, status: status.id }).then(res => {
        if (res.body.code === 200) {
            dispatch(updateStatusState(id, status));
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        throw (error);
    });
}

export const updateStatusState = (id, status) => {
    return {
        type: actionTypes.UPDATE_STATUS,
        id,
        status
    }
}

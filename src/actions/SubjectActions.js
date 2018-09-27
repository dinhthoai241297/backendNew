import subjectApi from './../api/SubjectApi';
import * as actionTypes from './../actionTypes/SubjectActionTypes';

export const addSubjectApi = subject => {
    return (dispatch, getState) => {
        return subjectApi.add({
            subject,
            session: getState().LoginReducer.session
        }).then(res => {
            if (res.body.code === 200) {
                dispatch(addSubjectState(subject));
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            throw (error);
        });
    }
};

export const addSubjectState = subject => {
    return {
        type: actionTypes.ADD_SUBJECT,
        subject
    };
};

export const updateSubjectApi = subject => {
    return (dispatch, getState) => {
        return subjectApi.update({
            subject,
            session: getState().LoginReducer.session
        }).then(res => {
            if (res.body.code === 200) {
                dispatch(updateSubjectState(subject));
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            throw (error);
        });
    }
};

export const updateSubjectState = subject => {
    return {
        type: actionTypes.UPDATE_SUBJECT,
        subject
    };
};

export const deleteSubjectApi = id => {
    return (dispatch, getState) => {
        return subjectApi.delete({
            id,
            session: getState().LoginReducer.session
        }).then(res => {
            if (res.body.code === 200) {
                dispatch(deleteSubjectState(id));
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            throw (error);
        });
    }
};

export const deleteSubjectState = id => {
    return {
        type: actionTypes.DELETE_SUBJECT,
        id
    };
};

export const loadAllSubjectApi = page => {
    return (dispatch, getState) => {
        return subjectApi.getAll({
            page,
            session: getState().LoginReducer.session
        }).then(res => {
            if (res.body.code === 200) {
                dispatch(loadAllSubjectState(res.body.data));
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            throw (error);
        });
    }
};

export const loadAllSubjectState = data => {
    return {
        type: actionTypes.LOAD_ALL_SUBJECT,
        data
    };
};

export const updateStatusApi = (id, status) => {
    return (dispatch, getState) => {
        return subjectApi.updateStatus({
            id,
            status: status.id,
            session: getState().LoginReducer.session
        }).then(res => {
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
};

export const updateStatusState = (id, status) => {
    return {
        type: actionTypes.UPDATE_STATUS,
        id,
        status
    }
}

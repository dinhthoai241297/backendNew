import * as actionTypes from '../actionTypes/StatusActionTypes';
import statusApi from './../api/StatusApi';

export const loadAllStatusApi = page => {
    return dispatch => statusApi.getAll(page).then(res => {
        if (res.body.code === 200) {
            dispatch(loadAllStatusState(res.body.data));
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        throw (error);
    });;
};

export const loadAllStatusState = data => {
    return {
        type: actionTypes.LOAD_ALL_STATUS,
        data
    };
};
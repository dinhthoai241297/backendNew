import * as actionTypes from './../actionTypes/StateActionTypes';
import stateApi from './../api/StateApi';

export const loadAllStateApi = page => {
    return dispatch => stateApi.getAll(page).then(res => {
        if (res.body.code === 200) {
            dispatch(loadAllStateState(res.body.data));
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        throw (error);
    });;
};

export const loadAllStateState = data => {
    return {
        type: actionTypes.LOAD_ALL_STATE,
        data
    };
};
import markApi from './../api/MarkApi';
import * as actionTypes from './../actionTypes/MarkActionTypes';

export const addMarkApi = mark => {
    return dispatch => markApi.add(JSON.stringify(mark)).then(data => {
        console.log(data);
        dispatch(addMarkState(mark));
    }).catch(error => {
        throw (error);
    });
};

export const addMarkState = mark => {
    return {
        type: actionTypes.ADD_MARK,
        mark
    };
};

export const updateMarkApi = mark => {
    return dispatch => markApi.update(JSON.stringify(mark)).then(data => {
        dispatch(updateMarkState(mark));
    }).catch(error => {
        throw (error);
    });
};

export const updateMarkState = mark => {
    return {
        type: actionTypes.UPDATE_MARK,
        mark
    };
};

export const deleteMarkApi = id => {
    return dispatch => markApi.delete(id).then(data => {
        dispatch(deleteMarkState(id));
    }).catch(error => {
        throw (error);
    });
};

export const deleteMarkState = id => {
    return {
        type: actionTypes.DELETE_MARK,
        id
    };
};

export const loadAllMarkApi = page => {
    return dispatch => markApi.getAll(page).then(data => {
        dispatch(loadAllMarkState(data.body.data));
    }).catch(error => {
        throw (error);
    });
};

export const loadAllMarkState = data => {
    return {
        type: actionTypes.LOAD_ALL_MARK,
        data
    };
};

import markApi from './../api/MarkApi';
import * as actionTypes from './../actionTypes/MarkActionTypes';

export const addMarkApi = mark => {
    return dispatch => markApi.add(JSON.stringify(mark)).then(res => {
        if (res.body.code === 200) {
            dispatch(addMarkState(mark));
            return true;
        } else {
            return false;
        }
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
    return dispatch => markApi.update(JSON.stringify(mark)).then(res => {
        if (res.body.code === 200) {
            dispatch(updateMarkState(mark));
            return true;
        } else {
            return false;
        }
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
    return dispatch => markApi.delete(id).then(res => {
        if (res.body.code === 200) {
            dispatch(deleteMarkState(id));
            return true;
        } else {
            return false;
        }
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
    return dispatch => markApi.getAll(page).then(res => {
        if (res.body.code === 200) {
            dispatch(loadAllMarkState(res.body.data));
            return true;
        } else {
            return false;
        }
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

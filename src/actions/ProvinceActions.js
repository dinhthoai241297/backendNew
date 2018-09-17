import provinceApi from './../api/ProvinceApi';
import * as actionTypes from './../actionTypes/ProvinceActionTypes';

export const addProvinceApi = province => {
    return dispatch => provinceApi.add(province).end(data => {
        dispatch(addProvinceState(province));
    }).catch(error => {
        throw (error);
    });
};

export const addProvinceState = province => {
    return {
        type: actionTypes.ADD_PROVINCE,
        province
    };
};

export const updateProvinceApi = province => {
    return dispatch => provinceApi.update(province).end(data => {
        dispatch(updateProvinceState(province));
    }).catch(error => {
        throw (error);
    });
};

export const updateProvinceState = province => {
    return {
        type: actionTypes.UPDATE_PROVINCE,
        province
    };
};

export const deleteProvinceApi = id => {
    return dispatch => provinceApi.delete(id).end(data => {
        dispatch(deleteProvinceState(id));
    }).catch(error => {
        throw (error);
    });
};

export const deleteProvinceState = id => {
    return {
        type: actionTypes.DELETE_PROVINCE,
        id
    };
};

export const loadAllProvinceApi = page => {
    return dispatch => provinceApi.getAll(page).end(data => {
        dispatch(loadAllProvinceState(JSON.parse(data.text).data));
    }).catch(error => {
        throw (error);
    });
};

export const loadAllProvinceState = data => {
    return {
        type: actionTypes.LOAD_ALL_PROVINCE,
        data
    };
};

import provinceApi from './../api/ProvinceApi';
import * as actionTypes from './../actionTypes/ProvinceActionTypes';

export const addProvinceApi = province => {
    return dispatch => provinceApi.add(province).end((error, data) => {
        if (error) {
            throw (error);
        } else {
            dispatch(addProvinceState(province));
        }
    });
};

export const addProvinceState = province => {
    return {
        type: actionTypes.ADD_PROVINCE,
        province
    };
};

export const updateProvinceApi = province => {
    return dispatch => provinceApi.update(province).end((error, data) => {
        if (error) {
            throw (error);
        } else {
            dispatch(updateProvinceState(province));
        }
    });
};

export const updateProvinceState = province => {
    return {
        type: actionTypes.UPDATE_PROVINCE,
        province
    };
};

export const deleteProvinceApi = id => {
    return dispatch => provinceApi.delete(id).end((error, data) => {
        if (error) {
            //
            throw (error);
        } else {
            dispatch(deleteProvinceState(id));
        }
    });
};

export const deleteProvinceState = id => {
    return {
        type: actionTypes.DELETE_PROVINCE,
        id
    };
};

export const loadAllProvinceApi = page => {
    return dispatch => provinceApi.getAll(page).end((error, data) => {
        if (error) {
            //
            throw (error);
        } else {
            dispatch(loadAllProvinceState(JSON.parse(data.text).data));
        }
    });
};

export const loadAllProvinceState = data => {
    return {
        type: actionTypes.LOAD_ALL_PROVINCE,
        data
    };
};

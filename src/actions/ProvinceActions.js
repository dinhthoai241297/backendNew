import provinceApi from './../api/ProvinceApi';
import * as actionTypes from './../actionTypes/ProvinceActionTypes';

export const addProvinceApi = province => {
    return dispatch => provinceApi.add(JSON.stringify(province)).then(res => {
        if (res.body.code === 200) {
            dispatch(addProvinceState(province));
            return true;
        } else {
            return false;
        }
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
    return dispatch => provinceApi.update(JSON.stringify(province)).then(res => {
        if (res.body.code === 200) {
            dispatch(updateProvinceState(province));
            return true;
        } else {
            return false;
        }
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
    return dispatch => provinceApi.delete(id).then(res => {
        if (res.body.code === 200) {
            dispatch(deleteProvinceState(id));
            return true;
        } else {
            return false;
        }
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
    return dispatch => provinceApi.getAll(page).then(res => {
        if (res.body.code === 200) {
            dispatch(loadAllProvinceState(res.body.data));
            return true;
        } else {
            return false;
        }
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

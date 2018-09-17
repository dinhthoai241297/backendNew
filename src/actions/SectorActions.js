import sectorApi from './../api/SectorApi';
import * as actionTypes from './../actionTypes/SectorActionTypes';

export const addSectorApi = sector => {
    return dispatch => sectorApi.add(JSON.stringify(sector)).then(data => {
        dispatch(addSectorState(sector));
    }).catch(error => {
        throw (error);
    });
};

export const addSectorState = sector => {
    return {
        type: actionTypes.ADD_SECTOR,
        sector
    };
};

export const updateSectorApi = sector => {
    return dispatch => sectorApi.update(JSON.stringify(sector)).then(() => {
        dispatch(updateSectorState(sector));
    }).catch(error => {
        throw (error);
    });
};

export const updateSectorState = sector => {
    return {
        type: actionTypes.UPDATE_SECTOR,
        sector
    };
};

export const deleteSectorApi = id => {
    return dispatch => sectorApi.delete(id).then(data => {
        dispatch(deleteSectorState(id));
    }).catch(error => {
        throw (error);
    });
};

export const deleteSectorState = id => {
    return {
        type: actionTypes.DELETE_SECTOR,
        id
    };
};

export const loadAllSectorApi = page => {
    return dispatch => sectorApi.getall(page).then(data => {
        dispatch(loadAllSectorState(JSON.parse(data.text).data));
    }).catch(error => {
        throw (error);
    });;
};

export const loadAllSectorState = data => {
    return {
        type: actionTypes.LOAD_ALL_SECTOR,
        data
    };
};

import sectorApi from './../api/SectorApi';
import * as actionTypes from './../actionTypes/SectorActionTypes';

export const addSectorApi = sector => {
    return dispatch => sectorApi.add(sector).end((error, data) => {
        if (error) {
            throw (error);
        } else {
            dispatch(addSectorState(sector));
        }
    });
};

export const addSectorState = sector => {
    return {
        type: actionTypes.ADD_SECTOR,
        sector
    };
};

export const updateSectorApi = sector => {
    return dispatch => sectorApi.update(sector).end((error, data) => {
        if (error) {
            throw (error);
        } else {
            dispatch(updateSectorState(sector));
        }
    });
};

export const updateSectorState = sector => {
    return {
        type: actionTypes.UPDATE_SECTOR,
        sector
    };
};

export const deleteSectorApi = id => {
    return dispatch => sectorApi.delete(id).end((error, data) => {
        if (error) {
            //
            throw (error);
        } else {
            dispatch(deleteSectorState(id));
        }
    });
};

export const deleteSectorState = id => {
    return {
        type: actionTypes.DELETE_SECTOR,
        id
    };
};

export const loadAllSectorApi = page => {
    return dispatch => sectorApi.getAll(page).end((error, data) => {
        if (error) {
            //
            throw (error);
        } else {
            dispatch(loadAllSectorState(JSON.parse(data.text).data));
        }
    });
};

export const loadAllSectorState = data => {
    return {
        type: actionTypes.LOAD_ALL_SECTOR,
        data
    };
};

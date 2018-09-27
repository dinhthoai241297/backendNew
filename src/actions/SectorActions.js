import sectorApi from './../api/SectorApi';
import * as actionTypes from './../actionTypes/SectorActionTypes';

export const addSectorApi = sector => {
    return (dispatch, getState) => {
            return sectorApi.add({
                sector,
                session: getState().LoginReducer.session
            }.then(res => {
            if (res.body.code === 200) {
                dispatch(addSectorState(sector));
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            throw (error);
        });
    }
};

export const addSectorState = sector => {
    return {
        type: actionTypes.ADD_SECTOR,
        sector
    };
};

export const updateSectorApi = sector => {
    return (dispatch, getState) => {
            return sectorApi.update({
                sector,
                session: getState().LoginReducer.session
            }).then(res => {
            if (res.body.code === 200) {
                dispatch(updateSectorState(sector));
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            throw (error);
        });
    }
};

export const updateSectorState = sector => {
    return {
        type: actionTypes.UPDATE_SECTOR,
        sector
    };
};

export const deleteSectorApi = id => {
    return (dispatch, getState) => {
            return sectorApi.delete({
                id,
                session: getState().LoginReducer.session
            }).then(res => {
            if (res.body.code === 200) {
                dispatch(deleteSectorState(id));
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            throw (error);
        });
    }
};

export const deleteSectorState = id => {
    return {
        type: actionTypes.DELETE_SECTOR,
        id
    };
};

export const loadAllSectorApi = page => {
    return (dispatch, getState) => {
            return sectorApi.getAll({
                page,
                session: getState().LoginReducer.session
            }).then(res => {
            if (res.body.code === 200) {
                dispatch(loadAllSectorState(res.body.data));
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            throw (error);
        });
    }
};

export const loadAllSectorState = data => {
    return {
        type: actionTypes.LOAD_ALL_SECTOR,
        data
    };
};

export const updateStatusApi = (id, status) => {
    return (dispatch, getState) => {
            return sectorApi.updateStatus({ 
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

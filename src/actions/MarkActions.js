import markApi from './../api/MarkApi';
import * as actionTypes from './../actionTypes/MarkActionTypes';

export const addMarkApi = mark => {
    return (dispatch, getState) =>{
            return markApi.add({
                mark,
                session: getState().LoginReducer.session
            }).then(res => {
            if (res.body.code === 200) {
                dispatch(addMarkState(mark));
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            throw (error);
        });
   }
};

export const addMarkState = mark => {
    return {
        type: actionTypes.ADD_MARK,
        mark
    };
};

export const updateMarkApi = mark => {
    return (dispatch, getState => {
            return markApi.update({
                mark,
                session: getState().LoginReducer.session
            }.then(res => {
            if (res.body.code === 200) {
                dispatch(updateMarkState(mark));
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            throw (error);
        });
    }
};

export const updateMarkState = mark => {
    return {
        type: actionTypes.UPDATE_MARK,
        mark
    };
};

export const deleteMarkApi = id => {
    return (dispatch, getState) =>{
        return  markApi.delete({
            id,
            session: getState().LoginReducer.session
        }).then(res => {
                if (res.body.code === 200) {
                    dispatch(deleteMarkState(id));
                    return true;
                } else {
                    return false;
                }
            }).catch(error => {
                throw (error);
            });
        }
};

export const deleteMarkState = id => {
    return {
        type: actionTypes.DELETE_MARK,
        id
    };
};

export const loadAllMarkApi = page => {
    return (dispatch,getState) =>{
            return markApi.getAll({
                page,
                session: getState().LoginReducer.session
            }).then(res => {
            if (res.body.code === 200) {
                dispatch(loadAllMarkState(res.body.data));
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            throw (error);
        });
    }
};

export const loadAllMarkState = data => {
    return {
        type: actionTypes.LOAD_ALL_MARK,
        data
    };
};

export const updateStatusApi = (id, status) => {
    return (dispatch,getState) =>{
        return markApi.updateStatus({
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

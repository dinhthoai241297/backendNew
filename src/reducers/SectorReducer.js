import * as actionTypes from './../actionTypes/SectorActionTypes';

let initState = [];

function findIndex(list, sector) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === sector.id) {
            return i;
        }
    }
    return -1;
}

const sectorReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_SECTOR: {
            return [...state, action.sector];
        }
        case actionTypes.UPDATE_SECTOR: {
            let index = findIndex(state, action.sector);
            if (index > 0) {
                state[index] = action.sector;
            }
            return [...state];
        }
        case actionTypes.DELETE_SECTOR: {
            let index = findIndex(state, action.sector);
            if (index > 0) {
                state.splice(index, 1);
            }
            return [...state];
        }
        case actionTypes.LOAD_ALL_SECTOR: {
            return [...action.sectors];
        }
        default: {
            return state;
        }
    }
};

export default sectorReducer;
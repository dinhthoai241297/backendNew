import * as actionTypes from './../actionTypes/SectorActionTypes';

let initState = {
    sectors: [],
    next: false
}

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
            state.sectors.push(action.sector);
            return {...state};
        }
        case actionTypes.UPDATE_SECTOR: {
            let index = findIndex(state.sectors, action.sector);
            if (index > 0) {
                state.sectors[index] = action.sector;
            }
            return {...state};
        }
        case actionTypes.DELETE_SECTOR: {
            let index = findIndex(state.sectors, action.sector);
            if (index > 0) {
                state.sectors.splice(index, 1);
            }
            return {...state};
        }
        case actionTypes.LOAD_ALL_SECTOR: {
            return {
                sectors: action.data.list,
                next: action.data.next
            };
        }
        default: {
            return state;
        }
    }
};

export default sectorReducer;
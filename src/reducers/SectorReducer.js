import * as actionTypes from './../actionTypes/SectorActionTypes';

let initState = {
    sectors: [],
    next: false
}

function findIndex(list, id) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
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
            let index = findIndex(state.sectors, action.sector.id);
            if (index > 0) {
                state.sectors[index] = action.sector;
            }
            return {...state};
        }
        case actionTypes.DELETE_SECTOR: {
            let index = findIndex(state.sectors, action.id);
            console.log(index, action.id);
            if (index > 0) {
                state.sectors.splice(index, 1);
            }
            return {...state};
        }
        case actionTypes.LOAD_ALL_SECTOR: {
            return {...action.data};
        }
        default: {
            return state;
        }
    }
};

export default sectorReducer;
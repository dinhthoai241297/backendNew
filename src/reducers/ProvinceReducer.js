import * as actionTypes from "./../actionTypes/ProvinceActionTypes";

let initState = [];

function findIndex(list, province) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === province.id) {
            return i;
        }
    }
    return -1;
}

const provinceReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PROVINCE: {
            return [...state, action.province];
        }
        case actionTypes.UPDATE_PROVINCE: {
            let index = findIndex(state, action.province);
            if (index > 0) {
                state[index] = action.province;
            }
            return [...state];
        }
        case actionTypes.DELETE_PROVINCE: {
            let index = findIndex(state, action.province);
            if (index > 0) {
                state.splice(index, 1);
            }
            return [...state];
        }
        case actionTypes.LOAD_ALL_PROVINCE: {
            return [...action.provinces];
        }
        default: {
            return state;
        }
    }
};

export default provinceReducer;
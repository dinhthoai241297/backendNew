import * as actionTypes from "./../actionTypes/MajorActionTypes";

let initState = [];

function findIndex(list, major) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === major.id) {
            return i;
        }
    }
    return -1;
}

const majorReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_MAJOR: {
            return [...state, action.major];
        }
        case actionTypes.UPDATE_MAJOR: {
            let index = findIndex(state, action.major);
            if (index > 0) {
                state[index] = action.major;
            }
            return [...state];
        }
        case actionTypes.DELETE_MAJOR: {
            let index = findIndex(state, action.major);
            if (index > 0) {
                state.splice(index, 1);
            }
            return [...state];
        }
        case actionTypes.LOAD_ALL_MAJOR: {
            return [...action.majors];
        }
        default: {
            return state;
        }
    }
};

export default majorReducer;
import * as actionTypes from "./../actionTypes/MarkActionTypes";

let initState = [];

function findIndex(list, mark) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === mark.id) {
            return i;
        }
    }
    return -1;
}

const markReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_MARK: {
            return [...state, action.mark];
        }
        case actionTypes.UPDATE_MARK: {
            let index = findIndex(state, action.mark);
            if (index > 0) {
                state[index] = action.mark;
            }
            return [...state];
        }
        case actionTypes.DELETE_MARK: {
            let index = findIndex(state, action.mark);
            if (index > 0) {
                state.splice(index, 1);
            }
            return [...state];
        }
        case actionTypes.LOAD_ALL_MARK: {
            return [...action.marks];
        }
        default: {
            return state;
        }
    }
};

export default markReducer;
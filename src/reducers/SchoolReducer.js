import * as actionTypes from './../actionTypes/SchoolActionTypes';

let initState = [];

function findIndex(list, school) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === school.id) {
            return i;
        }
    }
    return -1;
}

const schoolReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_SCHOOL: {
            return [...state, action.school];
        }
        case actionTypes.UPDATE_SCHOOL: {
            let index = findIndex(state, action.school);
            if (index > 0) {
                state[index] = action.school;
            }
            return [...state];
        }
        case actionTypes.DELETE_SCHOOL: {
            let index = findIndex(state, action.school);
            if (index > 0) {
                state.splice(index, 1);
            }
            return [...state];
        }
        case actionTypes.LOAD_ALL_SCHOOL: {
            return [...action.schools];
        }
        default: {
            return state;
        }
    }
};

export default schoolReducer;
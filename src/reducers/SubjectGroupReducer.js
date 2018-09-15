import * as actionTypes from './../actionTypes/SubjectGroupActionTypes';

let initState = [];

function findIndex(list, subjectGroup) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === subjectGroup.id) {
            return i;
        }
    }
    return -1;
}

const subjectGroupReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_SUBJECTGROUP: {
            return [...state, action.subjectGroup];
        }
        case actionTypes.UPDATE_SUBJECTGROUP: {
            let index = findIndex(state, action.subjectGroup);
            if (index > 0) {
                state[index] = action.subjectGroup;
            }
            return [...state];
        }
        case actionTypes.DELETE_SUBJECTGROUP: {
            let index = findIndex(state, action.subjectGroup);
            if (index > 0) {
                state.splice(index, 1);
            }
            return [...state];
        }
        case actionTypes.LOAD_ALL_SUBJECTGROUP: {
            return [...action.subjectGroups];
        }
        default: {
            return state;
        }
    }
};

export default subjectGroupReducer;
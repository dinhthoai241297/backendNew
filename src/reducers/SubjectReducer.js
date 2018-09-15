import * as actionTypes from './../actionTypes/SubjectActionTypes';

let initState = [];

function findIndex(list, subject) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === subject.id) {
            return i;
        }
    }
    return -1;
}

const subjectReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_SUBJECT: {
            return [...state, action.subject];
        }
        case actionTypes.UPDATE_SUBJECT: {
            let index = findIndex(state, action.subject);
            if (index > 0) {
                state[index] = action.subject;
            }
            return [...state];
        }
        case actionTypes.DELETE_SUBJECT: {
            let index = findIndex(state, action.subject);
            if (index > 0) {
                state.splice(index, 1);
            }
            return [...state];
        }
        case actionTypes.LOAD_ALL_SUBJECT: {
            return [...action.subjects];
        }
        default: {
            return state;
        }
    }
};

export default subjectReducer;
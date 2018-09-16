import * as actionTypes from './../actionTypes/SchoolActionTypes';

let initState = {
    schools: [],
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

const schoolReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_SCHOOL: {
            state.schools.push(action.school);
            return {...state};
        }
        case actionTypes.UPDATE_SCHOOL: {
            let index = findIndex(state.schools, action.school.id);
            if (index > 0) {
                state.schools[index] = action.school;
            }
            return {...state};
        }
        case actionTypes.DELETE_SCHOOL: {
            let index = findIndex(state.schools, action.id);
            if (index > 0) {
                state.schools.splice(index, 1);
            }
            return {...state};
        }
        case actionTypes.LOAD_ALL_SCHOOL: {
            return {...action.data};
        }
        default: {
            return state;
        }
    }
};

export default schoolReducer;
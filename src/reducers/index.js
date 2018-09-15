import { combineReducers } from 'redux';
import SectorReducer from './SectorReducer';
// import MajorReducer from './MajorReducer';
// import MarkReducer from './MarkReducer';
// import ProvinceReducer from './ProvinceReducer';
import SchoolReducer from './SchoolReducer';
import SubjectReducer from './SubjectReducer';
import SubjectGroupReducer from './SubjectGroupReducer';

const root = combineReducers({
    SectorReducer,
    SchoolReducer,
    SubjectReducer,
    SubjectGroupReducer
});

export default root;

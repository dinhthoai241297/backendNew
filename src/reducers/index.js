import { combineReducers } from 'redux';
import SectorReducer from './SectorReducer';
import MajorReducer from './MajorReducer';
import MarkReducer from './MarkReducer';
import ProvinceReducer from './ProvinceReducer';
import SchoolReducer from './SchoolReducer';
import SubjectReducer from './SubjectReducer';
import SubjectGroupReducer from './SubjectGroupReducer';
import RoleReducer from './RoleReducer';



const root = combineReducers({
    SectorReducer,
    SchoolReducer,
    SubjectReducer,
    SubjectGroupReducer,
    MajorReducer,
    MarkReducer,
    ProvinceReducer,
    RoleReducer  

 
});

export default root;

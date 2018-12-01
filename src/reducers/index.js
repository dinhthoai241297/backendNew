import { combineReducers } from 'redux';
import SectorReducer from './SectorReducer';
import MajorReducer from './MajorReducer';
import MarkReducer from './MarkReducer';
import ProvinceReducer from './ProvinceReducer';
import SchoolReducer from './SchoolReducer';
import SubjectReducer from './SubjectReducer';
import SubjectGroupReducer from './SubjectGroupReducer';
import RoleReducer from './RoleReducer';
import UserReducer from './UserReducer';
import LoginReducer from './LoginReducer';
import StatusReducer from './StatusReducer';
import DifReducer from './DifReducer';
import NewReducer from './NewReducer';

const root = combineReducers({
    SectorReducer,
    SchoolReducer,
    SubjectReducer,
    SubjectGroupReducer,
    MajorReducer,
    MarkReducer,
    ProvinceReducer,
    RoleReducer,
    UserReducer,
    LoginReducer,
    StatusReducer,
    DifReducer,
    NewReducer
});

export default root;

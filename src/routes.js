import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import DashBoard from './components/dashBoard/DashBoard';
import Sector from './components/sector/Sector';
import EditSector from './components/sector/EditSector';
import Province from './components/province/Province';
import EditProvince from './components/province/EditProvince';
import School from './components/school/School';
import EditSchool from './components/school/EditSchool';
import Mark from './components/mark/Mark';
import EditMark from './components/mark/EditMark';
import Major from './components/major/Major';
import EditMajor from './components/major/EditMajor';
import Subject from './components/subject/Subject';
import EditSubject from './components/subject/EditSubject';
import SubjectGroup from './components/subjectGroup/SubjectGroup';
import EditSubjectGroup from './components/subjectGroup/EditSubjectGroup';
import User from './components/user/User';
import EditUser from './components/user/EditUser';
// import Role from './components/role/Role';
// import EditRole from './components/role/EditRole';



import Test from './components/test/Test';

export default (
    <App>
        <Switch>
            <Route path="/" exact component={DashBoard} />

            <Route path="/sector/list" component={Sector} />
            <Route do="update" path="/sector/update/:id" exact component={EditSector} />
            <Route do="add" path="/sector/add" exact component={EditSector} />

            <Route path="/mark/list" component={Mark} />
            <Route do="update" path="/mark/update/:id" exact render={props => <EditMark do="update" {...props} />} />
            <Route do="add" path="/mark/add" exact render={props => <EditMark do="add" {...props} />} />

            <Route path="/school/list" component={School} />
            <Route path="/school/update/:id" exact render={props => <EditSchool do="update" {...props} />} />
            <Route path="/school/add" exact render={props => <EditSchool do="add" {...props} />} />

            <Route path="/province/list" component={Province} />
            <Route path="/province/update/:id" exact render={props => <EditProvince do="update" {...props} />} />
            <Route path="/province/add" exact render={props => <EditProvince do="add" {...props} />} />

            <Route path="/major/list" component={Major} />
            <Route path="/major/update/:id" exact render={props => <EditMajor do="update" {...props} />} />
            <Route path="/major/add" exact render={props => <EditMajor do="add" {...props} />} />

            <Route path="/subject/list" component={Subject} />
            <Route path="/subject/update/:id" exact component={EditSubject} />
            <Route path="/subject/add" exact component={EditSubject} />

            <Route path="/subjectGroup/list" component={SubjectGroup} />
            <Route path="/subjectGroup/update/:id" exact render={props => <EditSubjectGroup do="update" {...props} />} />
            <Route path="/subjectGroup/add" exact render={props => <EditSubjectGroup do="add" {...props} />} />
            //Role 
            // <Route path="/role/list" component={Subject} />
            // <Route path="/role/update/:id" exact render={props => <EditSubject do="update" {...props} />} />
            // <Route path="/role/add" exact render={props => <EditSubject do="add" {...props} />} />
          
            <Route path="/user/list" component={User} />
            <Route path="/user/update/:id" exact render={props => <EditUser do="update" {...props} />} />
            <Route path="/user/add" exact render={props => <EditUser do="add" {...props} />} />



            <Route path="/test" render={props => <Test {...props} test='abcd' />} />
        </Switch>
    </App>
);

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
import Test from './components/test/Test';

export default (
    <App>
        <Switch>
            <Route path="/" exact component={DashBoard} />

            <Route path="/sector/list" component={Sector} />
            <Route do="update" path="/sector/update/:id" exact component={EditSector} />
            <Route do="add" path="/sector/add" exact component={EditSector} />

            <Route path="/mark/list" component={Mark} />
            <Route do="update" path="/mark/update/:id" exact component={EditMark} />
            <Route do="add" path="/mark/add" exact component={EditMark} />

            <Route path="/school/list" component={School} />
            <Route do="update" path="/school/update/:id" exact component={EditSchool} />
            <Route do="add" path="/school/add" exact component={EditSchool} />

            <Route path="/province/list" component={Province} />
            <Route do="update" path="/province/update/:id" exact component={EditProvince} />
            <Route do="add" path="/province/add" exact component={EditProvince} />

            <Route path="/major/list" component={Major} />
            <Route do="update" path="/major/update/:id" exact component={EditMajor} />
            <Route do="add" path="/major/add" exact component={EditMajor} />

            <Route path="/subject/list" component={Subject} />
            <Route do="update" path="/subject/update/:id" exact component={EditSubject} />
            <Route do="add" path="/subject/add" exact component={EditSubject} />

            <Route path="/subjectGroup/list" component={SubjectGroup} />
            <Route do="update" path="/subjectGroup/update/:id" exact component={EditSubjectGroup} />
            <Route do="add" path="/subjectGroup/add" exact component={EditSubjectGroup} />

            <Route path="/test" render={props => <Test {...props} test='abcd' />} />
        </Switch>
    </App>
);

import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
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
import { connect } from 'react-redux';
import Permission from './components/permission/Permission';
import Login from './components/login/Login';

import * as roles from './contants/roles';

class MyRoute extends Component {

    validateRole = (roles, role) => {
        for (let i = 0; i < roles.length; i++) {
            if (role === roles[i]) {
                return true
            }
        }
        return false;
    }

    render() {
        let { user } = this.props;
        let logged = user.username !== '' && user.password !== '';
        return (
            <Router>
                <Switch>
                    <Route path="/login" exact render={() => (logged ? <Redirect to="/" /> : <Login />)} />
                    <App>
                        {!logged ? <Redirect to="/login" /> : null}
                        <Switch>
                            <Route path="/" exact component={DashBoard} />

                            <Route path="/sector/list" render={() => (this.validateRole(user.roles, roles.VIEW) ? <Sector /> : <Permission />)} />
                            <Route path="/sector/update/:id" exact render={(props) => (this.validateRole(user.roles, roles.UPDATE) ? <EditSector {...props} do='update' /> : <Permission />)} />
                            <Route path="/sector/add" exact render={(props) => (this.validateRole(user.roles, roles.ADD) ? <EditSector {...props} do='add' /> : <Permission />)} />

                            <Route path="/mark/list" render={() => (this.validateRole(user.roles, roles.VIEW) ? <Mark /> : <Permission />)} />
                            <Route path="/mark/update/:id" exact render={(props) => (this.validateRole(user.roles, roles.UPDATE) ? <EditMark {...props} do='update' /> : <Permission />)} />
                            <Route path="/mark/add" exact render={(props) => (this.validateRole(user.roles, roles.ADD) ? <EditMark {...props} do='add' /> : <Permission />)} />

                            <Route path="/school/list" render={() => (this.validateRole(user.roles, roles.VIEW) ? <School /> : <Permission />)} />
                            <Route path="/school/update/:id" exact render={(props) => (this.validateRole(user.roles, roles.UPDATE) ? <EditSchool {...props} do='update' /> : <Permission />)} />
                            <Route path="/school/add" exact render={(props) => (this.validateRole(user.roles, roles.ADD) ? <EditSchool {...props} do='add' /> : <Permission />)} />

                            <Route path="/province/list" render={() => (this.validateRole(user.roles, roles.VIEW) ? <Province /> : <Permission />)} />
                            <Route path="/province/update/:id" exact render={(props) => (this.validateRole(user.roles, roles.UPDATE) ? <EditProvince {...props} do='update' /> : <Permission />)} />
                            <Route path="/province/add" exact render={(props) => (this.validateRole(user.roles, roles.ADD) ? <EditProvince {...props} do='add' /> : <Permission />)} />

                            <Route path="/major/list" render={() => (this.validateRole(user.roles, roles.VIEW) ? <Major /> : <Permission />)} />
                            <Route path="/major/update/:id" exact render={(props) => (this.validateRole(user.roles, roles.UPDATE) ? <EditMajor {...props} do='update' /> : <Permission />)} />
                            <Route path="/major/add" exact render={(props) => (this.validateRole(user.roles, roles.ADD) ? <EditMajor {...props} do='add' /> : <Permission />)} />

                            <Route path="/subject/list" render={() => (this.validateRole(user.roles, roles.VIEW) ? <Subject /> : <Permission />)} />
                            <Route path="/subject/update/:id" exact render={(props) => (this.validateRole(user.roles, roles.UPDATE) ? <EditSubject {...props} do='update' /> : <Permission />)} />
                            <Route path="/subject/add" exact render={(props) => (this.validateRole(user.roles, roles.ADD) ? <EditSubject {...props} do='add' /> : <Permission />)} />

                            <Route path="/subjectGroup/list" render={() => (this.validateRole(user.roles, roles.VIEW) ? <SubjectGroup /> : <Permission />)} />
                            <Route path="/subjectGroup/update/:id" exact render={(props) => (this.validateRole(user.roles, roles.UPDATE) ? <EditSubjectGroup {...props} do='update' /> : <Permission />)} />
                            <Route path="/subjectGroup/add" exact render={(props) => (this.validateRole(user.roles, roles.ADD) ? <EditSubjectGroup {...props} do='add' /> : <Permission />)} />

                            <Route path="/test" render={props => <Test {...props} test='abcd' />} />
                        </Switch>
                    </App>
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = state => {
    let simulator = {
        username: '',
        password: 'admin',
        email: 'admin@gmail.com',
        fullName: 'administrator',
        roles: [1, 2, 3, 4, 5]
    }
    return {
        user: simulator
    }
}

export default connect(mapStateToProps)(MyRoute);
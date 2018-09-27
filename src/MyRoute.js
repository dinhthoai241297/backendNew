import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import App from './App';
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
import Role from './components/role/Role';
import EditRole from './components/role/EditRole';
import User from './components/user/User';
import EditUser from './components/user/EditUser';
import Test from './components/test/Test';
import { connect } from 'react-redux';
import Permission from './components/permission/Permission';
import Login from './components/login/Login';
import * as roles from './contants/roles';
import * as actions from './actions/UserActions';
import * as actionsStatus from './actions/StatusActions';
import StatusApi from './api/StatusApi';

class MyRoute extends Component {

    constructor(props) {
        super(props);
        let data = JSON.parse(localStorage.getItem('data'));
        if (data) {
            this.props.loginState(data);
            this.state = {
                user: data.user,
                session: data.session
            }
        } else {
            this.state = {
                user: '',
                session: ''
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        let { user, session } = nextProps.data;
        this.setState({
            user, session
        });
    }

    async componentDidMount() {
        let next = true, tmp, list = [], page = 1;
        while (next) {
            next = false;
            tmp = await StatusApi.getAll({
                page: page++,
                session: this.state.session
            });
            if (tmp.body.code === 200) {
                list = list.concat(tmp.body.data.list);
                next = tmp.body.data.next;
            }
        }
        this.props.loadStatus({ list, next });
    }


    validateRole = (roles, role) => {
        for (let i = 0; i < roles.length; i++) {
            if (role === roles[i]) {
                return true
            }
        }
        return false;
    }

    render() {
        let { user } = this.state;
        let logged = (user && user.username !== '' && user.password !== '') ? true : false;
        return (
            <Router>
                <Switch>
                    <Route path="/login" exact render={() => (logged ? (<Redirect to="/sector/list" />) : (<Login />))} />
                    <Route render={(props) => (!logged ? (<Redirect to="/login" />) : (
                        <App {...props} user={user}>
                            <Switch>
                                <Route path="/" exact render={() => (<Redirect to="/sector/list" />)} />

                                <Route path="/sector/list" render={() => (this.validateRole(user.role, roles.VIEW) ? <Sector /> : <Permission />)} />
                                <Route path="/sector/update/:id" exact render={(props) => (this.validateRole(user.role, roles.UPDATE) ? <EditSector {...props} do='update' /> : <Permission />)} />
                                <Route path="/sector/add" exact render={(props) => (this.validateRole(user.role, roles.ADD) ? <EditSector {...props} do='add' /> : <Permission />)} />

                                <Route path="/mark/list" render={() => (this.validateRole(user.role, roles.VIEW) ? <Mark /> : <Permission />)} />
                                <Route path="/mark/update/:id" exact render={(props) => (this.validateRole(user.role, roles.UPDATE) ? <EditMark {...props} do='update' /> : <Permission />)} />
                                <Route path="/mark/add" exact render={(props) => (this.validateRole(user.role, roles.ADD) ? <EditMark {...props} do='add' /> : <Permission />)} />

                                <Route path="/school/list" render={() => (this.validateRole(user.role, roles.VIEW) ? <School /> : <Permission />)} />
                                <Route path="/school/update/:id" exact render={(props) => (this.validateRole(user.role, roles.UPDATE) ? <EditSchool {...props} do='update' /> : <Permission />)} />
                                <Route path="/school/add" exact render={(props) => (this.validateRole(user.role, roles.ADD) ? <EditSchool {...props} do='add' /> : <Permission />)} />

                                <Route path="/province/list" render={() => (this.validateRole(user.role, roles.VIEW) ? <Province /> : <Permission />)} />
                                <Route path="/province/update/:id" exact render={(props) => (this.validateRole(user.role, roles.UPDATE) ? <EditProvince {...props} do='update' /> : <Permission />)} />
                                <Route path="/province/add" exact render={(props) => (this.validateRole(user.role, roles.ADD) ? <EditProvince {...props} do='add' /> : <Permission />)} />

                                <Route path="/major/list" render={() => (this.validateRole(user.role, roles.VIEW) ? <Major /> : <Permission />)} />
                                <Route path="/major/update/:id" exact render={(props) => (this.validateRole(user.role, roles.UPDATE) ? <EditMajor {...props} do='update' /> : <Permission />)} />
                                <Route path="/major/add" exact render={(props) => (this.validateRole(user.role, roles.ADD) ? <EditMajor {...props} do='add' /> : <Permission />)} />

                                <Route path="/subject/list" render={() => (this.validateRole(user.role, roles.VIEW) ? <Subject /> : <Permission />)} />
                                <Route path="/subject/update/:id" exact render={(props) => (this.validateRole(user.role, roles.UPDATE) ? <EditSubject {...props} do='update' /> : <Permission />)} />
                                <Route path="/subject/add" exact render={(props) => (this.validateRole(user.role, roles.ADD) ? <EditSubject {...props} do='add' /> : <Permission />)} />

                                <Route path="/subjectGroup/list" render={() => (this.validateRole(user.role, roles.VIEW) ? <SubjectGroup /> : <Permission />)} />
                                <Route path="/subjectGroup/update/:id" exact render={(props) => (this.validateRole(user.role, roles.UPDATE) ? <EditSubjectGroup {...props} do='update' /> : <Permission />)} />
                                <Route path="/subjectGroup/add" exact render={(props) => (this.validateRole(user.role, roles.ADD) ? <EditSubjectGroup {...props} do='add' /> : <Permission />)} />

                                <Route path="/role/list" render={() => (this.validateRole(user.role, roles.ROOT) ? <Role /> : <Permission />)} />
                                <Route path="/role/update/:id" exact render={(props) => (this.validateRole(user.role, roles.ROOT) ? <EditRole {...props} do='update' /> : <Permission />)} />
                                <Route path="/role/add" exact render={(props) => (this.validateRole(user.role, roles.ROOT) ? <EditRole {...props} do='add' /> : <Permission />)} />

                                <Route path="/user/list" render={() => (this.validateRole(user.role, roles.ROOT) ? <User /> : <Permission />)} />
                                <Route path="/user/update/:id" exact render={(props) => (this.validateRole(user.role, roles.ROOT) ? <EditUser {...props} do='update' /> : <Permission />)} />
                                <Route path="/user/add" exact render={(props) => (this.validateRole(user.role, roles.ROOT) ? <EditUser {...props} do='add' /> : <Permission />)} />

                                <Route path="/test" render={props => <Test {...props} test='abcd' />} />
                            </Switch>
                        </App>
                    ))} />
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.LoginReducer
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loginState: (data) => dispatch(actions.loginState(data)),
        loadStatus: (data) => dispatch(actionsStatus.loadAllStatusState(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRoute);
import React, { Component, Fragment } from 'react';
import UserItem from './UserItem';
import { connect } from 'react-redux';
import * as actions from './../../actions/UserActions';
import toastr from 'toastr';
import { toastrOption, selectStyle } from './../../custom/Custom';
import * as status from './../../contants/status';
import Select from 'react-select';
import RoleApi from './../../api/RoleApi';

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            next: false,
            users: [],
            statusSelectedOption: null,
            statusOptions: [],
            statusFilter: undefined,
            roleSelectedOption: null,
            roleOptions: [],
            roleFilter: undefined
        }
        toastr.options = toastrOption;
    }

    componentDidMount() {
        let { page } = this.state;
        this.initStatusFilter(this.props);
        this.loadRoleOption();
        this.loadUsers(page);
    }

    componentWillReceiveProps(nextProps) {
        let { users, next } = nextProps.data;
        this.setState({
            users,
            next
        });
        if (this.props.status !== nextProps.status) {
            this.initStatusFilter(nextProps);
        }
    }

    initStatusFilter = (props) => {
        if (props.status.length !== 0) {
            let statusOptions = props.status.map(el => ({ value: el.id, label: el.name }));
            let statusSelectedOption = statusOptions.find(el => (el.value === props.status.find(ell => ell.status === status.ACTIVE).id));
            let statusFilter = statusSelectedOption.value;
            this.setState({
                statusOptions,
                statusSelectedOption,
                statusFilter
            });
        }
    }

    loadRoleOption = async () => {
        // get all sector in database
        let next = true, rs = [], tmp, page = 1;
        while (next) {
            tmp = await RoleApi.getAll({
                page: page++,
                session: this.props.session
            });
            rs = rs.concat(tmp.body.data.list);
            next = tmp.body.data.next;
        }
        let roleOptions = rs.map(el => ({ value: el.id, label: el.name }))
        let roleSelectedOption = (roleOptions && roleOptions.length !== 0) ? roleOptions[0] : '';
        this.setState({
            roleOptions,
            roleSelectedOption: roleSelectedOption,
            roleFilter: roleSelectedOption ? roleSelectedOption.value : ''
        });
    }

    newPage = (e, num) => {
        e.preventDefault();
        let { page, next } = this.state;
        page += num;
        if (page === 0 || (!next && num > 0)) {
            return;
        } else {
            this.setState({
                page
            });
            this.props.loadUsers(page, this.state.statusFilter);
        }
    }

    genListUser = () => {
        let { users } = this.state;
        let rs = null;
        if (users) {
            rs = users.map((user, index) => {
                return (
                    <UserItem
                        key={index}
                        user={user}
                        updateStatus={this.updateStatus}
                    />
                );
            });
        }
        return rs;
    }

    updateStatus = (id, status) => {
        let st = this.props.status.find(el => el.status === status);
        if (confirm('Bạn có chắc muốn ' + st.name)) {
            if (st) {
                this.props.updateStatus(id, st);
            }
        }
    }

    // sự kiện select status
    handleChangeStatus = (statusSelectedOption) => {
        this.setState({ statusSelectedOption, statusFilter: statusSelectedOption.value, page: 1 });
        this.loadUsers(1);
    }

    handleChangeRole = (roleSelectedOption) => {
        this.setState({ roleSelectedOption });
        this.loadUsers(1);
    }

    loadUsers = (page) => {
        let { statusFilter, roleFilter } = this.state;
        this.props.loadUsers(page, statusFilter, roleFilter);
        this.setState({ page });
    }

    render() {
        return (
            <Fragment>
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Trang Quản Lý Người dùng
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> User</a></li>
                        <li className="active">List</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <div className="col-xs-12 col-lg-4 lh-35">
                                        <h3 className="box-title">Danh sách người dùng</h3>
                                    </div>
                                    <div className="col-xs-12 col-lg-8">
                                        <div className="row">
                                            <div className="col-xs-12 col-lg-offset-4 col-lg-4">
                                                <div className="form-group">
                                                    <Select
                                                        styles={selectStyle}
                                                        isSearchable={false}
                                                        onChange={this.handleChangeRole}
                                                        options={this.state.roleOptions}
                                                        value={this.state.roleSelectedOption}
                                                        placeholder="Quyền"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-lg-4">
                                                <div className="form-group">
                                                    <Select
                                                        isSearchable={false}
                                                        styles={selectStyle}
                                                        onChange={this.handleChangeStatus}
                                                        options={this.state.statusOptions}
                                                        value={this.state.statusSelectedOption}
                                                        placeholder="Trạng thái"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- /.box-header --> */}
                                <div className="box-body table-responsive no-padding">
                                    <table className="table table-hover">
                                        <tbody>
                                            <tr>
                                                <th>Tài khoản</th>
                                                <th>Tên</th>
                                                <th>Quyền</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                            {this.genListUser()}
                                        </tbody>
                                    </table>
                                </div>
                                {/* <!-- /.box-body --> */}
                                <div className="box-footer clearfix">
                                    <ul className="pagination pagination-md no-margin pull-right">
                                        <li className={this.state.page === 1 ? 'disabled' : ''}>
                                            <a href="#" onClick={(e) => this.newPage(e, -1)}>Pre</a>
                                        </li>
                                        <li className="active">
                                            <a>{this.state.page}</a>
                                        </li>
                                        <li className={this.state.next ? '' : 'disabled'}>
                                            <a href="#" onClick={(e) => this.newPage(e, 1)} >Next</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* <!-- /.box --> */}
                        </div>
                    </div>
                </section>
                {/* /.content */}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.UserReducer,
        status: state.StatusReducer.status,
        session: state.LoginReducer.session
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadUsers: (page, status, role, date) => dispatch(actions.loadAllUserApi(page, status, role, date)),
        updateStatus: (id, status) => dispatch(actions.updateStatusApi(id, status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
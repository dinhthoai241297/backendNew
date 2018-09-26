import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import Select from 'react-select';
import * as userAction from './../../actions/UserActions';
import UserApi from './../../api/UserApi';
import RoleApi from './../../api/RoleApi';
import StatusApi from '../../api/StatusApi';
import { selectStyle, toastrOption } from './../../custom/Custom';

class EditUser extends Component {

    constructor(props) {
        super(props);

        this.init = {
            user: {
                id: undefined,
                username: '',
                password: '',
                email: '',
                fullName: '',
                role: '',
                status: 1
            },
            isProcess: false,
            roleSelectedOption: null,
            statusSelectedOption: null
        }

        this.state = {
            isUpdate: false,
            roleOptions: [],
            statusOptions: [],
            ...this.init
        }

        toastr.options = toastrOption;
    }

    componentDidMount() {
        this.updateAction(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateAction(nextProps);
    }

    loadStatusOption = async () => {
        // lấy tất cả status trong db
        let next = true, rs = [], tmp, page = 1;
        while (next) {
            tmp = await StatusApi.getAll(page++);
            rs = rs.concat(tmp.body.data.list);
            next = tmp.body.data.next;
        }
        this.setState({
            statusOptions: rs.map(el => ({ value: el.id, label: el.name }))
        });
    }

    loadRoleOption = async () => {
        // lấy tất cả status trong db
        let next = true, rs = [], tmp, page = 1;
        while (next) {
            tmp = await RoleApi.getAll(page++);
            rs = rs.concat(tmp.body.data.list);
            next = tmp.body.data.next;
        }
        this.setState({
            roleOptions: rs.map(el => ({ value: el.id, label: el.name }))
        });
    }

    updateAction = async (props) => {
        let isUpdate = props.do === 'update' ? true : false;
        this.setState({ isUpdate });
        await this.loadRoleOption();
        await this.loadStatusOption();
        if (isUpdate) {
            UserApi.getOne(props.match.params.id).then(res => {
                let user = res.body.data;
                if (user) {
                    this.setState({
                        roleSelectedOption: this.state.roleOptions.filter(el => el.value === user.role),
                        statusSelectedOption: this.state.statusOptions.filter(el => el.value === user.status),
                        user
                    });
                }
            }).catch(error => {
                throw (error);
            });
        } else {
            this.renewForm();
        }
    }

    renewForm = () => {
        this.setState(preState => ({ ...preState, ...this.init }));
    }

    handleChangeInput = (e) => {
        let { name, value } = e.target;
        this.setState(preState => ({
            ...preState,
            user: {
                ...preState.user,
                [name]: value
            }
        }));
    }

    handleSave = (e) => {
        e.preventDefault();
        this.setState({
            isProcess: true
        });
        let { user } = this.state;
        if (user.id) {
            this.props.updateUser(user).then(res => {
                if (res) {
                    toastr.success('Updated!');
                } else {
                    toastr.error('Error!');
                }
                this.setState({
                    isProcess: false
                });
            });
        } else {
            this.props.addUser(user).then(res => {
                if (res) {
                    toastr.success('Added!');
                } else {
                    toastr.error('Error!');
                }
                this.setState({
                    isProcess: false
                });
            });
            this.renewForm();
        }
    }

    handleChangeRole = (roleSelectedOption) => {
        this.setState({ roleSelectedOption });
        let { user } = this.state;
        user.role = roleSelectedOption.value
        this.setState({
            user
        });
    }

    // sự kiện select status
    handleChangeStatus = (statusSelectedOption) => {
        this.setState({ statusSelectedOption });
        let { user } = this.state;
        user.status = statusSelectedOption.value
        this.setState({
            user
        });
    }

    render() {
        let { user } = this.state;
        return (
            <Fragment>
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Trang Quản Lý
                        <small>Người Dùng</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> User</a></li>
                        <li className="active">{this.state.isUpdate ? 'update' : 'add'}</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title">{(this.state.isUpdate ? 'Cập nhật' : 'Thêm') + ' người dùng'}</h3>
                                </div>
                                {/* <!-- /.box-header --> */}
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="fullName">Tên</label>
                                                <input
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="fullName"
                                                    name="fullName"
                                                    placeholder="Tên"
                                                    value={user.fullName}
                                                    onChange={(e) => this.handleChangeInput(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="username">Tài Khoản</label>
                                                <input
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="username"
                                                    name="username"
                                                    placeholder="Tài khoản"
                                                    value={user.username}
                                                    onChange={(e) => this.handleChangeInput(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="password">Mật khẩu</label>
                                                <input
                                                    autoComplete="off"
                                                    type="password"
                                                    className="form-control"
                                                    id="password"
                                                    name="password"
                                                    placeholder="Mật khẩu"
                                                    value={user.password}
                                                    onChange={(e) => this.handleChangeInput(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input
                                                    autoComplete="off"
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    value={user.email}
                                                    onChange={(e) => this.handleChangeInput(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="role">Quyền</label>
                                                <Select
                                                    styles={selectStyle}
                                                    onChange={this.handleChangeRole}
                                                    options={this.state.roleOptions}
                                                    value={this.state.roleSelectedOption}
                                                    placeholder="Quyền"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="status">Trạng thái</label>
                                                <Select
                                                    styles={selectStyle}
                                                    onChange={this.handleChangeStatus}
                                                    options={this.state.statusOptions}
                                                    value={this.state.statusSelectedOption}
                                                    placeholder="Trạng thái"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-6 col-md-3 col-xs-offset-6 col-md-offset-9">
                                            <button
                                                className="btn btn-block btn-primary btn-flat"
                                                onClick={(e) => this.handleSave(e)}
                                                disabled={this.state.isProcess}
                                            >
                                                Lưu lại  {this.state.isProcess ? (<i className="fa fa-spinner faa-spin animated"></i>) : ''}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- /.box-body --> */}
                            </div>
                        </div>
                    </div>
                </section>
                {/* /.content */}
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        addUser: user => dispatch(userAction.addUserApi(user)),
        updateUser: user => dispatch(userAction.updateUserApi(user)),
    }
}

export default connect(null, mapDispatchToProps)(EditUser);
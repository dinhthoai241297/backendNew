import React, { Component, Fragment } from 'react';
import UserApi from './../../api/UserApi';
import RoleApi from './../../api/RoleApi';
import { connect } from 'react-redux';
import * as userAction from './../../actions/UserActions';
import toastr from 'toastr';
import Select from 'react-select';

const customStyles = {
    control: (base) => ({
        ...base,
        minHeight: 34,
        borderRadius: 0
    }),
    dropdownIndicator: (base) => ({
        ...base,
        padding: "0 8px"
    })
}

class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUpdate: false,
            user: {
                id: undefined,
                username: '',
                password: '',
                email: '',
                fullName: '',
                role: ''
            },
            isProcess: false,
            options: [],
            selectedOption: null
        }
    }

    componentDidMount() {
        this.updateAction(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateAction(nextProps);
    }

    updateAction = (props) => {
        let isUpdate = props.do === 'update' ? true : false;
        let user = {
            id: undefined,
            username: '',
            password: '',
            email: '',
            fullName: '',
            role: ''
        }
        RoleApi.getAll().then(res => {
            this.setState({
                options: res.body.data.list.map(el => ({ value: el.id, label: el.name }))
            });
        });
        if (isUpdate) {
            UserApi.getOne(props.match.params.id).then(res => {
                let u = res.body.data;
                if (u) {
                    user.id = u.id;
                    user.username = u.username;
                    user.password = u.password;
                    user.email = u.email;
                    user.fullName = u.fullName;
                    user.role = u.role;
                    console.log(user.role);
                    this.setState({
                        selectedOption: this.state.options.filter(el => el.value === user.role)
                    });
                    console.log(this.state.options);
                }
                this.setState({
                    user
                });
            }).catch(error => {
                throw (error);
            });
        } else {
            this.setState({
                user
            });
        }
    }

    clearForm = () => {
        this.setState({
            user: {
                id: undefined,
                username: '',
                password: '',
                email: '',
                fullName: '',
                role: ''
            }
        });
    }

    onChange = (e) => {
        let { name, value } = e.target;
        this.setState(preState => ({
            ...preState,
            user: {
                ...preState.user,
                [name]: value
            }
        }));
    }

    onSave = (e) => {
        this.setState({
            isProcess: true
        });
        e.preventDefault();
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "2000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
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
            this.clearForm();
        }
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        let { user } = this.state;
        user.role = selectedOption.value
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
                                                    onChange={(e) => this.onChange(e)}
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
                                                    onChange={(e) => this.onChange(e)}
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
                                                    onChange={(e) => this.onChange(e)}
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
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="form-group">
                                                <label htmlFor="role">Quyền</label>
                                                <Select
                                                    styles={customStyles}
                                                    onChange={this.handleChange}
                                                    options={this.state.options}
                                                    value={this.state.selectedOption}
                                                    placeholder="Quyền"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-6 col-md-3 col-xs-offset-6 col-md-offset-9">
                                            <button
                                                className="btn btn-block btn-primary btn-flat"
                                                onClick={(e) => this.onSave(e)}
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
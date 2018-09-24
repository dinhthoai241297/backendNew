import React, { Component, Fragment } from 'react';
import RoleApi from './../../api/RoleApi';
import { connect } from 'react-redux';
import * as roleAction from './../../actions/RoleActions';
import toastr from 'toastr';
import Select from 'react-select';
import * as roles from './../../contants/roles';

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

class EditRole extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUpdate: false,
            role: {
                id: '',
                name: '',
                roles: []
            },
            isProcess: false,
            options: [
                {
                    value: roles.VIEW,
                    label: 'VIEW'
                },
                {
                    value: roles.ADD,
                    label: 'ADD'
                },
                {
                    value: roles.UPDATE,
                    label: 'UPDATE'
                },
                {
                    value: roles.DELETE,
                    label: 'DELETE'
                },
                {
                    value: roles.ROOT,
                    label: 'ROOT'
                }
            ],
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
        let role = {
            id: undefined, roles: [], name: ''
        };
        if (isUpdate) {
            RoleApi.getOne(props.match.params.id).then(res => {
                let r = res.body.data;
                if (r) {
                    role.id = r.id;
                    role.name = r.name;
                    role.roles = JSON.parse(r.roles);
                    let tmp = [];
                    for (let i = 0; i < role.roles.length; i++) {
                        tmp = tmp.concat(this.state.options.filter(el => el.value === role.roles[i]));
                    }
                    this.setState({
                        selectedOption: tmp
                    });
                }
                this.setState({
                    role
                });
            }).catch(error => {
                throw (error);
            });
        } else {
            this.setState({
                role
            });
        }
    }

    clearForm = () => {
        this.setState({
            role: {
                name: '',
                roles: [],
                id: undefined
            }
        });
    }

    onChange = (e) => {
        let { name, value } = e.target;
        this.setState(preState => ({
            ...preState,
            role: {
                ...preState.role,
                [name]: value
            }
        }));
    }

    onSave = (e) => {
        console.log(this.state.role);
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
        let { role } = this.state;
        if (role.id) {
            this.props.updateRole(role).then(res => {
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
            this.props.addRole(role).then(res => {
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
        let { role } = this.state;
        role.roles = selectedOption.map(el => el.value);
        this.setState({
            role
        });
    }

    render() {
        let { role } = this.state;
        return (
            <Fragment>
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Trang Quản Lý
                        <small>Phân Quyền</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Role</a></li>
                        <li className="active">{this.state.isUpdate ? 'update' : 'add'}</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title">{(this.state.isUpdate ? 'Cập nhật' : 'Thêm') + ' phân quyền'}</h3>
                                </div>
                                {/* <!-- /.box-header --> */}
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <div className="form-group">
                                                <label htmlFor="name">Tên Quyền</label>
                                                <input
                                                    value={role.name}
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Tên Quyền"
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="form-group">
                                                <label htmlFor="description">Quyền</label>
                                                <Select
                                                    isMulti={true}
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
        addRole: role => dispatch(roleAction.addRoleApi(role)),
        updateRole: role => dispatch(roleAction.updateRoleApi(role)),
    }
}

export default connect(null, mapDispatchToProps)(EditRole);
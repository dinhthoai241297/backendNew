import React, { Component, Fragment } from 'react';
import SchoolApi from '../../api/SchoolApi';
import { connect } from 'react-redux';
import * as schoolAction from '../../actions/SchoolActions';
import toastr from 'toastr';

class EditSchool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUpdate: false,
            school: {
                name: '',
                code: '',
                description: '',
                province: '',
                id: undefined
            },
            isProcess: false
        }
    }

    componentDidMount() {
        this.updateAction(this.props.match);
    }

    componentWillReceiveProps(nextProps) {
        this.updateAction(nextProps.match);
    }

    updateAction = (match) => {
        let isUpdate = false;
        try {
            isUpdate = match.path.split('/')[2] === 'update' ? true : false;
            this.setState({
                isUpdate
            });
        } catch (error) {
        }
        let school = {
            id: undefined, name: '', description: '', code: '', province: ''
        };
        if (isUpdate) {
            SchoolApi.getone(match.params.id).end((error, data) => {
                if (error) {
                    //
                    throw (error);
                } else {
                    let s = JSON.parse(data.text).data;
                    if (s) {
                        school.id = s.id;
                        school.name = s.name;
                        school.description = s.description;
                        school.code = s.code;
                        school.province = s.province;
                    }
                    this.setState({
                        school
                    });
                }
            });
        } else {
            this.setState({
                school
            });
        }
    }

    clearForm = () => {
        this.setState({
            school: {
                id: undefined, name: '', description: '', code: '', province: ''
            }
        });
    }

    onChange = (e) => {
        let { name, value } = e.target;
        this.setState(preState => ({
            ...preState,
            school: {
                ...preState.school,
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
        let { school } = this.state;
        if (school.id) {
            this.props.updateSchool(school).then(res => {
                toastr.success('Updated!');
                this.setState({
                    isProcess: false
                });
            });
        } else {
            this.props.addSchool(school).then(() => {
                toastr.success('Added!');
                this.setState({
                    isProcess: false
                });
            });
            this.clearForm();
        }
    }

    render() {
        let { school } = this.state;
        return (
            <Fragment>
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Trang Quản Lý
                        <small>Trường</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> School</a></li>
                        <li className="active">{this.state.isUpdate ? 'update' : 'add'}</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title">{(this.state.isUpdate ? 'Cập nhật' : 'Thêm') + ' trường'}</h3>
                                </div>
                                {/* <!-- /.box-header --> */}
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="name">Tên trường</label>
                                                <input
                                                    value={school.name}
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Tên trường"
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="code">Mã trường</label>
                                                <input
                                                    value={school.code}
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="code"
                                                    name="code"
                                                    placeholder="Mã trường"
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="description">Mô tả trường</label>
                                                <input
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="description"
                                                    name="description"
                                                    placeholder="Mô tả trường"
                                                    value={school.description}
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="province">Mã Tỉnh</label>

                                                <input
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="province"
                                                    name="province"
                                                    placeholder="Mã Tỉnh"
                                                    value={school.province}
                                                    onChange={(e) => this.onChange(e)}
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
        addSchool: school => dispatch(schoolAction.addSchoolApi(school)),
        updateSchool: school => dispatch(schoolAction.updateSchoolApi(school)),
    }
}

export default connect(null, mapDispatchToProps)(EditSchool);
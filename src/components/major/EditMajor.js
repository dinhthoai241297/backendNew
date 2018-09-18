import React, { Component, Fragment } from 'react';
import MajorApi from '../../api/MajorApi';
import { connect } from 'react-redux';
import * as majorAction from '../../actions/MajorActions';
import toastr from 'toastr';

class EditMajor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUpdate: false,
            major: {
                id: '',
                name: '',
                code: '',
                school: '',
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
        let major = {
            id: undefined, name: '', code: '', school: ''
        };
        if (isUpdate) {
            MajorApi.getOne(match.params.id).end((error, data) => {
                if (error) {
                    //
                    throw (error);
                } else {
                    let m = JSON.parse(data.text).data;
                    console.log(m.id);
                    if (m) {
                        major.id = m.id;
                        major.name = m.name;
                        major.code = m.code;
                        major.school = m.school;
                    }
                    this.setState({
                        major
                    });
                }
            });
        } else {
            this.setState({
                major
            });
        }
    }

    clearForm = () => {
        this.setState({
            major: {
                id: undefined, name: '', code: '', school: ''
            }
        });
    }

    onChange = (e) => {
        let { name, value } = e.target;
        this.setState(preState => ({
            ...preState,
            major: {
                ...preState.major,
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
        let { major } = this.state;
        console.log(major.id);
        if (major.id) {
            this.props.updateMajor(major).then(res => {
                toastr.success('Updated!');
                this.setState({
                    isProcess: false
                });
            });
        } else {
            this.props.addMajor(major).then(() => {
                toastr.success('Added!');
                this.setState({
                    isProcess: false
                });
            });
            this.clearForm();
        }
    }

    render() {
        let { major } = this.state;
        return (
            <Fragment>
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Trang Quản Lý
                        <small>Khu Vực</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Sector</a></li>
                        <li className="active">{this.state.isUpdate ? 'update' : 'add'}</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title">{(this.state.isUpdate ? 'Cập nhật' : 'Thêm') + ' khu vực'}</h3>
                                </div>
                                {/* <!-- /.box-header --> */}
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="name">Tên Ngành</label>
                                                <input
                                                    value={major.name}
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Tên Ngành"
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="code">Mã Ngành</label>
                                                <input
                                                    value={major.code}
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="code"
                                                    name="code"
                                                    placeholder="Mã Ngành"
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="school">Mã Trường</label>
                                                <input
                                                    value={major.school}
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="school"
                                                    name="school"
                                                    placeholder="Mã Trường"
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
        addMajor: major => dispatch(majorAction.addMajorApi(major)),
        updateMajor: major => dispatch(majorAction.updateMajorApi(major)),
    }
}

export default connect(null, mapDispatchToProps)(EditMajor);
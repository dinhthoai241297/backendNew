import React, { Component, Fragment } from 'react';
import SubjectGroupApi from './../../api/SubjectGroupApi';
import { connect } from 'react-redux';
import * as subjectGroupAction from './../../actions/SubjectGroupActions';
import toastr from 'toastr';

class EditSubjectGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUpdate: false,
            subjectGroup: {
                name: '',
                description: '',
                id: ''
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
        let subjectGroup = {
            id: undefined, name: '', description: ''
        };
        if (isUpdate) {
            SubjectGroupApi.getOne(match.params.id).end((error, data) => {
                if (error) {
                    //
                    throw (error);
                } else {
                    let s = JSON.parse(data.text).data;
                    if (s) {
                        subjectGroup.id = s.id;
                        subjectGroup.name = s.name;
                        subjectGroup.description = s.description;
                    }
                    this.setState({
                        subjectGroup
                    });
                }
            });
        } else {
            this.setState({
                subjectGroup
            });
        }
    }

    clearForm = () => {
        this.setState({
            subjectGroup: {
                name: '',
                description: '',
                id: undefined
            }
        });
    }

    onChange = (e) => {
        let { name, value } = e.target;
        this.setState(preState => ({
            ...preState,
            subjectGroup: {
                ...preState.subjectGroup,
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
        let { subjectGroup } = this.state;
        if (subjectGroup.id) {
            this.props.updateSubjectGroup(subjectGroup).then(res => {
                toastr.success('Updated!');
                this.setState({
                    isProcess: false
                });
            });
        } else {
            this.props.addSubjectGroup(subjectGroup).then(() => {
                toastr.success('Added!');
                this.setState({
                    isProcess: false
                });
            });
            this.clearForm();
        }
    }

    render() {
        let { subjectGroup } = this.state;
        return (
            <Fragment>
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Trang Quản Lý
                        <small>Tổ Hợp Môn Thi</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> SubjectGroup</a></li>
                        <li className="active">{this.state.isUpdate ? 'update' : 'add'}</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title">{(this.state.isUpdate ? 'Cập nhật' : 'Thêm') + ' tổ hợp môn'}</h3>
                                </div>
                                {/* <!-- /.box-header --> */}
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="name">Tên tổ hợp môn</label>
                                                <input
                                                    value={subjectGroup.name}
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Tên tổ hợp môn"
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="description">Môn thi</label>
                                                <input
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="description"
                                                    name="description"
                                                    placeholder="Môn thi"
                                                    value={subjectGroup.description}
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
        addSubjectGroup: subjectGroup => dispatch(subjectGroupAction.addSubjectGroupApi(subjectGroup)),
        updateSubjectGroup: subjectGroup => dispatch(subjectGroupAction.updateSubjectGroupApi(subjectGroup)),
    }
}

export default connect(null, mapDispatchToProps)(EditSubjectGroup);
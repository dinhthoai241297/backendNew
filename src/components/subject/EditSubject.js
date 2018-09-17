import React, { Component, Fragment } from 'react';
import SubjectApi from '../../api/SubjectApi';
import { connect } from 'react-redux';
import * as subjectAction from '../../actions/SubjectActions';
import toastr from 'toastr';

class EditSubject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUpdate: false,
            subject: {
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
        let subject = {
            id: undefined, name: '', description: ''
        };
        if (isUpdate) {
            SubjectApi.getOne(match.params.id).end((error, data) => {
                if (error) {
                    //
                    throw (error);
                } else {
                    let s = JSON.parse(data.text).data;
                    if (s) {
                        subject.id = s.id;
                        subject.name = s.name;
                        subject.description = s.description;
                    }
                    this.setState({
                        subject
                    });
                }
            });
        } else {
            this.setState({
                subject
            });
        }
    }

    clearForm = () => {
        this.setState({
            subject: {
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
            subject: {
                ...preState.subject,
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
        let { subject } = this.state;
        if (subject.id) {
            this.props.updateSubject(subject).then(res => {
                toastr.success('Updated!');
                this.setState({
                    isProcess: false
                });
            });
        } else {
            this.props.addSubject(subject).then(() => {
                toastr.success('Added!');
                this.setState({
                    isProcess: false
                });
            });
            this.clearForm();
        }
    }

    render() {
        let { subject } = this.state;
        return (
            <Fragment>
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Trang Quản Lý
                        <small>Môn Thi</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Subject</a></li>
                        <li className="active">{this.state.isUpdate ? 'update' : 'add'}</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title">{(this.state.isUpdate ? 'Cập nhật' : 'Thêm') + ' môn thi'}</h3>
                                </div>
                                {/* <!-- /.box-header --> */}
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="name">Tên môn thi</label>
                                                <input
                                                    value={subject.name}
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Tên môn thi"
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
        addSubject: subject => dispatch(subjectAction.addSubjectApi(subject)),
        updateSubject: subject => dispatch(subjectAction.updateSubjectApi(subject)),
    }
}

export default connect(null, mapDispatchToProps)(EditSubject);
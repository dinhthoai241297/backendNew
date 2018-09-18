import React, { Component, Fragment } from 'react';
import MarkApi from '../../api/MarkApi';
import { connect } from 'react-redux';
import * as markAction from '../../actions/MarkActions';
import toastr from 'toastr';

class EditMark extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUpdate: false,
            mark: {
                id: undefined,
                school: '',
                major: '',
                year: 0,
                mark: 0,
                aspiration: 0,
                subjectGroups: '',
                note: ''

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
        let mark = {
            id: undefined,
            school: '',
            major: '',
            year: 0,
            mark: 0,
            aspiration: 0,
            subjectGroups: '',
            note: ''

        }
        if (isUpdate) {
            MarkApi.getOne(match.params.id).then(data => {
                let m = data.body.data;
                console.log(m);
                if (m) {
                    mark.id = m.id;
                    mark.school = m.school;
                    mark.major = m.major;
                    mark.year = m.year;
                    mark.mark = m.mark;
                    mark.aspiration = m.aspiration;
                    mark.subjectGroups = JSON.parse(m.subjectGroups).join(',');
                    mark.note = m.note;
                }
                this.setState({
                    mark
                });
            }).catch(error => {
                throw (error)
            });
        } else {
            this.setState({
                mark
            });
        }
    }

    clearForm = () => {
        this.setState({
            mark: {
                id: undefined,
                school: '',
                major: '',
                year: 0,
                mark: 0,
                aspiration: 0,
                subjectGroups: '',
                note: ''
            }
        });
    }

    onChange = (e) => {
        let { name, value } = e.target;
        this.setState(preState => ({
            ...preState,
            mark: {
                ...preState.mark,
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
        let { mark } = this.state;
        mark.subjectGroups = mark.subjectGroups.split(',').filter(el => el !== '');
        console.log(mark);
        if (mark.id) {
            this.props.updateMark(mark).then(res => {
                toastr.success('Updated!');
                this.setState({
                    isProcess: false
                });
            });
        } else {
            this.props.addMark(mark).then(() => {
                toastr.success('Added!');
                this.setState({
                    isProcess: false
                });
            });
            this.clearForm();
        }
    }

    render() {
        let { mark } = this.state;
        return (
            <Fragment>
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Trang Quản Lý
                        <small>Điểm Chuẩn</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Mark</a></li>
                        <li className="active">{this.state.isUpdate ? 'update' : 'add'}</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title">{(this.state.isUpdate ? 'Cập nhật' : 'Thêm') + ' điểm chuẩn'}</h3>
                                </div>
                                {/* <!-- /.box-header --> */}
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="school">Mã Trường</label>
                                                <input
                                                    value={mark.school}
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
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="major">Mã Ngành</label>
                                                <input
                                                    value={mark.major}
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="major"
                                                    name="major"
                                                    placeholder="Mã Ngành"
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="year">Năm</label>
                                                <input
                                                    value={mark.year}
                                                    autoComplete="off"
                                                    type="number"
                                                    className="form-control"
                                                    id="year"
                                                    name="year"
                                                    placeholder="Năm"
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="mark">Điểm chuẩn</label>
                                                <input
                                                    value={mark.mark}
                                                    autoComplete="off"
                                                    type="number"
                                                    className="form-control"
                                                    id="mark"
                                                    name="mark"
                                                    placeholder="Điểm chuẩn"
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="aspiration">Nguyện Vọng</label>
                                                <input
                                                    value={mark.aspiration}
                                                    autoComplete="off"
                                                    type="number"
                                                    className="form-control"
                                                    id="aspiration"
                                                    name="aspiration"
                                                    placeholder="Nguyện Vọng"
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="subjectGroups">Tổ Hợp Môn</label>
                                                <input
                                                    value={mark.subjectGroups}
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="subjectGroups"
                                                    name="subjectGroups"
                                                    placeholder="Tổ Hợp Môn"
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="note">Nghi Chú</label>
                                                <input
                                                    value={mark.note}
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="note"
                                                    name="note"
                                                    placeholder="Nghi Chú"
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
        addMark: mark => dispatch(markAction.addMarkApi(mark)),
        updateMark: mark => dispatch(markAction.updateMarkApi(mark)),
    }
}

export default connect(null, mapDispatchToProps)(EditMark);
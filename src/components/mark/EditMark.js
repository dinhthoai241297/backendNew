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
        let mark = {
            id: undefined, name: '', description: ''
        };
        if (isUpdate) {
            MarkApi.getOne(match.params.id).end((error, data) => {
                if (error) {
                    //
                    throw (error);
                } else {
                    let s = JSON.parse(data.text).data;
                    if (s) {
                        mark.id = s.id;
                        mark.name = s.name;
                        mark.description = s.description;
                    }
                    this.setState({
                        mark
                    });
                }
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
                                                <label htmlFor="name">Ngành</label>
                                                <input
                                                    value={mark.name}
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Tên ngành"
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                     <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="name">Trường</label>
                                                <input
                                                    value={mark.name}
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Trường"
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="description">Điểm trúng tuyển</label>
                                                <input
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="description"
                                                    name="description"
                                                    placeholder="Điểm trúng tuyển"
                                                    value={mark.description}
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="name">Tổ hợp môn</label>
                                                <input
                                                    value={mark.name}
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Tổ hợp môn"
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                         <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="name">Năm tuyển sinh</label>
                                                <input
                                                    value={mark.name}
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Năm tuyển sinh"
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                            <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="name">Ghi chú</label>
                                                <input
                                                    value={mark.name}
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Ghi chú"
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
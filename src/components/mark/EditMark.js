import React, { Component, Fragment } from 'react';
import MarkApi from '../../api/MarkApi';
import { connect } from 'react-redux';
import * as markAction from '../../actions/MarkActions';
import toastr from 'toastr';
import Select from 'react-select';
import SchoolApi from '../../api/SchoolApi';
import MajorApi from '../../api/MajorApi';
import SubjectGroupApi from '../../api/SubjectGroupApi';

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
            isProcess: false,
            optionsSchool: [],
            selectedOptionSchool: null,
            optionsMajor: [],
            selectedOptionMajor: null,
            optionsSG: [],
            selectedOptionSG: null,
        }
    }

    componentDidMount() {
        this.updateAction(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateAction(nextProps);
    }

    loadMajors = (school, select) => {
        // get all major in school with id = mark.school
        MajorApi.getAllInSchool(school).then(res => {
            let optionsMajor = res.body.data.list.map(el => ({ value: el.id, label: el.name }));
            this.setState({
                optionsMajor,
                selectedOptionMajor: select !== '' ? optionsMajor.filter(el => el.value === select) : ''
            });
        }).catch(error => {
            throw (error);
        });
    }

    updateAction = async (props) => {
        let isUpdate = props.do === 'update' ? true : false;
        // get all school in database
        let next = true, rs = [], tmp = null, page = 1;
        while (next) {
            tmp = await SchoolApi.getAll(page++);
            rs = rs.concat(tmp.body.data.list);
            next = tmp.body.data.next;
        }
        this.setState({
            optionsSchool: rs.map(el => ({ value: el.id, label: el.name }))
        });
        // get all subjectGroup in database
        next = true, rs = [], tmp = null, page = 1;
        while (next) {
            tmp = await SubjectGroupApi.getAll(page++);
            rs = rs.concat(tmp.body.data.list);
            next = tmp.body.data.next;
        }
        this.setState({
            optionsSG: rs.map(el => ({ value: el.id, label: el.code }))
        });
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
            MarkApi.getOne(props.match.params.id).then(data => {
                let m = data.body.data;
                if (m) {
                    mark.id = m.id;
                    mark.school = m.school;
                    mark.major = m.major;
                    mark.year = m.year;
                    mark.mark = m.mark;
                    mark.aspiration = m.aspiration;
                    mark.note = m.note;
                    mark.subjectGroups = JSON.parse(m.subjectGroups);
                    let t = [];
                    for (let i = 0; i < mark.subjectGroups.length; i++) {
                        t = t.concat(this.state.optionsSG.filter(el => el.value === mark.subjectGroups[i]));
                    }
                    this.loadMajors(mark.school, mark.major);
                    this.setState({
                        mark,
                        selectedOptionSchool: this.state.optionsSchool.filter(el => el.value === mark.school),
                        selectedOptionSG: t
                    });
                }
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
            },
            selectedOptionMajor: '',
            selectedOptionSchool: '',
            selectedOptionSG: '',
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
            this.props.addMark(mark).then(res => {
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

    handleChangeSchool = (selectedOption) => {
        this.setState({
            selectedOptionSchool: selectedOption
        });
        let { mark } = this.state;
        mark.school = selectedOption.value;
        mark.major = '';
        this.setState({
            mark
        });
        this.loadMajors(selectedOption.value, '');
    }

    handleChangeMajor = (selectedOption) => {
        this.setState({
            selectedOptionMajor: selectedOption
        });
        let { mark } = this.state;
        mark.major = selectedOption.value;
        this.setState({
            mark
        });
    }

    handleChangeSG = (selectedOption) => {
        this.setState({
            selectedOptionSG: selectedOption
        });
        let { mark } = this.state;
        mark.subjectGroups = selectedOption.map(el => el.value);
        this.setState({
            mark
        });
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
                                                <label htmlFor="school">Trường</label>
                                                <Select
                                                    styles={customStyles}
                                                    onChange={this.handleChangeSchool}
                                                    options={this.state.optionsSchool}
                                                    value={this.state.selectedOptionSchool}
                                                    placeholder="Trường"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="major">Ngành</label>
                                                <Select
                                                    styles={customStyles}
                                                    onChange={this.handleChangeMajor}
                                                    options={this.state.optionsMajor}
                                                    value={this.state.selectedOptionMajor}
                                                    placeholder="Ngành"
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
                                        <div className="col-xs-12">
                                            <div className="form-group">
                                                <label htmlFor="subjectGroups">Tổ Hợp Môn</label>
                                                <Select
                                                    isMulti={true}
                                                    styles={customStyles}
                                                    onChange={this.handleChangeSG}
                                                    options={this.state.optionsSG}
                                                    value={this.state.selectedOptionSG}
                                                    placeholder="Tổ hợp môn"
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
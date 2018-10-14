import React, { Component, Fragment } from 'react';
import MarkApi from '../../api/MarkApi';
import { connect } from 'react-redux';
import * as markAction from '../../actions/MarkActions';
import toastr from 'toastr';
import Select from 'react-select';
import SchoolApi from '../../api/SchoolApi';
import SubjectGroupApi from '../../api/SubjectGroupApi';
import MajorApi from '../../api/MajorApi';
import StatusApi from '../../api/StatusApi';
import { selectStyle, toastrOption } from './../../custom/Custom';

class EditMark extends Component {

    constructor(props) {
        super(props);

        this.init = {
            mark: {
                id: undefined,
                school: '',
                major: '',
                year: 0,
                mark: 0,
                aspiration: 0,
                subjectGroups: '',
                note: '',
                status: 1
            },
            schoolSelectedOption: null,
            majorSelectedOption: null,
            sGSelectedOption: null,
            statusSelectedOption: null,
            isProcess: false
        }

        this.state = {
            isUpdate: false,
            schoolOptions: [],
            majorOptions: [],
            sGOptions: [],
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

    loadMajorOption = (school, select) => {
        // get all major in school with id = mark.school
        MajorApi.getAllInSchool({
            school,
            session: this.props.session
        }).then(res => {
            let majorOptions = res.body.data.list.map(el => ({ value: el.id, label: el.name }));
            this.setState({
                majorOptions,
                majorSelectedOption: select !== '' ? majorOptions.filter(el => el.value === select) : ''
            });
        }).catch(error => {
            throw (error);
        });
    }

    loadStatusOption = async () => {
        // lấy tất cả status trong db
        let next = true, rs = [], tmp, page = 1;
        while (next) {
            tmp = await StatusApi.getAll({
                page: page++,
                session: this.props.session
            });
            rs = rs.concat(tmp.body.data.list);
            next = tmp.body.data.next;
        }
        this.setState({
            statusOptions: rs.map(el => ({ value: el.id, label: el.name }))
        });
    }

    loadSchoolOption = async () => {
        // get all school in database
        let next = true, rs = [], tmp = null, page = 1;
        while (next) {
            tmp = await SchoolApi.getAll({
                page: page++,
                session: this.props.session
            });
            rs = rs.concat(tmp.body.data.list);
            next = tmp.body.data.next;
        }
        this.setState({
            schoolOptions: rs.map(el => ({ value: el.id, label: el.name }))
        });
    }

    loadSGOption = async () => {
        // get all subjectGroup in database
        let next = true, rs = [], tmp = null, page = 1;
        while (next) {
            tmp = await SubjectGroupApi.getAll({
                page: page++,
                session: this.props.session
            });
            rs = rs.concat(tmp.body.data.list);
            next = tmp.body.data.next;
        }
        this.setState({
            sGOptions: rs.map(el => ({ value: el.id, label: el.code }))
        });
    }

    updateAction = async (props) => {
        let isUpdate = props.do === 'update' ? true : false;
        this.setState({ isUpdate });
        await this.loadStatusOption();
        await this.loadSGOption();
        await this.loadSchoolOption();
        if (isUpdate) {
            MarkApi.getOne({
                id: props.match.params.id,
                session: this.props.session
            }).then(data => {
                let mark = data.body.data;
                if (mark) {
                    mark.subjectGroups = JSON.parse(mark.subjectGroups);
                    let sGSelectedOption = [];
                    for (let i = 0; i < mark.subjectGroups.length; i++) {
                        sGSelectedOption = sGSelectedOption.concat(this.state.sGOptions.filter(el => el.value === mark.subjectGroups[i]));
                    }
                    this.loadMajorOption(mark.school, mark.major);
                    this.setState({
                        mark,
                        schoolSelectedOption: this.state.schoolOptions.filter(el => el.value === mark.school),
                        statusSelectedOption: this.state.statusOptions.filter(el => el.value === mark.status),
                        sGSelectedOption
                    });
                }
            }).catch(error => {
                throw (error)
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
            mark: {
                ...preState.mark,
                [name]: value
            }
        }));
    }

    handleSave = (e) => {
        e.preventDefault();
        this.setState({
            isProcess: true
        });
        let { mark } = this.state;
        if (mark.id) {
            this.props.updateMark(mark).then(code => {
                if (code === 200) {
                    toastr.success('Updated!');
                } else {
                    toastr.error('Error! ' + code);
                }
                this.setState({
                    isProcess: false
                });
            });
        } else {
            this.props.addMark(mark).then(code => {
                if (code === 200) {
                    toastr.success('Added!');
                } else {
                    toastr.error('Error! ' + code);
                }
                this.setState({
                    isProcess: false
                });
                this.renewForm();
            });
        }
    }

    handleChangeSchool = (selectedOption) => {
        this.setState({
            schoolSelectedOption: selectedOption
        });
        let { mark } = this.state;
        mark.school = selectedOption.value;
        mark.major = '';
        this.setState({
            mark
        });
        this.loadMajorOption(selectedOption.value, '');
    }

    handleChangeMajor = (selectedOption) => {
        this.setState({
            majorSelectedOption: selectedOption
        });
        let { mark } = this.state;
        mark.major = selectedOption.value;
        this.setState({
            mark
        });
    }

    handleChangeSG = (selectedOption) => {
        this.setState({
            sGSelectedOption: selectedOption
        });
        let { mark } = this.state;
        mark.subjectGroups = selectedOption.map(el => el.value);
        this.setState({
            mark
        });
    }

    // sự kiện select status
    handleChangeStatus = (statusSelectedOption) => {
        this.setState({ statusSelectedOption });
        let { mark } = this.state;
        mark.status = statusSelectedOption.value
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
                                                    styles={selectStyle}
                                                    onChange={this.handleChangeSchool}
                                                    options={this.state.schoolOptions}
                                                    value={this.state.schoolSelectedOption}
                                                    placeholder="Trường"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="major">Ngành</label>
                                                <Select
                                                    styles={selectStyle}
                                                    onChange={this.handleChangeMajor}
                                                    options={this.state.majorOptions}
                                                    value={this.state.majorSelectedOption}
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
                                                    onChange={(e) => this.handleChangeInput(e)}
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
                                                    onChange={(e) => this.handleChangeInput(e)}
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
                                                    onChange={(e) => this.handleChangeInput(e)}
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
                                                    onChange={(e) => this.handleChangeInput(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="subjectGroups">Tổ Hợp Môn</label>
                                                <Select
                                                    isMulti={true}
                                                    styles={selectStyle}
                                                    onChange={this.handleChangeSG}
                                                    options={this.state.sGOptions}
                                                    value={this.state.sGSelectedOption}
                                                    placeholder="Tổ hợp môn"
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
        addMark: mark => dispatch(markAction.addMarkApi(mark)),
        updateMark: mark => dispatch(markAction.updateMarkApi(mark)),
    }
}

const mapStateToProps = (state) => {
    return {
        session: state.LoginReducer.session
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMark);
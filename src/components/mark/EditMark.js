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
            majorOptions: [],
            sGOptions: [],
            statusOptions: [],
            ...this.init,

            school: [],
            pageSchool: 1,
            nextSchool: false,

            major: [],
            pageMajor: 1,
            nextMajor: false
        }
        toastr.options = toastrOption;
    }

    componentDidMount() {
        this.updateAction(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateAction(nextProps);
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
        let sGOptions = rs.map(el => ({ value: el.id, label: el.code }))
        let sGSelectedOption = [];
        let { mark } = this.state;
        for (let i = 0; i < mark.subjectGroups.length; i++) {
            sGSelectedOption = sGSelectedOption.concat(sGOptions.filter(el => el.value === mark.subjectGroups[i]));
        }
        this.setState({ sGOptions, sGSelectedOption });
        console.log(mark);
    }

    updateAction = async (props) => {
        let isUpdate = props.do === 'update' ? true : false;
        this.setState({ isUpdate });
        await this.loadStatusOption();
        this.loadSGOption();
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
                    let sch = mark.school;
                    let ma = mark.major;
                    mark.school = sch.id;
                    mark.major = ma.id;
                    this.setState({
                        mark,
                        statusSelectedOption: this.state.statusOptions.filter(el => el.value === mark.status),
                        schoolSelectedOption: { label: sch.name },
                        majorSelectedOption: { label: ma.name }
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
        console.log(this.state.mark);
        return;
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

    toggleSchool = () => {
        if (this.state.school.length === 0) {
            this.loadSchools(this.state.pageSchool);
        }
        $('#modal-school').modal('toggle');
    }

    handleChangeSchool = (s) => {
        $('#modal-school').modal('hide');
        let { mark } = this.state;
        mark.school = s.id;
        this.setState({
            major: [],
            pageMajor: 1,
            schoolSelectedOption: {
                label: s.name
            },
            majorSelectedOption: undefined,
            mark
        });
    }

    genListSchool = () => {
        let { school } = this.state;
        let rs = null;
        rs = school.map((s, i) => (
            <a
                key={i}
                className={"list-group-item h-hand " + (s.id === this.state.mark.school ? 'active' : '')}
                onClick={() => this.handleChangeSchool(s)}
            >{s.name}</a>
        ));
        return rs;
    }

    newPageSchool = (e, num) => {
        e.preventDefault();
        let { pageSchool, nextSchool } = this.state;
        pageSchool += num;
        if (pageSchool === 0 || (!nextSchool && num > 0)) {
            return;
        } else {
            this.loadSchools(pageSchool);
        }
    }

    loadSchools = async page => {
        let rs = await SchoolApi.getAll({
            page,
            session: this.props.session
        });

        this.setState({
            school: rs.body.data.list,
            nextSchool: rs.body.data.next,
            pageSchool: page
        });
    }

    toggleMajor = () => {
        if (this.state.major.length === 0) {
            this.loadMajors(this.state.pageMajor);
        }
        $('#modal-major').modal('toggle');
    }

    handleChangeMajor = (s) => {
        $('#modal-major').modal('hide');
        let { mark } = this.state;
        mark.major = s.id;
        this.setState({
            mark,
            majorSelectedOption: { label: s.name }
        });
    }

    genListMajor = () => {
        let { major } = this.state;
        let rs = null;
        rs = major.map((s, i) => (
            <a
                key={i}
                className={"list-group-item h-hand " + (s.id === this.state.mark.major ? 'active' : '')}
                onClick={() => this.handleChangeMajor(s)}
            >{s.name}</a>
        ));
        return rs;
    }

    newPageMajor = (e, num) => {
        e.preventDefault();
        let { pageMajor, nextMajor } = this.state;
        pageMajor += num;
        if (pageMajor === 0 || (!nextMajor && num > 0)) {
            return;
        } else {
            this.loadMajors(pageMajor);
        }
    }

    loadMajors = async page => {
        let rs = await MajorApi.getAll({
            page,
            session: this.props.session,
            school: this.state.mark.school
        });

        this.setState({
            major: rs.body.data.list,
            nextMajor: rs.body.data.next,
            pageMajor: page
        });
    }

    render() {
        let { mark } = this.state;
        return (
            <Fragment>

                {/* Modal school -> select school */}
                <div className="modal fade" id="modal-school">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">
                                    <span aria-hidden="true">×</span></button>
                                <h4 className="modal-title">Trường</h4>
                            </div>
                            <div className="modal-body">
                                <div className="list-group">
                                    {this.genListSchool()}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <ul className="pagination pagination-md no-margin pull-right">
                                    <li className={this.state.pageSchool === 1 ? 'disabled' : ''}>
                                        <a href="#" onClick={(e) => this.newPageSchool(e, -1)}>Pre</a>
                                    </li>
                                    <li className="active">
                                        <a>{this.state.pageSchool}</a>
                                    </li>
                                    <li className={this.state.nextSchool ? '' : 'disabled'}>
                                        <a href="#" onClick={(e) => this.newPageSchool(e, 1)} >Next</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* /.modal-content */}
                    </div>
                    {/* /.modal-dialog */}
                </div>

                {/* Modal Major -> select major */}
                <div className="modal fade" id="modal-major">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">
                                    <span aria-hidden="true">×</span></button>
                                <h4 className="modal-title">Ngành</h4>
                            </div>
                            <div className="modal-body">
                                <div className="list-group">
                                    {this.genListMajor()}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <ul className="pagination pagination-md no-margin pull-right">
                                    <li className={this.state.pageMajor === 1 ? 'disabled' : ''}>
                                        <a href="#" onClick={(e) => this.newPageMajor(e, -1)}>Pre</a>
                                    </li>
                                    <li className="active">
                                        <a>{this.state.pageMajor}</a>
                                    </li>
                                    <li className={this.state.nextMajor ? '' : 'disabled'}>
                                        <a href="#" onClick={(e) => this.newPageMajor(e, 1)} >Next</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* /.modal-content */}
                    </div>
                    {/* /.modal-dialog */}
                </div>

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
                                                <div
                                                    className="h-hand"
                                                    onClick={this.toggleSchool}
                                                >
                                                    <Select
                                                        isSearchable={false}
                                                        styles={{ ...selectStyle, menu: () => ({ display: 'none' }) }}
                                                        value={this.state.schoolSelectedOption}
                                                        placeholder="Trường"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="major">Ngành</label>
                                                <div
                                                    className="h-hand"
                                                    onClick={this.toggleMajor}
                                                >
                                                    <Select
                                                        isSearchable={false}
                                                        styles={{ ...selectStyle, menu: () => ({ display: 'none' }) }}
                                                        value={this.state.majorSelectedOption}
                                                        placeholder="Ngành"
                                                    />
                                                </div>
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
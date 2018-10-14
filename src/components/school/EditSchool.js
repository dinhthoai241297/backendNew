import React, { Component, Fragment } from 'react';
import SchoolApi from '../../api/SchoolApi';
import { connect } from 'react-redux';
import * as schoolAction from '../../actions/SchoolActions';
import toastr from 'toastr';
import Select from 'react-select';
import ProvinceApi from '../../api/ProvinceApi';
import StatusApi from '../../api/StatusApi';
import { selectStyle, toastrOption } from './../../custom/Custom';

class EditSchool extends Component {

    constructor(props) {
        super(props);

        this.init = {
            school: {
                name: '',
                code: '',
                description: '',
                province: '',
                image: '',
                id: undefined,
                status: 1
            },
            provinceSelectedOption: null,
            statusSelectedOption: null,
            isProcess: false
        }

        this.state = {
            isUpdate: false,
            provinceOptions: [],
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

    loadProvinceOption = async () => {
        // lấy lên tất cả Province trong db
        let next = true, rs = [], tmp, page = 1;
        while (next) {
            tmp = await ProvinceApi.getAll({
                page: page++,
                session: this.props.session
            });
            rs = rs.concat(tmp.body.data.list);
            next = tmp.body.data.next;
        }
        this.setState({
            provinceOptions: rs.map(el => ({ value: el.id, label: el.name }))
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

    updateAction = async (props) => {
        let isUpdate = props.do === 'update' ? true : false;
        this.setState({ isUpdate });
        await this.loadProvinceOption();
        await this.loadStatusOption();
        if (isUpdate) {
            SchoolApi.getOne({
                id: props.match.params.id,
                session: this.props.session
            }).then(res => {
                let school = res.body.data;
                if (school) {
                    this.setState({
                        provinceSelectedOption: this.state.provinceOptions.filter(el => el.value === school.province),
                        statusSelectedOption: this.state.statusOptions.filter(el => el.value === school.status),
                        school
                    });
                }
            }).catch(error => {
                throw (error);
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
            school: {
                ...preState.school,
                [name]: value
            }
        }));
    }

    handleSave = (e) => {
        this.setState({
            isProcess: true
        });
        e.preventDefault();
        let { school } = this.state;
        if (school.id) {
            this.props.updateSchool(school).then(code => {
                if (code === 200) {
                    toastr.success('Updated!');
                } else {
                    toastr.error('Error!  + code');
                }
                this.setState({
                    isProcess: false
                });
            });
        } else {
            this.props.addSchool(school).then(code => {
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

    handleChangeProvince = (provinceSelectedOption) => {
        this.setState({ provinceSelectedOption });
        let { school } = this.state;
        school.province = provinceSelectedOption.value
        this.setState({
            school
        });
    }

    handleChangeStatus = (statusSelectedOption) => {
        this.setState({ statusSelectedOption });
        let { school } = this.state;
        school.status = statusSelectedOption.value
        this.setState({
            school
        });
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
                                                    onChange={(e) => this.handleChangeInput(e)}
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
                                                    onChange={(e) => this.handleChangeInput(e)}
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
                                                    onChange={(e) => this.handleChangeInput(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="image">Hình Ảnh</label>
                                                <input
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="image"
                                                    name="image"
                                                    placeholder="Link Hình Ảnh"
                                                    value={school.image}
                                                    onChange={(e) => this.handleChangeInput(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="province">Tỉnh Thành</label>
                                                <Select
                                                    styles={selectStyle}
                                                    onChange={this.handleChangeProvince}
                                                    options={this.state.provinceOptions}
                                                    value={this.state.provinceSelectedOption}
                                                    placeholder="Tỉnh Thành"
                                                    id="province"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="status">Trạng Thái</label>
                                                <Select
                                                    styles={selectStyle}
                                                    onChange={this.handleChangeStatus}
                                                    options={this.state.statusOptions}
                                                    value={this.state.statusSelectedOption}
                                                    placeholder="Trạng Thái"
                                                    id="status"
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
        addSchool: school => dispatch(schoolAction.addSchoolApi(school)),
        updateSchool: school => dispatch(schoolAction.updateSchoolApi(school)),
    }
}

const mapStateToProps = (state) => {
    return {
        session: state.LoginReducer.session
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSchool);
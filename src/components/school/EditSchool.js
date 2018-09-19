import React, { Component, Fragment } from 'react';
import SchoolApi from '../../api/SchoolApi';
import { connect } from 'react-redux';
import * as schoolAction from '../../actions/SchoolActions';
import toastr from 'toastr';
import Select from 'react-select';
import ProvinceApi from '../../api/ProvinceApi';

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
            isProcess: false,
            options: [],
            selectedOption: null
        }
    }

    componentDidMount() {
        this.updateAction(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateAction(nextProps);
    }

    updateAction = async (props) => {
        let isUpdate = props.do === 'update' ? true : false;
        // get all province in database
        let next = true, rs = [], tmp, page = 1, options = [];
        while (next) {
            tmp = await ProvinceApi.getAll(page++);
            rs = rs.concat(tmp.body.data.list);
            next = tmp.body.data.next;
        }
        this.setState({
            options: rs.map(el => ({ value: el.id, label: el.name }))
        });
        let school = {
            id: undefined, name: '', description: '', code: '', province: ''
        };
        if (isUpdate) {
            SchoolApi.getOne(props.match.params.id).then(res => {

                let s = JSON.parse(res.text).data;
                if (s) {
                    school.id = s.id;
                    school.name = s.name;
                    school.description = s.description;
                    school.code = s.code;
                    school.province = s.province;
                    this.setState({
                        selectedOption: this.state.options.filter(el => el.value === school.province)
                    });
                }
                this.setState({
                    school
                });
            }).catch(error => {
                throw (error);
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
            this.props.addSchool(school).then(res => {
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

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        let { school } = this.state;
        school.province = selectedOption.value
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
                                                <label htmlFor="province">Tỉnh Thành</label>
                                                <Select
                                                    styles={customStyles}
                                                    onChange={this.handleChange}
                                                    options={this.state.options}
                                                    value={this.state.selectedOption}
                                                    placeholder="Tỉnh Thành"
                                                    id="province"
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
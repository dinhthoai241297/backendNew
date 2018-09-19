import React, { Component, Fragment } from 'react';
import MajorApi from '../../api/MajorApi';
import { connect } from 'react-redux';
import * as majorAction from '../../actions/MajorActions';
import toastr from 'toastr';
import Select from 'react-select';
import SchoolApi from '../../api/SchoolApi';

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
        // get all sector in database
        let next = true, rs = [], tmp, page = 1, options = [];
        while (next) {
            tmp = await SchoolApi.getAll(page++);
            rs = rs.concat(tmp.body.data.list);
            next = tmp.body.data.next;
        }
        this.setState({
            options: rs.map(el => ({ value: el.id, label: el.name }))
        });
        let major = {
            id: undefined, name: '', code: '', school: ''
        };
        if (isUpdate) {
            MajorApi.getOne(props.match.params.id).then(res => {
                let m = res.body.data;
                console.log(m.id);
                if (m) {
                    major.id = m.id;
                    major.name = m.name;
                    major.code = m.code;
                    major.school = m.school;
                    this.setState({
                        selectedOption: this.state.options.filter(el => el.value === major.school)
                    });
                }
                this.setState({
                    major
                });
            }).catch(error => {
                throw(error);
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
        if (major.id) {
            this.props.updateMajor(major).then(res => {
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
            this.props.addMajor(major).then(res => {
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
        let { major } = this.state;
        major.school = selectedOption.value
        this.setState({
            major
        });
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
                        <li><a href="#"><i className="fa fa-dashboard" /> Major</a></li>
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
                                        <div className="col-xs-12">
                                            <div className="form-group">
                                                <label htmlFor="school">Trường</label>
                                                <div className="form-group">
                                                <Select
                                                    styles={customStyles}
                                                    onChange={this.handleChange}
                                                    options={this.state.options}
                                                    value={this.state.selectedOption}
                                                    placeholder="Trường"
                                                />
                                            </div>
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
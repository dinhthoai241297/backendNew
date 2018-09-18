import React, { Component, Fragment } from 'react';
import SubjectGroupApi from './../../api/SubjectGroupApi';
import SubjectApi from './../../api/SubjectApi';
import { connect } from 'react-redux';
import * as subjectGroupAction from './../../actions/SubjectGroupActions';
import toastr from 'toastr';
import Select from 'react-select';

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

class EditSubjectGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUpdate: false,
            subjectGroup: {
                code: '',
                description: '',
                id: undefined,
                subjects: []
            },
            isProcess: false,
            options: [],
            selectedOption: []
        }
    }

    componentDidMount() {
        this.updateAction(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateAction(nextProps);
    }

    updateAction = async (props) => {
        let isUpdate = props.do === 'update' ? true : false
        // get all subject in database
        let next = true, rs = [], tmp, page = 1, options = [];
        while (next) {
            tmp = await SubjectApi.getAll(page++);
            rs = rs.concat(tmp.body.data.list);
            next = tmp.body.data.next;
        }
        this.setState({
            options: rs.map(el => ({ value: el.id, label: el.name }))
        });
        let subjectGroup = {
            code: '',
            description: '',
            id: undefined,
            subjects: []
        }
        if (isUpdate) {
            SubjectGroupApi.getOne(props.match.params.id).end((error, data) => {
                if (error) {
                    //
                    throw (error);
                } else {
                    let sg = JSON.parse(data.text).data;
                    if (sg) {
                        subjectGroup.id = sg.id;
                        subjectGroup.code = sg.code;
                        subjectGroup.description = sg.description;
                        subjectGroup.subjects = JSON.parse(sg.subjects);
                        let t = [];
                        for (let i = 0; i < subjectGroup.subjects.length; i++) {
                            t = t.concat(this.state.options.filter(el => el.value === subjectGroup.subjects[i]));
                        }
                        this.setState({
                            selectedOption: t
                        });
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
                code: '',
                description: '',
                id: undefined,
                subjects: []
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
            this.props.addSubjectGroup(subjectGroup).then(res => {
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
        console.log(selectedOption);
        this.setState({ selectedOption });
        let { subjectGroup } = this.state;
        subjectGroup.subjects = selectedOption.map(el => el.value);
        this.setState({
            subjectGroup
        });
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
                                                <label htmlFor="code">Mã tổ hợp môn</label>
                                                <input
                                                    value={subjectGroup.code}
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="code"
                                                    name="code"
                                                    placeholder="Mã tổ hợp môn"
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="description">Mô tả</label>
                                                <input
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="description"
                                                    name="description"
                                                    placeholder="Mô tả"
                                                    value={subjectGroup.description}
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="form-group">
                                                <Select
                                                    isMulti={true}
                                                    styles={customStyles}
                                                    onChange={this.handleChange}
                                                    options={this.state.options}
                                                    value={this.state.selectedOption}
                                                    placeholder="Môn"
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
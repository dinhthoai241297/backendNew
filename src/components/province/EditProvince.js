import React, { Component, Fragment } from 'react';
import ProvinceApi from '../../api/ProvinceApi';
import { connect } from 'react-redux';
import * as provinceAction from '../../actions/ProvinceActions';
import toastr from 'toastr';
import Select from 'react-select';
import SectorApi from '../../api/SectorApi';

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

class EditProvince extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUpdate: false,
            province: {
                name: '',
                description: '',
                sector: '',
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
        let isUpdate = props.do === 'update' ? true : false
        // get all sector in database
        let next = true, rs = [], tmp, page = 1, options = [];
        while (next) {
            tmp = await SectorApi.getAll(page++);
            rs = rs.concat(tmp.body.data.list);
            next = tmp.body.data.next;
        }
        this.setState({
            options: rs.map(el => ({ value: el.id, label: el.name }))
        });
        let province = {
            id: undefined, name: '', description: '', sector: ''
        };
        if (isUpdate) {
            ProvinceApi.getOne(props.match.params.id).then(res => {
                let p = JSON.parse(res.text).data;
                if (p) {
                    province.id = p.id;
                    province.name = p.name;
                    province.description = p.description;
                    province.sector = p.sector
                    this.setState({
                        selectedOption: this.state.options.filter(el => el.value === province.sector)
                    });
                }
                this.setState({
                    province
                });
            }).catch(error => {
                throw(error);
            });
        } else {
            this.setState({
                province
            });
        }
    }

    clearForm = () => {
        this.setState({
            province: {
                name: '',
                description: '',
                sector: '',
                id: undefined
            }
        });
    }

    onChange = (e) => {
        let { name, value } = e.target;
        this.setState(preState => ({
            ...preState,
            province: {
                ...preState.province,
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
        let { province } = this.state;
        if (province.id) {
            this.props.updateProvince(province).then(res => {
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
            this.props.addProvince(province).then(res => {
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
        let { province } = this.state;
        province.sector = selectedOption.value
        this.setState({
            province
        });
    }

    render() {
        let { province } = this.state;
        return (
            <Fragment>
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Trang Quản Lý
                        <small>Tỉnh Thành</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Province</a></li>
                        <li className="active">{this.state.isUpdate ? 'update' : 'add'}</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title">{(this.state.isUpdate ? 'Cập nhật' : 'Thêm') + ' tỉnh thành'}</h3>
                                </div>
                                {/* <!-- /.box-header --> */}
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="name">Tên tỉnh thành</label>
                                                <input
                                                    value={province.name}
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Tên tỉnh thành"
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="description">Mô tả tỉnh thành</label>
                                                <input
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="description"
                                                    name="description"
                                                    placeholder="Mô tả tỉnh thành"
                                                    value={province.description}
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="form-group">
                                                <Select
                                                    styles={customStyles}
                                                    onChange={this.handleChange}
                                                    options={this.state.options}
                                                    value={this.state.selectedOption}
                                                    placeholder="Khu Vực"
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
        addProvince: province => dispatch(provinceAction.addProvinceApi(province)),
        updateProvince: province => dispatch(provinceAction.updateProvinceApi(province)),
    }
}

export default connect(null, mapDispatchToProps)(EditProvince);
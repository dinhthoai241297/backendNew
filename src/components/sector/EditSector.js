import React, { Component, Fragment } from 'react';
import SectorApi from './../../api/SectorApi';
import StateApi from './../../api/StateApi';
import { connect } from 'react-redux';
import * as sectorAction from './../../actions/SectorActions';
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

class EditSector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUpdate: false,
            sector: {
                name: '',
                description: '',
                id: '',
                state: 1
            },
            isProcess: false,
            optionsState: [],
            selectedOptionState: null
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
        // get all state in database
        let next = true, rs = [], tmp, page = 1;
        while (next) {
            tmp = await StateApi.getAll(page++);
            rs = rs.concat(tmp.body.data.list);
            next = tmp.body.data.next;
        }
        this.setState({
            optionsState: rs.map(el => ({ value: el.id, label: el.name }))
        });
        let sector = {
            id: undefined, name: '', description: '', state: 1
        };
        if (isUpdate) {
            SectorApi.getOne(props.match.params.id).then(res => {
                let s = res.body.data;
                if (s) {
                    sector.id = s.id;
                    sector.name = s.name;
                    sector.description = s.description;
                    sector.state = s.state;
                    this.setState({
                        selectedOptionState: this.state.optionsState.filter(el => el.value === sector.state)
                    });
                }
                this.setState({
                    sector
                });
            }).catch(error => {
                throw (error);
            });
        } else {
            this.setState({
                sector
            });
        }
    }

    clearForm = () => {
        this.setState({
            sector: {
                name: '',
                description: '',
                id: undefined,
                state: 1
            }
        });
    }

    onChange = (e) => {
        let { name, value } = e.target;
        this.setState(preState => ({
            ...preState,
            sector: {
                ...preState.sector,
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
        let { sector } = this.state;
        if (sector.id) {
            this.props.updateSector(sector).then(res => {
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
            this.props.addSector(sector).then(res => {
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

    handleChangeState = (selectedOption) => {
        this.setState({ selectedOption });
        let { sector } = this.state;
        sector.state = selectedOption.value
        this.setState({
            sector
        });
    }

    render() {
        let { sector } = this.state;
        return (
            <Fragment>
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Trang Quản Lý
                        <small>Khu Vực</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Sector</a></li>
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
                                                <label htmlFor="name">Tên khu vực</label>
                                                <input
                                                    value={sector.name}
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Tên khu vực"
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="description">Mô tả khu vực</label>
                                                <input
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="description"
                                                    name="description"
                                                    placeholder="Mô tả khu vực"
                                                    value={sector.description}
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="form-group">
                                                <Select
                                                    styles={customStyles}
                                                    onChange={this.handleChangeState}
                                                    options={this.state.optionsState}
                                                    value={this.state.selectedOptionState}
                                                    placeholder="Trạng thái"
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
        addSector: sector => dispatch(sectorAction.addSectorApi(sector)),
        updateSector: sector => dispatch(sectorAction.updateSectorApi(sector)),
    }
}

export default connect(null, mapDispatchToProps)(EditSector);
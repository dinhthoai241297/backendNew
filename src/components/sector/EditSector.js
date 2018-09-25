import React, { Component, Fragment } from 'react';
import SectorApi from './../../api/SectorApi';
import { connect } from 'react-redux';
import * as sectorAction from './../../actions/SectorActions';
import toastr from 'toastr';
import StatusApi from '../../api/StatusApi';
import Select from 'react-select';
import { selectStyle, toastrOption } from './../../custom/Custom';

class EditSector extends Component {

    constructor(props) {
        super(props);

        this.init = {
            sector: {
                name: '',
                description: '',
                id: undefined,
                status: 1
            },
            statusSelectedOption: null,
            isProcess: false
        }

        this.state = {
            isUpdate: false,
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

    loadStatusOption = async () => {
        // lấy tất cả status trong db
        let next = true, rs = [], tmp, page = 1;
        while (next) {
            tmp = await StatusApi.getAll(page++);
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
        await this.loadStatusOption();
        // lấy dữ liệu lên nếu là update
        if (isUpdate) {
            SectorApi.getOne(props.match.params.id).then(res => {
                let sector = res.body.data;
                if (sector) {
                    // khởi tạo dữ liệu selected ban đầu
                    this.setState({
                        statusSelectedOption: this.state.statusOptions.filter(el => el.value === sector.status),
                        sector
                    });
                }
            }).catch(error => {
                throw (error);
            });
        } else {
            this.renewForm();
        }
    }

    // xóa trắng form nhập
    renewForm = () => {
        this.setState(preState => ({ ...preState, ...this.init }));
    }

    // sự kiện nhập input
    handleChangeInput = (e) => {
        let { name, value } = e.target;
        this.setState(preState => ({
            ...preState,
            sector: {
                ...preState.sector,
                [name]: value
            }
        }));
    }

    handleSave = (e) => {
        e.preventDefault();
        this.setState({
            isProcess: true
        });
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
            this.renewForm();
        }
    }

    // sự kiện select status
    handleChangeStatus = (statusSelectedOption) => {
        this.setState({ statusSelectedOption });
        let { sector } = this.state;
        sector.status = statusSelectedOption.value
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
                                                    onChange={(e) => this.handleChangeInput(e)}
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
                                                    onChange={(e) => this.handleChangeInput(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="form-group">
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
        addSector: sector => dispatch(sectorAction.addSectorApi(sector)),
        updateSector: sector => dispatch(sectorAction.updateSectorApi(sector)),
    }
}

export default connect(null, mapDispatchToProps)(EditSector);
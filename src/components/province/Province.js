import React, { Component, Fragment } from 'react';
import ProvinceItem from './ProvinceItem';
import { connect } from 'react-redux';
import * as actions from '../../actions/ProvinceActions';
import toastr from 'toastr';
import { findRole } from './../../custom/CusFunction';
import * as roles from './../../contants/roles';
import { toastrOption, selectStyle } from './../../custom/Custom';
import * as status from './../../contants/status';
import Select from 'react-select';
import SectorApi from './../../api/SectorApi';

class Province extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            next: true,
            provinces: [],
            update: false,
            delete: false,
            statusSelectedOption: null,
            statusOptions: [],
            status: [],
            sectorSelectedOption: null,
            sectorOptions: [],

            statusFilter: undefined,
            sectorFilter: undefined
        }
        toastr.options = toastrOption;
    }

    async componentDidMount() {
        let { page } = this.state;
        this.initStatusFilter(this.props);
        await this.loadSectorOption();
        this.loadProvinces(page);
    }

    componentWillReceiveProps(nextProps) {
        let { provinces, next } = nextProps.data;
        let { user } = nextProps;
        let update = findRole(user.role, roles.UPDATE) !== -1, del = findRole(user.role, roles.DELETE) !== -1;
        this.setState({
            provinces,
            next,
            update,
            delete: del
        });
        if (this.props.status !== nextProps.status) {
            this.initStatusFilter(nextProps);
        }
    }

    initStatusFilter = (props) => {
        if (props.status.length !== 0) {
            let statusOptions = [
                {
                    value: undefined,
                    label: 'Tất cả'
                }
            ];
            statusOptions.push(...props.status.map(el => ({ value: el.id, label: el.name })));
            let statusSelectedOption = statusOptions.find(el => (el.value === props.status.find(ell => ell.status === status.ACTIVE).id));
            let statusFilter = statusSelectedOption ? statusSelectedOption.value : undefined;
            this.setState({
                statusOptions,
                statusSelectedOption,
                statusFilter
            });
        }
    }

    loadSectorOption = async () => {
        // get all sector in database
        let next = true, rs = [], tmp, page = 1;
        while (next) {
            tmp = await SectorApi.getAll({
                page: page++,
                session: this.props.session
            });
            rs = rs.concat(tmp.body.data.list);
            next = tmp.body.data.next;
        }
        let sectorOptions = [
            {
                value: undefined,
                label: 'Tất cả'
            }
        ];
        sectorOptions.push(...rs.map(el => ({ value: el.id, label: el.name })));
        let sectorSelectedOption = sectorOptions[0];
        console.log(sectorSelectedOption ? sectorSelectedOption.value : undefined);
        await this.setState({
            sectorOptions,
            sectorSelectedOption: sectorSelectedOption,
            sectorFilter: sectorSelectedOption ? sectorSelectedOption.value : undefined
        });
    }

    newPage = (e, num) => {
        e.preventDefault();
        let { page, next } = this.state;
        page += num;
        if (page === 0 || (!next && num > 0)) {
            return;
        } else {
            this.loadProvinces(page);
        }
    }

    genListProvince = () => {
        let { provinces } = this.state;
        let rs = null;
        if (provinces) {
            rs = provinces.map((province, index) => {
                return (
                    <ProvinceItem
                        key={index}
                        province={province}
                        updateStatus={this.updateStatus}
                        delete={this.state.delete}
                        update={this.state.update}
                    />
                );
            });
        }
        return rs;
    }

    updateStatus = (id, status) => {
        let st = this.props.status.find(el => el.status === status);
        if (confirm('Bạn có chắc muốn ' + st.name)) {
            if (st) {
                this.props.updateStatus(id, st).then(code => {
                    if (code === 200) {
                        this.loadProvinces(this.state.page);
                    }
                });
            }
        }
    }

    // sự kiện select status
    handleChangeStatus = (statusSelectedOption) => {
        this.setState({ statusSelectedOption, statusFilter: statusSelectedOption.value }, () => this.loadProvinces(1));
    }

    handleChangeSector = (sectorSelectedOption) => {
        this.setState({ sectorSelectedOption, sectorFilter: sectorSelectedOption.value }, () => this.loadProvinces(1));
    }

    loadProvinces = (page) => {
        let { statusFilter, sectorFilter } = this.state;
        this.props.loadProvinces(page, statusFilter, sectorFilter);
        this.setState({ page });
    }

    render() {

        return (
            <Fragment>
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Trang Quản Lý Tỉnh Thành
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Province</a></li>
                        <li className="active">List</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <div className="row">
                                        <div className="col-xs-12 col-lg-4 lh-35">
                                            <h3 className="box-title">Danh sách Tỉnh Thành</h3>
                                        </div>
                                        <div className="col-xs-12 col-lg-8">
                                            <div className="row">
                                                <div className="col-xs-12 col-lg-offset-4 col-lg-4">
                                                    <div className="form-group">
                                                        <Select
                                                            isSearchable={false}
                                                            styles={selectStyle}
                                                            onChange={this.handleChangeSector}
                                                            options={this.state.sectorOptions}
                                                            value={this.state.sectorSelectedOption}
                                                            placeholder="Khu Vực"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xs-12 col-lg-4">
                                                    <div className="form-group">
                                                        <Select
                                                            isSearchable={false}
                                                            styles={selectStyle}
                                                            onChange={this.handleChangeStatus}
                                                            options={this.state.statusOptions}
                                                            value={this.state.statusSelectedOption}
                                                            placeholder="Trạng thái"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- /.box-header --> */}
                                <div className="box-body table-responsive no-padding">
                                    <table className="table table-hover">
                                        <tbody>
                                            <tr>
                                                <th>Tên Tỉnh</th>
                                                <th>Mô tả</th>
                                                <th>Khu vực</th>
                                                {(this.state.update || this.state.delete) &&
                                                    <th className="text-center">Action</th>
                                                }
                                            </tr>
                                            {this.genListProvince()}
                                        </tbody>
                                    </table>
                                </div>
                                {/* <!-- /.box-body --> */}
                                <div className="box-footer clearfix">
                                    <ul className="pagination pagination-md no-margin pull-right">
                                        <li className={this.state.page === 1 ? 'disabled' : ''}>
                                            <a href="#" onClick={(e) => this.newPage(e, -1)}>Pre</a>
                                        </li>
                                        <li className="active">
                                            <a>{this.state.page}</a>
                                        </li>
                                        <li className={this.state.next ? '' : 'disabled'}>
                                            <a href="#" onClick={(e) => this.newPage(e, 1)} >Next</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* <!-- /.box --> */}
                        </div>
                    </div>
                </section>
                {/* /.content */}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.ProvinceReducer,
        user: state.LoginReducer.user,
        status: state.StatusReducer.status,
        session: state.LoginReducer.session
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadProvinces: (page, statusFilter, sectorFilter) => dispatch(actions.loadAllProvinceApi(page, statusFilter, sectorFilter)),
        updateStatus: (id, status) => dispatch(actions.updateStatusApi(id, status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Province);
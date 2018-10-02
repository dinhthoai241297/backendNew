import React, { Component, Fragment } from 'react';
import SectorItem from './SectorItem';
import { connect } from 'react-redux';
import * as actions from './../../actions/SectorActions';
import toastr from 'toastr';
import { toastrOption, selectStyle } from './../../custom/Custom';
import { findRole } from './../../custom/CusFunction';
import * as roles from './../../contants/roles';
import * as status from './../../contants/status';
import Select from 'react-select';

class Sectors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            next: true,
            sectors: [],
            update: false,
            delete: false,
            statusSelectedOption: null,
            statusOptions: [],
            statusFilter: undefined
        }
        toastr.options = toastrOption;
    }

    componentDidMount() {
        let { page } = this.state;
        this.initStatusFilter(this.props);
        this.props.loadSectors(page, this.state.statusFilter);
    }

    componentWillReceiveProps(nextProps) {
        let { sectors, next } = nextProps.data;
        let { user } = nextProps;
        let update = findRole(user.role, roles.UPDATE) !== -1, del = findRole(user.role, roles.DELETE) !== -1;
        this.setState({
            sectors,
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
            let statusOptions = props.status.map(el => ({ value: el.id, label: el.name }));
            let statusSelectedOption = statusOptions.find(el => (el.value === props.status.find(ell => ell.status === status.ACTIVE).id));
            let statusFilter = statusSelectedOption.value;
            this.setState({
                statusOptions,
                statusSelectedOption,
                statusFilter
            });
        }
    }

    newPage = (e, num) => {
        e.preventDefault();
        let { page, next } = this.state;
        page += num;
        if (page === 0 || (!next && num > 0)) {
            return;
        } else {
            this.setState({
                page
            });
            this.props.loadSectors(page, this.state.statusFilter);
        }
    }

    genListSector = () => {
        let rs = null, { sectors } = this.state;
        if (sectors) {
            rs = sectors.map((sector, index) => {
                return (
                    <SectorItem
                        key={index}
                        sector={sector}
                        updateStatus={this.updateStatus}
                        update={this.state.update}
                        delete={this.state.delete}
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
                this.props.updateStatus(id, st);
            }
        }
    }

    // sự kiện select status
    handleChangeStatus = (statusSelectedOption) => {
        this.setState({ statusSelectedOption, statusFilter: statusSelectedOption.value, page: 1 });
        this.props.loadSectors(1, this.state.statusFilter);
    }

    render() {
        return (
            <Fragment>
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Trang Quản Lý Khu Vực
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Sector</a></li>
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
                                            <h3 className="box-title">Danh sách khu vực</h3>
                                        </div>
                                        <div className="col-xs-12 col-lg-8">
                                            <div className="row">
                                                <div className="col-xs-12 col-lg-offset-8 col-lg-4">
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
                                                <th>Tên KV</th>
                                                <th>Mô tả KV</th>
                                                {(this.state.delete || this.state.update) &&
                                                    <th className="text-center">Action</th>
                                                }
                                            </tr>
                                            {this.genListSector()}
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
        data: state.SectorReducer,
        user: state.LoginReducer.user,
        status: state.StatusReducer.status
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadSectors: (page, statusFilter) => dispatch(actions.loadAllSectorApi(page, statusFilter)),
        updateStatus: (id, status) => dispatch(actions.updateStatusApi(id, status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sectors);
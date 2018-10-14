import React, { Component, Fragment } from 'react';
import RoleItem from './RoleItem';
import { connect } from 'react-redux';
import * as actions from './../../actions/RoleActions';
import toastr from 'toastr';
import { toastrOption, selectStyle } from './../../custom/Custom';
import * as status from './../../contants/status';
import Select from 'react-select';

class Roles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            next: true,
            roles: [],
            statusSelectedOption: null,
            statusOptions: [],
            statusFilter: undefined
        }
        toastr.options = toastrOption;
    }

    async componentDidMount() {
        let { page } = this.state;
        await this.initStatusFilter(this.props);
        this.loadRoles(page);
    }

    componentWillReceiveProps(nextProps) {
        let { roles, next } = nextProps.data;
        this.setState({
            roles,
            next
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

    newPage = (e, num) => {
        e.preventDefault();
        let { page, next } = this.state;
        page += num;
        if (page === 0 || (!next && num > 0)) {
            return;
        } else {
            this.loadRoles(page);
        }
    }

    genListRole = () => {
        let { roles } = this.state;
        let rs = null;
        if (roles) {
            rs = roles.map((role, index) => {
                return (
                    <RoleItem
                        key={index}
                        role={role}
                        updateStatus={this.updateStatus}
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
                        this.loadRoles(this.state.page);
                    }
                });
            }
        }
    }

    // sự kiện select status
    handleChangeStatus = (statusSelectedOption) => {
        let statusFilter = statusSelectedOption.value;
        this.setState({ statusSelectedOption, statusFilter }, () => this.loadRoles(1));
    }

    loadRoles = page => {
        let { statusFilter } = this.state;
        this.props.loadRoles(page, statusFilter);
        this.setState({ page });
    }

    render() {
        return (
            <Fragment>
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Trang Quản Lý Phân Quyền
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Role</a></li>
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
                                            <h3 className="box-title">Danh sách quyền</h3>
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
                                                <th>Tên Quyền</th>
                                                <th>Quyền</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                            {this.genListRole()}
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
        data: state.RoleReducer,
        status: state.StatusReducer.status
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadRoles: (page, status) => dispatch(actions.loadAllRoleApi(page, status)),
        updateStatus: (id, status) => dispatch(actions.updateStatusApi(id, status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
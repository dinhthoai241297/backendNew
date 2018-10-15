import React, { Component, Fragment } from 'react';
import SubjectGroupItem from './SubjectGroupItem';
import { connect } from 'react-redux';
import * as actions from '../../actions/SubjectGroupActions';
import toastr from 'toastr';
import { toastrOption, selectStyle } from './../../custom/Custom';
import { findRole } from './../../custom/CusFunction';
import * as roles from './../../contants/roles';
import * as status from './../../contants/status';
import Select from 'react-select';

class SubjectGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            next: true,
            subjectGroups: [],
            update: false,
            delete: false,
            statusSelectedOption: undefined,
            statusOptions: [],
            statusFilter: undefined,

            loading: false
        }
        toastr.options = toastrOption;
    }

    componentDidMount() {
        let { page } = this.state;
        this.initStatusFilter(this.props);
        this.loadSubjectGroups(page);
    }

    componentWillReceiveProps(nextProps) {
        let { subjectGroups, next } = nextProps.data;
        let { user } = nextProps;
        let update = findRole(user.role, roles.UPDATE) !== -1, del = findRole(user.role, roles.DELETE) !== -1;
        this.setState({
            subjectGroups,
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

    newPage = (e, num) => {
        e.preventDefault();
        let { page, next } = this.state;
        page += num;
        if (page === 0 || (!next && num > 0)) {
            return;
        } else {
            this.loadSubjectGroups(page);
        }
    }

    genListSubjectGroup = () => {
        let { subjectGroups } = this.state;
        let rs = null;
        if (subjectGroups) {
            rs = subjectGroups.map((subjectGroup, index) => {
                return (
                    <SubjectGroupItem
                        key={index}
                        subjectGroup={subjectGroup}
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
                this.props.updateStatus(id, st).then(code => {
                    if (code === 200) {
                        this.loadSubjectGroups(this.state.page);
                    }
                });
            }
        }
    }

    // sự kiện select status
    handleChangeStatus = (statusSelectedOption) => {
        let statusFilter = statusSelectedOption.value;
        this.setState({ statusSelectedOption, statusFilter }, () => this.loadSubjectGroups(1));

    }

    loadSubjectGroups = page => {
        this.setState({ loading: true });
        let { statusFilter } = this.state;
        this.props.loadSubjectGroups(page, statusFilter).then(res => {
            this.setState({ page, loading: false });
        });
    }

    render() {
        return (
            <Fragment>
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Trang Quản Lý Tổ Hợp Môn
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> SubjectGroup</a></li>
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
                                            <h3 className="box-title">Danh sách tổ hợp môn</h3>
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
                                                <th>Mã Tổ Hợp Môn</th>
                                                <th>Môn Thi</th>
                                                <th>Mô tả</th>
                                                {(this.state.delete || this.state.update) &&
                                                    <th className="text-center">Action</th>
                                                }
                                            </tr>
                                            {this.state.loading && (<div id="my-loading">
                                                <i className="fa fa-fw fa-5x fa-spinner faa-spin animated"></i>
                                            </div>)}
                                            {this.genListSubjectGroup()}
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
        data: state.SubjectGroupReducer,
        user: state.LoginReducer.user,
        status: state.StatusReducer.status
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadSubjectGroups: (page, status) => dispatch(actions.loadAllSubjectGroupApi(page, status)),
        updateStatus: (id, status) => dispatch(actions.updateStatusApi(id, status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectGroup);
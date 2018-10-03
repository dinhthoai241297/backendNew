import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/MajorActions';
import toastr from 'toastr';
import MajorItem from './MajorItem';
import { findRole } from './../../custom/CusFunction';
import * as roles from './../../contants/roles';
import { toastrOption, selectStyle } from './../../custom/Custom';
import * as status from './../../contants/status';
import Select from 'react-select';
import SchoolApi from './../../api/SchoolApi';

class Major extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            next: true,
            majors: [],
            update: false,
            delete: false,
            statusSelectedOption: null,
            schoolSelectedOption: null,
            schoolOptions: [],
            statusOptions: [],

            statusFilter: undefined,
            schoolFilter: undefined,
            pageSchool: 1,
            nextSchool: false,
            school: []
        }

        toastr.options = toastrOption;
    }

    componentDidMount() {
        let { page } = this.state;
        this.initStatusFilter(this.props);
        this.loadMajors(page);
    }

    componentWillReceiveProps(nextProps) {
        let { majors, next } = nextProps.data;
        let { user } = nextProps;
        let update = findRole(user.role, roles.UPDATE) !== -1, del = findRole(user.role, roles.DELETE) !== -1;
        this.setState({
            majors,
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

    loadSchools = async page => {
        let rs = await SchoolApi.getAll({
            page,
            session: this.props.session
        });

        this.setState({
            school: rs.body.data.list,
            nextSchool: rs.body.data.next,
            pageSchool: page
        });
    }

    newPage = (e, num) => {
        e.preventDefault();
        let { page, next } = this.state;
        page += num;
        if (page === 0 || (!next && num > 0)) {
            return;
        } else {
            this.loadMajors(page);
        }
    }

    newPageSchool = (e, num) => {
        e.preventDefault();
        let { pageSchool, nextSchool } = this.state;
        pageSchool += num;
        if (pageSchool === 0 || (!nextSchool && num > 0)) {
            return;
        } else {
            this.loadSchools(pageSchool);
        }
    }

    genListMajor = () => {
        let { majors } = this.state;
        let rs = null;
        if (majors) {
            rs = majors.map((major, index) => {
                return (
                    <MajorItem
                        key={index}
                        major={major}
                        updateStatus={this.updateStatus}
                        delete={this.state.delete}
                        update={this.state.update}
                    />
                );
            });
        }
        return rs;
    }

    genListSchool = () => {
        let { school } = this.state;
        let rs = null;
        rs = school.map((s, i) => (
            <a
                key={i}
                className={"list-group-item h-hand " + (s.id === this.state.schoolFilter ? 'active' : '')}
                onClick={() => this.handleChangeSchool(s)}
            >{s.name}</a>
        ));
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

    loadMajors = page => {
        let { statusFilter, schoolFilter } = this.state;
        this.props.loadMajors(page, statusFilter, schoolFilter);
        this.setState({ page });
    }

    // sự kiện select status
    handleChangeStatus = (statusSelectedOption) => {
        this.setState({ statusSelectedOption }, () => this.loadMajors(1));
    }

    handleChangeSchool = (s) => {
        console.log(s);
        $('#modal-school').modal('hide');
        this.setState({
            schoolFilter: s.id,
            schoolSelectedOption: {
                value: s.id,
                label: s.name
            }
        }, () => this.loadMajors(1));
    }

    toggleSchool = () => {
        if (this.state.school.length === 0) {
            this.loadSchools(this.state.pageSchool);
        }
        $('#modal-school').modal('toggle');
    }

    render() {

        return (
            <Fragment>
                <div className="modal fade" id="modal-school">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">
                                    <span aria-hidden="true">×</span></button>
                                <h4 className="modal-title">Trường</h4>
                            </div>
                            <div className="modal-body">
                                <div className="list-group">
                                    {this.genListSchool()}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <ul className="pagination pagination-md no-margin pull-right">
                                    <li className={this.state.pageSchool === 1 ? 'disabled' : ''}>
                                        <a href="#" onClick={(e) => this.newPageSchool(e, -1)}>Pre</a>
                                    </li>
                                    <li className="active">
                                        <a>{this.state.pageSchool}</a>
                                    </li>
                                    <li className={this.state.nextSchool ? '' : 'disabled'}>
                                        <a href="#" onClick={(e) => this.newPageSchool(e, 1)} >Next</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* /.modal-content */}
                    </div>
                    {/* /.modal-dialog */}
                </div>

                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Trang Quản Lý Ngành
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Major</a></li>
                        <li className="active">List</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <div className="col-xs-12 col-lg-4 lh-35">
                                        <h3 className="box-title">Danh sách Ngành</h3>
                                    </div>
                                    <div className="col-xs-12 col-lg-8">
                                        <div className="row">
                                            <div className="col-xs-12 col-lg-offset-4 col-lg-4">
                                                <div className="form-group">
                                                    <div
                                                        className="h-hand"
                                                        onClick={this.toggleSchool}
                                                    >
                                                        <Select
                                                            isSearchable={false}
                                                            styles={{ ...selectStyle, menu: () => ({ display: 'none' }) }}
                                                            value={this.state.schoolSelectedOption}
                                                            placeholder="Trường"
                                                        />
                                                    </div>
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
                                {/* <!-- /.box-header --> */}
                                <div className="box-body table-responsive no-padding">
                                    <table className="table table-hover">
                                        <tbody>
                                            <tr>
                                                <th>Tên Ngành</th>
                                                <th>Mã Ngành</th>
                                                <th>Trường</th>
                                                {(this.state.delete || this.state.update) &&
                                                    <th width="15%" className="text-center">Action</th>
                                                }
                                            </tr>
                                            {this.genListMajor()}
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
        data: state.MajorReducer,
        user: state.LoginReducer.user,
        status: state.StatusReducer.status,
        session: state.LoginReducer.session
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadMajors: (page, statusFilter, schoolFilter) => dispatch(actions.loadAllMajorApi(page, statusFilter, schoolFilter)),
        updateStatus: (id, status) => dispatch(actions.updateStatusApi(id, status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Major);
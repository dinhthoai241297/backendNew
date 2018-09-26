import React, { Component, Fragment } from 'react';
import SubjectGroupItem from './SubjectGroupItem';
import { connect } from 'react-redux';
import * as actions from '../../actions/SubjectGroupActions';
import toastr from 'toastr';
import { toastrOption } from './../../custom/Custom';
import { findRole } from './../../custom/CusFunction';
import * as roles from './../../contants/roles';

class SubjectGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            next: true,
            subjectGroups: [],
            update: false,
            delete: false
        }

        toastr.options = toastrOption;
    }

    componentDidMount() {
        let { page } = this.state;
        this.props.loadSubjectGroups(page);
    }

    componentWillReceiveProps(nextProps) {
        let { subjectGroups, next } = nextProps.data;
        let { user } = nextProps;
        let update = findRole(user.roles, roles.UPDATE) !== -1, del = findRole(user.roles, roles.DELETE) !== -1;
        this.setState({
            subjectGroups,
            next,
            update,
            delete: del
        });
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
            this.props.loadSubjectGroups(page);
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
                        deleteSubjectGroup={this.deleteSubjectGroup}
                        update={this.state.update}
                        delete={this.state.delete}
                    />
                );
            });
        }
        return rs;
    }

    deleteSubjectGroup = (id) => {
        if (confirm('Bạn có chắc muốn xóa')) {
            this.props.deleteSubjectGroup(id).then(res => {
                toastr.warning('Deleted!');
            });
        }
    }

    render() {
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
                        <li className="active">List</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Danh sách tổ hợp môn</h3>
                                    <div className="box-tools">
                                        <div className="input-group input-group-sm" style={{ width: 150 }}>
                                            <input type="text" name="table_search" className="form-control pull-right" placeholder="Tìm kiếm" />
                                            <div className="input-group-btn">
                                                <button type="submit" className="btn btn-default"><i className="fa fa-search"></i></button>
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
                                                <th>Trạng thái</th>
                                                {(this.state.delete || this.state.update) &&
                                                    <th>Chức năng</th>
                                                }
                                            </tr>
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
        user: state.LoginReducer
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadSubjectGroups: (page) => dispatch(actions.loadAllSubjectGroupApi(page)),
        deleteSubjectGroup: (id) => dispatch(actions.deleteSubjectGroupApi(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectGroup);
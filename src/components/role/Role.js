import React, { Component, Fragment } from 'react';
import RoleItem from './RoleItem';
import { connect } from 'react-redux';
import * as actions from './../../actions/RoleActions';
import toastr from 'toastr';
import { toastrOption } from './../../custom/Custom';
import * as status from './../../contants/status';

class Roles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            next: true,
            roles: []
        }
        toastr.options = toastrOption;
    }

    componentDidMount() {
        let { page } = this.state;
        this.props.loadRoles(page);
    }

    componentWillReceiveProps(nextProps) {
        let { roles, next } = nextProps.data;
        this.setState({
            roles,
            next
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
            this.props.loadRoles(page);
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
                        updateStatus={() => this.updateStatus(role.id)}
                    />
                );
            });
        }
        return rs;
    }

    updateStatus = (id) => {
        if (confirm('Bạn có chắc muốn xóa')) {
            let st = this.props.status.find(el => el.status === status.DELETE);
            if (st) {
                this.props.updateStatus(id, st);
            }
        }
    }

    render() {
        return (
            <Fragment>
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Trang Quản Lý
                        <small>Phân Quyền</small>
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
                                    <h3 className="box-title">Danh sách phân quyền</h3>
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
                                                <th>Tên Quyền</th>
                                                <th>Quyền</th>
                                                <th>Trạng thái</th>
                                                <th>Chức năng</th>
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
        loadRoles: (page) => dispatch(actions.loadAllRoleApi(page)),
        updateStatus: (id, status) => dispatch(actions.updateStatusApi(id, status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
import React, { Component, Fragment } from 'react';
import UserItem from './UserItem';
import { connect } from 'react-redux';
import * as actions from './../../actions/UserActions';
import toastr from 'toastr';

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            next: true,
            users: []
        }
    }

    componentDidMount() {
        let { page } = this.state;
        this.props.loadUsers(page);
    }

    componentWillReceiveProps(nextProps) {
        let { users, next } = nextProps.data;
        this.setState({
            users,
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
            this.props.loadUsers(page);
        }
    }

    genListUser = () => {
        let { users } = this.state;
        let rs = null;
        if (users) {
            rs = users.map((user, index) => {
                return (
                    <UserItem key={index} user={user} deleteUser={this.deleteUser} />
                );
            });
        }
        return rs;
    }

    deleteUser = (id) => {
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
        if (confirm('Bạn có chắc muốn xóa')) {
            this.props.deleteUser(id).then(res => {
                if (res) {
                    toastr.warning('Deleted!');
                } else {
                    toastr.warning('Error!');
                }
            }).catch(error => {
                toastr.warning('Error!');
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
                        <small>Người dùng</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> User</a></li>
                        <li className="active">List</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Danh sách người dùng</h3>
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
                                                <th>IDRole</th>
                                                <th>UserName</th>
                                                <th>Password</th>
                                                <th>Email</th>
                                                <th>FullName</th>
                                                <th>Chức năng</th>
                                            </tr>
                                            {this.genListUser()}
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
        data: state.UserReducer
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadUsers: (page) => dispatch(actions.loadAllUserApi(page)),
        deleteUser: (id) => dispatch(actions.deleteUserApi(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
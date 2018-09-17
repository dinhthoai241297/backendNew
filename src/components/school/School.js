import React, { Component, Fragment } from 'react';
import SchoolItem from './SchoolItem';
import { connect } from 'react-redux';
import * as actions from '../../actions/SchoolActions';
import toastr from 'toastr';

class School extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            next: true,
            schools: []
        }
    }

    componentDidMount() {
        let { page } = this.state;
        this.props.loadSchools(page);
    }

    componentWillReceiveProps(nextProps) {
        let { schools, next } = nextProps.data;
        this.setState({
            schools,
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
            this.props.loadSchools(page);
        }
    }

    genListSchool = () => {
        let { schools } = this.state;
        let rs = null;
        if (schools) {
            rs = schools.map((school, index) => {
                return (
                    <SchoolItem key={index} school={school} deleteSchool={this.deleteSchool} />
                );
            });
        }
        return rs;
    }

    deleteSchool = (id) => {
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
            this.props.deleteSchool(id).then(res => {
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
                        <small>Trường</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> School</a></li>
                        <li className="active">List</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Danh sách trường</h3>
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
                                                <th>Mã Trường</th>
                                                <th>Tên Trường</th>
                                                <th>Mô tả Trường</th>
                                                <th>Mã Tỉnh</th>
                                                <th>Chức năng</th>
                                            </tr>
                                            {this.genListSchool()}
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
        data: state.SchoolReducer
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadSchools: (page) => dispatch(actions.loadAllSchoolApi(page)),
        deleteSchool: (id) => dispatch(actions.deleteSchoolApi(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(School);
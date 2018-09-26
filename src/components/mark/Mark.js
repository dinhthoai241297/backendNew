import React, { Component, Fragment } from 'react';
import MarkItem from './MarkItem';
import { connect } from 'react-redux';
import * as actions from '../../actions/MarkActions';
import toastr from 'toastr';
import { findRole } from './../../custom/CusFunction';
import * as roles from './../../contants/roles';
import { toastrOption } from './../../custom/Custom';
import * as status from './../../contants/status';

class Mark extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            next: true,
            marks: [],
            update: false,
            delete: false
        }
        toastr.options = toastrOption;
    }

    componentDidMount() {
        let { page } = this.state;
        this.props.loadMarks(page);
    }

    componentWillReceiveProps(nextProps) {
        let { marks, next } = nextProps.data;
        let { user } = nextProps;
        let update = findRole(user.role, roles.UPDATE) !== -1, del = findRole(user.role, roles.DELETE) !== -1;
        this.setState({
            marks,
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
            this.props.loadMarks(page);
        }
    }

    genListMark = () => {
        let { marks } = this.state;
        let rs = null;
        if (marks) {
            rs = marks.map((mark, index) => {
                return (
                    <MarkItem
                        key={index}
                        mark={mark}
                        updateStatus={() => this.updateStatus(mark.id)}
                        delete={this.state.delete}
                        update={this.state.update}
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
                        <small>Điểm Chuẩn</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Mark</a></li>
                        <li className="active">List</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Danh sách điểm chuẩn</h3>
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
                                                <th>Trường</th>
                                                <th>Ngành</th>
                                                <th>Năm</th>
                                                <th>Nguyện vọng</th>
                                                <th>Điểm Chuẩn</th>
                                                <th>Tổ Hợp Môn</th>
                                                <th>Ghi Chú</th>
                                                <th>Trạng thái</th>
                                                {(this.state.delete || this.state.update) &&
                                                    <th>Chức năng</th>
                                                }
                                            </tr>
                                            {this.genListMark()}
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
        data: state.MarkReducer,
        user: state.LoginReducer.user,
        status: state.StatusReducer.status
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadMarks: (page) => dispatch(actions.loadAllMarkApi(page)),
        updateStatus: (id, status) => dispatch(actions.updateStatusApi(id, status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mark);

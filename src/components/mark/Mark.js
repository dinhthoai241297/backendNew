import React, { Component, Fragment } from 'react';
import MarkItem from './MarkItem';
import { connect } from 'react-redux';
import * as actions from '../../actions/SectorActions';
import toastr from 'toastr';

class Mark extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            next: true,
            marks: []
        }
    }

    componentDidMount() {
        let { page } = this.state;
        this.props.loadSectors(page);
    }

    componentWillReceiveProps(nextProps) {
        let { marks, next } = nextProps.data;
        this.setState({
            marks,
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
            this.props.loadSectors(page);
        }
    }

    genListSector = () => {
        let { marks } = this.state;
        let rs = null;
        if (marks) {
            rs = marks.map((mark, index) => {
                return (
                    <SectorItem key={index} mark={mark} deleteSector={this.deleteSector} />
                );
            });
        }
        return rs;
    }

    deleteSector = (id) => {
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
            this.props.deleteSector(id).then(res => {
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
                        <small>Điểm Chuẩn</small>
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
                                                <th>Ngành</th>
                                                <th>Trường</th>
                                                <th>Điểm Chuẩn</th>
                                                <th>Tổ Hợp Môn</th>
                                                <th>Năm </th>
                                                <th>Ghi Chú</th>
                                                <th>Chức năng</th>
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
        data: state.SectorReducer
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadSectors: (page) => dispatch(actions.loadAllSectorApi(page)),
        deleteSector: (id) => dispatch(actions.deleteSectorApi(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mark);

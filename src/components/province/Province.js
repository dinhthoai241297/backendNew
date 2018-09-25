import React, { Component, Fragment } from 'react';
import ProvinceItem from './ProvinceItem';
import { connect } from 'react-redux';
import * as actions from '../../actions/ProvinceActions';
import toastr from 'toastr';

class Province extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            next: true,
            provinces: []
        }
    }

    componentDidMount() {
        let { page } = this.state;
        this.props.loadProvinces(page);
    }

    componentWillReceiveProps(nextProps) {
        let { provinces, next } = nextProps.data;
        this.setState({
            provinces,
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
            this.props.loadProvinces(page);
        }
    }

    genListProvince = () => {
        let { provinces } = this.state;
        let rs = null;
        if (provinces) {
            rs = provinces.map((province, index) => {
                return (
                    <ProvinceItem key={index} province={province} deleteProvince={this.deleteProvince} />
                );
            });
        }
        return rs;
    }

    deleteProvince = (id) => {
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
            this.props.deleteProvince(id).then(res => {
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
                        <small>Tỉnh Thành</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Province</a></li>
                        <li className="active">List</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Danh sách tỉnh thành</h3>
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
                                                <th>Tên Tỉnh</th>
                                                <th>Mô tả</th>
                                                <th>Khu vực</th>
                                                <th>Trạng thái</th>
                                                <th>Chức năng</th>
                                            </tr>
                                            {this.genListProvince()}
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
        data: state.ProvinceReducer
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadProvinces: (page) => dispatch(actions.loadAllProvinceApi(page)),
        deleteProvince: (id) => dispatch(actions.deleteProvinceApi(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Province);
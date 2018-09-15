import React, { Component, Fragment } from 'react';
import SectorItem from './SectorItem';
import {connect} from 'react-redux';
import * as actions from './../../actions/SectorActions';

class Sectors extends Component {

    constructor (props) {
        super(props);
        this.state = {
            page : 1,
            next: true,
            sectors: []
        }
    }

    componentDidMount() {
        let {page} = this.state;
        this.props.loadSectors(page);
    }

    componentWillReceiveProps(nextProps) {
        let {sectors, next} = nextProps.data;
        console.log(sectors);
        this.setState({
            sectors,
            next
        });
    }

    newPage = (e, num) => {
        e.preventDefault();
        let {page, next} = this.state;
        page += num;
        if (page  === 0 || !next) {
            return;
        } else {
            this.setState({
                page
            });
            // call action here
        }
    }

    genListSector = () => {
        let {sectors} = this.state;
        let rs = null;
        if (sectors) {
            rs = sectors.map((sector, index) => {
                return (
                    <SectorItem key={index} sector={sector} />
                );
            });
        }
        return rs;
    }

    render() {
        return (
            <Fragment>
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Trang Quản Lý
                        <small>Khu Vực</small>
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
                                    <h3 className="box-title">Danh sách khu vực</h3>
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
                                                <th>Mã KV</th>
                                                <th>Tên KV</th>
                                                <th>Mô tả KV</th>
                                                <th>DS Tỉnh</th>
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
                                        <li className={this.state.next ? '' : 'disabled' }>
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
        loadSectors: (page) => dispatch(actions.loadAllSectorApi(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sectors);
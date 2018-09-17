import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class ProvinceItem extends Component {
    render() {
        let { province } = this.props;
        return (
            <tr>
                <td>{province.id}</td>
                <td>{province.name}</td>
                <td>{province.description}</td>
                <td>
                    <button className="btn btn-success btn-xs">Xem</button>
                </td>
                <td>
                    <Link className="btn btn-warning btn-xs" to={'/province/update/' + province.id}>Sửa</Link>
                    <button className="btn btn-danger btn-xs" onClick={() => this.props.deleteProvince(province.id)}>Xóa</button>
                </td>
            </tr>
        );
    }
}

export default ProvinceItem;
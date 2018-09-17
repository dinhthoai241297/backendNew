import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class MarkItem extends Component {
    render() {
        let { sector } = this.props;
        return (
            <tr>
                <td>{sector.id}</td>
                <td>{sector.name}</td>
                <td>{sector.description}</td>
                <td>
                    <button className="btn btn-success btn-xs">Xem</button>
                </td>
                <td>
                    <Link className="btn btn-warning btn-xs" to={'/sector/update/' + sector.id}>Sửa</Link>
                    <button className="btn btn-danger btn-xs" onClick={() => this.props.deleteSector(sector.id)}>Xóa</button>
                </td>
            </tr>
        );
    }
}

export default MarkItem;
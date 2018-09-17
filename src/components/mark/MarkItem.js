import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class MarkItem extends Component {
    render() {
        let { mark } = this.props;
        return (
            <tr>
                <td>{mark.id}</td>
                <td>{mark.name}</td>
                <td>{mark.description}</td>
                <td>
                    <button className="btn btn-success btn-xs">Xem</button>
                </td>
                <td>
                    <Link className="btn btn-warning btn-xs" to={'/mark/update/' + mark.id}>Sửa</Link>
                    <button className="btn btn-danger btn-xs" onClick={() => this.props.deleteMark(mark.id)}>Xóa</button>
                </td>
            </tr>
        );
    }
}

export default MarkItem;
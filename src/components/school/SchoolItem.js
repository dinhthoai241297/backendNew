import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class SchoolItem extends Component {
    render() {
        let { school } = this.props;
        return (
            <tr>
                <td>{school.id}</td>
                <td>{school.name}</td>
                <td>{school.description}</td>
                <td>
                    <button className="btn btn-success btn-xs">Xem</button>
                </td>
                <td>
                    <Link className="btn btn-warning btn-xs" to={'/school/update/' + school.id}>Sửa</Link>
                    <button className="btn btn-danger btn-xs" onClick={() => this.props.deleteShool(school.id)}>Xóa</button>
                </td>
            </tr>
        );
    }
}

export default SchoolItem;
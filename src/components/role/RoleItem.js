import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class RoleItem extends Component {
    render() {
        let { role } = this.props;
        return (
            <tr>
                <td>{role.id}</td>
                <td>{role.name}</td>
                <td>{role.roles}</td>
                <td>
                    <Link className="btn btn-warning btn-xs" to={'/role/update/' + role.id}>Sửa</Link>
                    <button className="btn btn-danger btn-xs" onClick={() => this.props.deleteRole(role.id)}>Xóa</button>
                </td>
            </tr>
        );
    }
}

export default RoleItem;
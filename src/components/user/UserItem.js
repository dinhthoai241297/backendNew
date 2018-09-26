import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserItem extends Component {
    render() {
        let { user } = this.props;
        return (
            <tr>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.fullName}</td>
                <td>{user.role.name}</td>
                <td>{user.status.name}</td>
                <td>
                    <Link className="btn btn-warning btn-xs" to={'/user/update/' + user.id}>Sửa</Link>
                    <button className="btn btn-danger btn-xs" onClick={this.props.updateStatus}>Xóa</button>
                </td>
            </tr>
        );
    }
}

export default UserItem;
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class UserItem extends Component {
    render() {
        let { user } = this.props;
        return (
            <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.description}</td>
                <td>
                    <button className="btn btn-success btn-xs">Xem</button>
                </td>
                <td>
                    <Link className="btn btn-warning btn-xs" to={'/user/update/' + user.id}>Sửa</Link>
                    <button className="btn btn-danger btn-xs" onClick={() => this.props.deleteUser(user.id)}>Xóa</button>
                </td>
            </tr>
        );
    }
}

export default UserItem;
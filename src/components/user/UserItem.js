import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as status from './../../contants/status';

class UserItem extends Component {
    render() {
        let { user } = this.props;
        let icon = status.renIcon(user.status.status);
        return (
            <tr>
                <td>{user.username}</td>
                <td>{user.fullName}</td>
                <td>{user.role.name}</td>
                <td className="text-center">
                    <a 
                        data-toggle="tooltip" 
                        title={user.status.status === status.ACTIVE ? 'lock' : 'active'} 
                        className="h-hand" onClick={this.props.updateStatus}
                        onClick={() => this.props.updateStatus(user.id, user.status.status === status.ACTIVE ? status.LOCK : status.ACTIVE)}
                    >
                        <i className={"w-1 fa fa-1x pd-rl-1 bd-r " + icon}></i>
                    </a>
                    <Link 
                        to={'/user/update/' + user.id}
                    >
                        <i className="w-1 fa fa-1x fa-edit bd-r pd-rl-1"></i>
                    </Link>
                    <a
                        className="h-hand" 
                        onClick={() => this.props.updateStatus(user.id, status.DELETE)}
                    >
                        <i className="w-1 fa fa-1x fa-trash pd-rl-1"></i>
                    </a>
                </td>
            </tr>
        );
    }
}

export default UserItem;
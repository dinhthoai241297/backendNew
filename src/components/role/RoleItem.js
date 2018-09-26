import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as roles from './../../contants/roles';

class RoleItem extends Component {

    convert = (val) => {
        switch (val) {
            case roles.VIEW: {
                return 'VIEW';
            }
            case roles.UPDATE: {
                return 'UPDATE';
            }
            case roles.ADD: {
                return 'ADD';
            }
            case roles.DELETE: {
                return 'DELETE';
            }
            case roles.ROOT: {
                return 'ROOT';
            }
        }
    }

    render() {
        let { role } = this.props;
        return (
            <tr>
                <td>{role.name}</td>
                <td>{JSON.parse(role.roles).map(this.convert).join(' - ')}</td>
                <td>{role.status.name}</td>
                <td>
                    <Link className="btn btn-warning btn-xs" to={'/role/update/' + role.id}>Sửa</Link>
                    <button className="btn btn-danger btn-xs" onClick={this.props.updateStatus}>Xóa</button>
                </td>
            </tr>
        );
    }
}

export default RoleItem;
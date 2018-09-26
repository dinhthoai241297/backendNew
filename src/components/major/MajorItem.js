import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MajorItem extends Component {
    render() {
        let { major } = this.props;
        return (
            <tr>
                <td>{major.name}</td>
                <td>{major.code}</td>
                <td>{major.school.name}</td>
                <td>{major.status.name}</td>
                <td>
                    {this.props.update &&
                        <Link className="btn btn-warning btn-xs" to={'/major/update/' + major.id}>Sửa</Link>
                    }
                    {this.props.delete &&
                        <button className="btn btn-danger btn-xs" onClick={this.props.updateStatus}>Xóa</button>
                    }
                </td>
            </tr>
        );
    }
}

export default MajorItem;
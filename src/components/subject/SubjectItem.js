import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SubjectItem extends Component {
    render() {
        let { subject } = this.props;
        return (
            <tr>
                <td>{subject.name}</td>
                <td>{subject.description}</td>
                <td>{subject.status.name}</td>
                <td>
                    {this.props.update &&
                        <Link className="btn btn-warning btn-xs" to={'/subject/update/' + subject.id}>Sửa</Link>
                    }
                    {this.props.delete &&
                        <button className="btn btn-danger btn-xs" onClick={this.props.updateStatus}>Xóa</button>
                    }
                </td>
            </tr>
        );
    }
}

export default SubjectItem;
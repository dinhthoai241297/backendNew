import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class SubjectItem extends Component {
    render() {
        let { subject } = this.props;
        return (
            <tr>
                <td>{subject.name}</td>
                <td>{subject.description}</td>
                <td>
                    <Link className="btn btn-warning btn-xs" to={'/subject/update/' + subject.id}>Sửa</Link>
                    <button className="btn btn-danger btn-xs" onClick={() => this.props.deleteSubject(subject.id)}>Xóa</button>
                </td>
            </tr>
        );
    }
}

export default SubjectItem;
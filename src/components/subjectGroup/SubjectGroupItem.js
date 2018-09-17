import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class SubjectGroupItem extends Component {
    render() {
        let { subjectGroup } = this.props;
        return (
            <tr>
                <td>{subjectGroup.id}</td>
                <td>{subjectGroup.name}</td>
                <td>{subjectGroup.description}</td>
                <td>
                    <button className="btn btn-success btn-xs">Xem</button>
                </td>
                <td>
                    <Link className="btn btn-warning btn-xs" to={'/subjectGroup/update/' + subjectGroup.id}>Sửa</Link>
                    <button className="btn btn-danger btn-xs" onClick={() => this.props.deleteSubjectGroup(subjectGroup.id)}>Xóa</button>
                </td>
            </tr>
        );
    }
}

export default SubjectGroupItem;
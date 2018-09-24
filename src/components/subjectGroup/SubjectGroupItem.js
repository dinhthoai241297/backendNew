import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class SubjectGroupItem extends Component {
    render() {
        let { subjectGroup } = this.props;
        return (
            <tr>
                <td>{subjectGroup.code}</td>
                <td>{JSON.parse(subjectGroup.subjects).map((el, index) => <Fragment key={index}>{el}<br /></Fragment>)}</td>
                <td>{subjectGroup.description}</td>
                <td>
                    <Link className="btn btn-warning btn-xs" to={'/subjectGroup/update/' + subjectGroup.id}>Sửa</Link>
                    <button className="btn btn-danger btn-xs" onClick={() => this.props.deleteSubjectGroup(subjectGroup.id)}>Xóa</button>
                </td>
            </tr>
        );
    }
}

export default SubjectGroupItem;
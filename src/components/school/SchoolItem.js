import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SchoolItem extends Component {
    render() {
        let { school } = this.props;
        return (
            <tr>
                <td>{school.name}</td>
                <td>{school.description}</td>
                <td>{school.province.name}</td>
                <td>{school.image}</td>
                <td>{school.status.name}</td>
                <td>
                    {this.props.update &&
                        <Link className="btn btn-warning btn-xs" to={'/school/update/' + school.id}>Sửa</Link>
                    }
                    {this.props.delete &&
                        <button className="btn btn-danger btn-xs" onClick={() => this.props.deleteSchool(school.id)}>Xóa</button>
                    }
                </td>
            </tr>
        );
    }
}

export default SchoolItem;
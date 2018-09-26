import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class MarkItem extends Component {
    render() {
        let { mark } = this.props;
        return (
            <tr>
                <td>{mark.school.name}</td>
                <td>{mark.major.name}</td>
                <td>{mark.year}</td>
                <td>{mark.aspiration}</td>
                <td>{mark.mark}</td>
                <td>{JSON.parse(mark.subjectGroups).map((sg, index) => (<Fragment key={index}>{sg}<br /></Fragment>))}</td>
                <td>{mark.note}</td>
                <td>{mark.status.name}</td>
                <td>
                    {this.props.update &&
                        <Link className="btn btn-warning btn-xs" to={'/mark/update/' + mark.id}>Sửa</Link>
                    }
                    {this.props.delete &&
                        <button className="btn btn-danger btn-xs" onClick={this.props.updateStatus}>Xóa</button>
                    }
                </td>
            </tr>
        );
    }
}

export default MarkItem;
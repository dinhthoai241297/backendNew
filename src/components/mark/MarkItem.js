import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as status from './../../contants/status';

class MarkItem extends Component {
    render() {
        let { mark } = this.props;
        let icon = status.renIcon(mark.status.status);
        return (
            <tr>
                <td>{mark.school.name}</td>
                <td>{mark.major.name}</td>
                <td>{mark.year}</td>
                <td>{mark.aspiration}</td>
                <td>{mark.mark}</td>
                <td>{mark.subjectGroups.map((sg, index) => (<Fragment key={index}>{sg !== null ? sg.code : ''}<br /></Fragment>))}</td>
                <td>{mark.note}</td>
                <td className="text-center">
                    {this.props.update &&
                        <Fragment>
                            <a
                                data-toggle="tooltip"
                                title={mark.status.status === status.ACTIVE ? 'lock' : 'active'}
                                className="h-hand" onClick={this.props.updateStatus}
                                onClick={() => this.props.updateStatus(mark.id, mark.status.status === status.ACTIVE ? status.LOCK : status.ACTIVE)}
                            >
                                <i className={"w-1 fa fa-1x pd-rl-1 bd-r " + icon}></i>
                            </a>
                            <Link to={'/mark/update/' + mark.id}>
                                <i className="w-1 fa fa-1x fa-edit bd-r pd-rl-1"></i>
                            </Link>
                        </Fragment>
                    }
                    {this.props.delete &&
                        <a
                            className="h-hand"
                            onClick={() => this.props.updateStatus(mark.id, status.DELETE)}
                        >
                            <i className="w-1 fa fa-1x fa-trash pd-rl-1"></i>
                        </a>
                    }
                </td>
            </tr>
        );
    }
}

export default MarkItem;
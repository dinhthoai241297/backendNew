import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SectorItem extends Component {
    render() {
        let { sector } = this.props;
        return (
            <tr>
                <td>{sector.name}</td>
                <td>{sector.description}</td>
                <td>{sector.status.name}</td>
                <td>
                    {this.props.update &&
                        <Link className="btn btn-warning btn-xs" to={'/sector/update/' + sector.id}>Sửa</Link>
                    }
                    {this.props.delete &&
                        <button className="btn btn-danger btn-xs" onClick={() => this.props.deleteSector(sector.id)}>Xóa</button>
                    }
                </td>
            </tr>
        );
    }
}

export default SectorItem;
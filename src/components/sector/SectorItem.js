import React, { Component } from 'react';

class SectorItem extends Component {
    render() {
        let { sector } = this.props;
        return (
            <tr>
                <td>{sector.id}</td>
                <td>{sector.name}</td>
                <td>{sector.description}</td>
                <td>
                    <button className="btn btn-success btn-xs">Xem</button>
                </td>
                <td>
                    <button className="btn btn-warning btn-xs">Sửa</button>
                    <button className="btn btn-danger btn-xs">Xóa</button>
                </td>
            </tr>
        );
    }
}

export default SectorItem;
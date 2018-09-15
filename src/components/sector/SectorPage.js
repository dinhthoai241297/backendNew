import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SectorPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sectors: []
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.sectors);
        this.setState({
            sectors: nextProps.sectors
        });
    }

    showSector(sectors) {
        let rs = null;
        if (sectors.length > 0) {
            rs = sectors.map((sector, index) => {
                return (
                    <p key={index} >{sector.name}</p>
                );
            });
        }
        return rs;
    }

    render() {
        return (
            <div>
                <h1>
                    This is Sector page.
                </h1>
                {this.showSector(this.state.sectors)}
            </div>
        );
    }
}

SectorPage.propTypes = {
    sectors: PropTypes.arrayOf(PropTypes.shape({
        createdAt: PropTypes.number,
        updatedAt: PropTypes.number,
        description: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string
    }))
}

const mapStateToProps = (state, props) => {
    return {
        sectors: state.SectorReducer
    }
}

export default connect(mapStateToProps, null)(SectorPage);
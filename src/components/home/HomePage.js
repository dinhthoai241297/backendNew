import React, { Component } from 'react';
import request from 'superagent';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount() {

    }


    render() {
        return (
            <div>
                <h1>
                    This is a home page.
                </h1>
                <h3>{this.state.username}</h3>
                <h3>{this.state.password}</h3>
            </div>
        );
    }
}

export default HomePage;

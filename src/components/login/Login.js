import React, { Component } from 'react';
import * as actions from './../../actions/UserActions';
import { connect } from 'react-redux';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    onChange = (e) => {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    login = (e) => {
        e.preventDefault();
        let { username, password } = this.state;
        this.props.login(username, password);
    }

    render() {
        return (
            <div className="container">
                <div className="row" style={{ marginTop: '20vh' }}>
                    <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                        <div className="box box-info">
                            <div className="box-header with-border text-center">
                                <h3 className="box-title">Đăng nhập</h3>
                            </div>
                            <form className="form-horizontal">
                                <div className="box-body">
                                    <div className="col-xs-12">
                                        <div className="form-group">
                                            <label htmlFor="username">Username</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="username"
                                                name="username"
                                                placeholder="Enter Username"
                                                value={this.state.username}
                                                onChange={(e) => this.onChange(e)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                name="password"
                                                placeholder="Enter Password"
                                                value={this.state.password}
                                                onChange={(e) => this.onChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* /.box-body */}
                                <div className="box-footer">
                                    <button
                                        type="submit"
                                        className="btn btn-primary pull-right"
                                        onClick={(e) => this.login(e)}
                                    >Đăng nhập</button>
                                </div>
                                {/* /.box-footer */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        login: (username, password) => dispatch(actions.loginApi(username, password))
    }
}

export default connect(null, mapDispatchToProps)(Login);
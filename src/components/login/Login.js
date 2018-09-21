import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div className="container">
                <div className="row" style={{marginTop: '20vh'}}>
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
                                            <input type="text" className="form-control" id="username" name="username" placeholder="Enter Username" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control" id="password" name="password" placeholder="Enter Password" />
                                        </div>
                                    </div>
                                </div>
                                {/* /.box-body */}
                                <div className="box-footer">
                                    <button type="submit" className="btn btn-primary pull-right">Đăng nhập</button>
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

export default Login;
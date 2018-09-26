import React, { Component, Fragment } from 'react';
import Header from './components/main/Header';
import Sidebar from './components/main/Sidebar';
import Footer from './components/main/Footer';
import ControlSidebar from './components/main/ControlSidebar';

class App extends Component {
    render() {
        let { user } = this.props;
        return (
            <Fragment>
                {/* Main Header */}
                <Header user={user} />
                {/* Left side column. contains the logo and sidebar */}
                <Sidebar user={user} />
                {/* Content Wrapper. Contains page content */}
                <div className="content-wrapper">
                    {this.props.children}
                </div>
                {/* /.content-wrapper */}
                {/* Main Footer */}
                <Footer />
                {/* Control Sidebar */}
                <ControlSidebar />
                {/* /.control-sidebar */}
                {/* Add the sidebar's background. This div must be placed immediately after the control sidebar */}
                <div className="control-sidebar-bg" />
            </Fragment>
        );
    }
}

export default App;
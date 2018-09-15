import React, { Component, Fragment } from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Content from './components/content/Content';
import Footer from './components/footer/Footer';
import ControlSidebar from './components/controlSidebar/ControlSidebar';

class App extends Component {
    render() {
        return (
            <Fragment>
                {/* Main Header */}
                <Header />
                {/* Left side column. contains the logo and sidebar */}
                <Sidebar />
                {/* Content Wrapper. Contains page content */}
                <Content />
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
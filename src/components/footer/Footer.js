import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="main-footer">
                {/* To the right */}
                <div className="pull-right hidden-xs">
                    Anything you want
                        </div>
                {/* Default to the left */}
                <strong>Copyright © 2016 <a href="#">Company</a>.</strong> All rights reserved.
            </footer>
        );
    }
}

export default Footer;
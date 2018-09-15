import React, { Component, Fragment } from 'react';
import { Link, Route } from 'react-router-dom';

const MyLink = ({ children, nativeClass, ...linkProps }) => (
    <Route
        path={linkProps.to}
        exact={linkProps.activeOnlyWhenExact}
        children={({ match }) => (
            <li className={nativeClass + (match ? ' menu-open active' : '')}>
                <Link to={linkProps.to}>{linkProps.label}</Link>
                {children}
            </li>
        )}
    />
);

class Sidebar extends Component {
    render() {
        return (
            <aside className="main-sidebar">
                {/* sidebar: style can be found in sidebar.less */}
                <section className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src="https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                        </div>
                        <div className="pull-left info">
                            <p>Alexander Pierce</p>
                            {/* Status */}
                            <a href="#"><i className="fa fa-circle text-success" /> Online</a>
                        </div>
                    </div>
                    {/* search form (Optional) */}
                    <form action="#" method="get" className="sidebar-form">
                        <div className="input-group">
                            <input type="text" name="q" className="form-control" placeholder="Search..." />
                            <span className="input-group-btn">
                                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search" />
                                </button>
                            </span>
                        </div>
                    </form>
                    {/* /.search form */}
                    {/* Sidebar Menu */}
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="header">HEADER</li>
                        {/* Optionally, you can add icons to the links */}
                        <MyLink
                            to="/"
                            activeOnlyWhenExact={true}
                            label={<Fragment><i className="fa fa-dashboard" /> <span>Dashboard</span></Fragment>}
                        />
                        <MyLink
                            to="/sector"
                            activeOnlyWhenExact={false}
                            nativeClass="treeview"
                            label={
                                <Fragment>
                                    <i className="fa fa-plus" /> <span>Sector</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-left pull-right" />
                                    </span>
                                </Fragment>
                            }
                        >
                            {
                                <ul className="treeview-menu">
                                    <MyLink
                                        to="/sector/list"
                                        activeOnlyWhenExact={true}
                                        label={
                                            <Fragment>
                                                <i className="fa fa-circle-o"></i> List Sector
                                            </Fragment>
                                        }
                                    />
                                    <MyLink
                                        to="/sector/edit/new"
                                        activeOnlyWhenExact={true}
                                        label={
                                            <Fragment>
                                                <i className="fa fa-circle-o"></i> Add Sector
                                            </Fragment>
                                        }
                                    />
                                </ul>
                            }
                        </MyLink>
                    </ul>
                    {/* /.sidebar-menu */}
                </section>
                {/* /.sidebar */}
            </aside>
        );
    }
}

export default Sidebar;
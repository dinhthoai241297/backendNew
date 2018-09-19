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
                                        to="/sector/add"
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
                        <MyLink
                            to="/province"
                            activeOnlyWhenExact={false}
                            nativeClass="treeview"
                            label={
                                <Fragment>
                                    <i className="fa fa-plus" /> <span>Province</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-left pull-right" />
                                    </span>
                                </Fragment>
                            }
                        >
                            {
                                <ul className="treeview-menu">
                                    <MyLink
                                        to="/province/list"
                                        activeOnlyWhenExact={true}
                                        label={
                                            <Fragment>
                                                <i className="fa fa-circle-o"></i> List Province
                                            </Fragment>
                                        }
                                    />
                                    <MyLink
                                        to="/province/add"
                                        activeOnlyWhenExact={true}
                                        label={
                                            <Fragment>
                                                <i className="fa fa-circle-o"></i> Add Province
                                            </Fragment>
                                        }
                                    />
                                </ul>
                            }
                        </MyLink>
                        <MyLink
                            to="/school"
                            activeOnlyWhenExact={false}
                            nativeClass="treeview"
                            label={
                                <Fragment>
                                    <i className="fa fa-plus" /> <span>School</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-left pull-right" />
                                    </span>
                                </Fragment>
                            }
                        >
                            {
                                <ul className="treeview-menu">
                                    <MyLink
                                        to="/school/list"
                                        activeOnlyWhenExact={true}
                                        label={
                                            <Fragment>
                                                <i className="fa fa-circle-o"></i> List School
                                            </Fragment>
                                        }
                                    />
                                    <MyLink
                                        to="/school/add"
                                        activeOnlyWhenExact={true}
                                        label={
                                            <Fragment>
                                                <i className="fa fa-circle-o"></i> Add School
                                            </Fragment>
                                        }
                                    />
                                </ul>
                            }
                        </MyLink>
                        <MyLink
                            to="/mark"
                            activeOnlyWhenExact={false}
                            nativeClass="treeview"
                            label={
                                <Fragment>
                                    <i className="fa fa-plus" /> <span>Mark</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-left pull-right" />
                                    </span>
                                </Fragment>
                            }
                        >
                            {
                                <ul className="treeview-menu">
                                    <MyLink
                                        to="/mark/list"
                                        activeOnlyWhenExact={true}
                                        label={
                                            <Fragment>
                                                <i className="fa fa-circle-o"></i> List Mark
                                            </Fragment>
                                        }
                                    />
                                    <MyLink
                                        to="/mark/add"
                                        activeOnlyWhenExact={true}
                                        label={
                                            <Fragment>
                                                <i className="fa fa-circle-o"></i> Add Mark
                                            </Fragment>
                                        }
                                    />
                                </ul>
                            }
                        </MyLink>
                        <MyLink
                            to="/major"
                            activeOnlyWhenExact={false}
                            nativeClass="treeview"
                            label={
                                <Fragment>
                                    <i className="fa fa-plus" /> <span>Major</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-left pull-right" />
                                    </span>
                                </Fragment>
                            }
                        >
                            {
                                <ul className="treeview-menu">
                                    <MyLink
                                        to="/major/list"
                                        activeOnlyWhenExact={true}
                                        label={
                                            <Fragment>
                                                <i className="fa fa-circle-o"></i> List Major
                                            </Fragment>
                                        }
                                    />
                                    <MyLink
                                        to="/major/add"
                                        activeOnlyWhenExact={true}
                                        label={
                                            <Fragment>
                                                <i className="fa fa-circle-o"></i> Add Major
                                            </Fragment>
                                        }
                                    />
                                </ul>
                            }
                        </MyLink>
                        <MyLink
                            to="/subject"
                            activeOnlyWhenExact={false}
                            nativeClass="treeview"
                            label={
                                <Fragment>
                                    <i className="fa fa-plus" /> <span>Subject</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-left pull-right" />
                                    </span>
                                </Fragment>
                            }
                        >
                            {
                                <ul className="treeview-menu">
                                    <MyLink
                                        to="/subject/list"
                                        activeOnlyWhenExact={true}
                                        label={
                                            <Fragment>
                                                <i className="fa fa-circle-o"></i> List Subject
                                            </Fragment>
                                        }
                                    />
                                    <MyLink
                                        to="/subject/add"
                                        activeOnlyWhenExact={true}
                                        label={
                                            <Fragment>
                                                <i className="fa fa-circle-o"></i> Add Subject
                                            </Fragment>
                                        }
                                    />
                                </ul>
                            }
                        </MyLink>
                        <MyLink
                            to="/subjectGroup"
                            activeOnlyWhenExact={false}
                            nativeClass="treeview"
                            label={
                                <Fragment>
                                    <i className="fa fa-plus" /> <span>SubjectGroup</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-left pull-right" />
                                    </span>
                                </Fragment>
                            }
                        >
                            {
                                <ul className="treeview-menu">
                                    <MyLink
                                        to="/subjectGroup/list"
                                        activeOnlyWhenExact={true}
                                        label={
                                            <Fragment>
                                                <i className="fa fa-circle-o"></i> List SubjectGroup
                                            </Fragment>
                                        }
                                    />
                                    <MyLink
                                        to="/subjectGroup/add"
                                        activeOnlyWhenExact={true}
                                        label={
                                            <Fragment>
                                                <i className="fa fa-circle-o"></i> Add SubjectGroup
                                            </Fragment>
                                        }
                                    />
                                </ul>
                            }
                        </MyLink>
                        <MyLink
                            to="/test"
                            activeOnlyWhenExact={false}
                            nativeClass="treeview"
                            label={
                                <Fragment>
                                    <i className="fa fa-plus" /> <span>Test</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-left pull-right" />
                                    </span>
                                </Fragment>
                            }
                        >
                            {
                                <ul className="treeview-menu">
                                    <MyLink
                                        to="/test"
                                        activeOnlyWhenExact={true}
                                        label={
                                            <Fragment>
                                                <i className="fa fa-circle-o"></i> Test
                                            </Fragment>
                                        }
                                    />
                                </ul>
                            }
                        </MyLink>
                        <MyLink
                            to="/test"
                            activeOnlyWhenExact={false}
                            nativeClass="treeview"
                            label={
                                <Fragment>
                                    <i className="fa fa-plus" /> <span>Test</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-left pull-right" />
                                    </span>
                                </Fragment>
                            }
                        >
                            {
                                <ul className="treeview-menu">
                                    <MyLink
                                        to="/test"
                                        activeOnlyWhenExact={true}
                                        label={
                                            <Fragment>
                                                <i className="fa fa-circle-o"></i> Test
                                            </Fragment>
                                        }
                                    />
                                </ul>
                            }
                        </MyLink>
                        <MyLink
                            to="/test"
                            activeOnlyWhenExact={false}
                            nativeClass="treeview"
                            label={
                                <Fragment>
                                    <i className="fa fa-plus" /> <span>Test</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-left pull-right" />
                                    </span>
                                </Fragment>
                            }
                        >
                            {
                                <ul className="treeview-menu">
                                    <MyLink
                                        to="/test"
                                        activeOnlyWhenExact={true}
                                        label={
                                            <Fragment>
                                                <i className="fa fa-circle-o"></i> Test
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
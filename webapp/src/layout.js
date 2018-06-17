import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import Navbar from './page/layouts/navbar';
import {TITLE} from './config';

const Layout = (props) => ({
  render() {
    let current_path = props.match.path || null;
    let topTitlePage = props.children.props.topTitlePage;
    let titlePage = props.children.props.titlePage + ' - ' + TITLE;
    return (
      <DocumentTitle title={titlePage || TITLE}>
        <div className="app-content">
          <Navbar {...props}/>
          {props.children}
        </div>
      </DocumentTitle>
    );
  }
});

Layout.propTypes = {
  
};

export default Layout;
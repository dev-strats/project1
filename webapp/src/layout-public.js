import React from 'react';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import {TITLE} from './config';
import Navbar from './page/layouts/navbar';


const LayoutPublic = (props) => ({
  render() {
    let titlePage = props.children.props.titlePage + ' - ' + TITLE;
    return (
      	<DocumentTitle title={titlePage || TITLE}>
      		<div className=" app-content p-0">
	          	<Navbar {...props}/>
	          	{props.children}
	        </div>
      	</DocumentTitle>
    );
  }
});

LayoutPublic.propTypes = {
  children: PropTypes.node,
};

export default LayoutPublic;
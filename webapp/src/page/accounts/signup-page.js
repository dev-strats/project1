import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import { red500 } from 'material-ui/styles/colors';
import {fontSizeBase, primary_color, searchInputHeight, fifthTextColor } from '../../config';


const styles = {
  underlineFocusStyle: {
    borderColor: primary_color,
  },
  underlineStyle: {
    borderColor: fifthTextColor,
  },
  hintStyle: {
  },
  errorStyle:{
    top: '10px',
  },
  buttonStyle: {
    // borderRadius: '5px',
  },
  RaisedButton: {
    // borderRadius: '10px',
  },
};

const LoginPage = ({
  onSubmit,
  onChange,
  user,
  formErrors,
  valid
  }) => (
    <div id="login">
      <div className="content">
        <div className="row child">
          <div className="col-lg-4 col-lg-offset-4 col-sm-6 col-sm-offset-3 col-xs-12">
            <div className="login-center">
              <form id="login_form" action="/" onSubmit={onSubmit}>
                <h3 className="text-center p-b-20 m-t-0">Signup</h3>
                <div className="m-t-25">
                  <TextField hintText="First Name" 
                            fullWidth={true} 
                            className="input-custom icon-input icon-user" 
                            underlineFocusStyle={styles.underlineFocusStyle}
                            underlineStyle={styles.underlineStyle}
                            hintStyle={styles.hintStyle}
                            name="first_name"
                            value={user.first_name}
                            onChange={onChange}
                            type="text"
                            errorText=""
                            errorStyle={styles.errorStyle}
                      />
                </div>
                <div className="m-t-25">
                  <TextField hintText="Last Name" 
                            fullWidth={true} 
                            className="input-custom icon-input icon-user" 
                            underlineFocusStyle={styles.underlineFocusStyle}
                            underlineStyle={styles.underlineStyle}
                            hintStyle={styles.hintStyle}
                            name="last_name"
                            value={user.last_name}
                            onChange={onChange}
                            type="text"
                            errorText=""
                            errorStyle={styles.errorStyle}
                      />
                </div>
                <div className="m-t-25">
                  <TextField hintText="Email Address" 
                            fullWidth={true} 
                            className="input-custom icon-input icon-email" 
                            underlineFocusStyle={styles.underlineFocusStyle}
                            underlineStyle={styles.underlineStyle}
                            hintStyle={styles.hintStyle}
                            name="email"
                            value={user.email}
                            onChange={onChange}
                            type="email"
                            errorText=""
                            errorStyle={styles.errorStyle}
                      />
                </div>
                <div className="m-t-25">
                  <TextField  hintText="Password" 
                              fullWidth={true} 
                              className="input-custom icon-input icon-lock" 
                              underlineFocusStyle={styles.underlineFocusStyle} 
                              underlineStyle={styles.underlineStyle}
                              hintStyle={styles.hintStyle}
                              name="password"
                              type="password"
                              value={user.password}
                              onChange={onChange}
                              errorText=""
                              errorStyle={styles.errorStyle}
                      />
                </div>
                { !valid.api && <p className="text-danger m-t-25">{formErrors.api}</p> }
                <RaisedButton type="submit" 
                    label="Signup" primary={true} 
                    className="m-t-25 m-b-25 custom-button primary-color" 
                    style={styles.RaisedButton} 
                    buttonStyle={styles.buttonStyle} disabled={!valid.form} />
                <div className="m-t-15 m-b-15">
                  Forgot password? <Link to="/forgot-password" className="link-custom">Reset</Link>
                </div>
                <div className="m-t-15 m-b-15">
                  Have an account? <Link to="/login" className="link-custom">Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
);

LoginPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  formErrors: PropTypes.object.isRequired,
  valid: PropTypes.object.isRequired
};

export default LoginPage;

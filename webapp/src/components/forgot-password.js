import React, { Component } from 'react';
import Title, { flushTitle } from 'react-title-component';
import validator from 'validator';

import ForgotPasswordPage from '../page/accounts/forgot-password-page';
import Auth from '../auth';


class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
            },
            valid:{
                email: false,
                form: false,
                api: false,
                api_type: false,
            },
            formErrors:{
                email: '',
                api: '',
                api_type: '',
            },
        };
        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.validateField = this.validateField.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    processForm(event) {
        event.preventDefault();
        Auth.authenticateForgotPassword(this.state.user).then((res)=>{
            let valid = this.state.valid;
            let formErrors = this.state.formErrors;
            if(res.status > 0){
                valid.api_type = false;
                formErrors.api_type = res.success;
            }else{
                valid.api = false;
                formErrors.api = res.error;
            }
            this.setState({
                valid: valid,
                formErrors: formErrors,
            });
        })
        
    }

    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        const value = event.target.value;
        user[field] = value;

        this.setState({
          user
        },() => { this.validateField(field, value)});
    }

    validateField(fieldName, value) {

        let valid = this.state.valid;
        let formErrors = this.state.formErrors;
        valid.api = false;
        formErrors.api = '';
        valid.api_type = false;
        formErrors.api_type = '';
        switch(fieldName) {
            case 'email':
                valid.email = validator.isEmail(value);
                formErrors.email = valid.email ? '': fieldName + ' is invalid';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: formErrors,
            valid: valid
        }, this.validateForm);
    }

    validateForm() {
        let value = this.state.valid;
        value.form = false;
        if(value.email){
            value.form = true;
        }
        this.setState({
            valid: value
        });
    }

    render() {
        return (
            <ForgotPasswordPage onSubmit = { this.processForm } onChange = { this.changeUser } user = { this.state.user } valid={this.state.valid} formErrors={this.state.formErrors}/> 
        )
    }
}

ForgotPassword.defaultProps = {
    titlePage: 'Forgot Password',
};


export default ForgotPassword;
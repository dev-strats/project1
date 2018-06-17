import React, { Component } from 'react';
import Title, { flushTitle } from 'react-title-component';
import validator from 'validator';

import LoginPage from '../page/accounts/login-page';
import Auth from '../auth';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                password: '',
            },
            valid:{
                email: false,
                password: false,
                form: false,
                api: false,
            },
            formErrors:{
                email: '',
                password: '',
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
        // Auth.authenticateUser(this.state.user);
        // this.props.history.push("/");
        Auth.authenticateCheckUser(this.state.user).then((res)=>{
            if(res.status > 0){
                Auth.authenticateUser(res.data);
                this.props.history.push("/");
            }else{
                let valid = this.state.valid;
                let formErrors = this.state.formErrors;
                valid.api = false;
                formErrors.api = res.error;
                this.setState({
                    valid: valid,
                    formErrors: formErrors,
                });
            }
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

        switch(fieldName) {
            case 'email':
                valid.email = validator.isEmail(value);
                formErrors.email = valid.email ? '': fieldName + ' is invalid';
                break;
            case 'password':
                valid.password = value.length >= 2;
                formErrors.password = valid.password ? '': fieldName + ' is too short';
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
        if(value.email && value.password){
            value.form = true;
        }
        this.setState({
            valid: value
        });
    }

    render() {
        return (
            <LoginPage onSubmit = { this.processForm } onChange = { this.changeUser } user = { this.state.user } valid={this.state.valid} formErrors={this.state.formErrors}/> 
        )
    }
}

Login.defaultProps = {
    titlePage: 'Login',
};


export default Login;
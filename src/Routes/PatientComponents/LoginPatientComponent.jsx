import React, { Component } from 'react'
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import AlertifyService from '../../services/AlertifyService';
import PatientService from '../../services/PatientService';

class LoginPatientComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        // this.saveUser = this.saveUser.bind(this);
    }

    controlQuickly() {
        return this.state.email == null || this.state.password == null;
    }
    saveUser = (e) => {
        if (!this.controlQuickly()) {
            e.preventDefault();
            let patient = {
                email : this.state.email,
                password : this.state.password,
            }
            PatientService.loginPatient(patient)
                .then(res => {
                    console.log(res);
                    window.localStorage.setItem("token", res.data.token);
                    window.localStorage.setItem("ehrbID", res.data.ehrbID);
                    this.setState({ message: res.data.message });
                    alertify.success("Patient Login Succesfull");
                    this.props.history.push('/recieved-consent-requests');
                    window.location.reload();
                }).catch((error) => {
                    console.log(error.response)
                    if (error.response) {
                        this.setState({ errorMessage: error.response.data.message, id: null });
                        AlertifyService.alert(error.response.data.message);
                    }
                    else if (error.request) console.log(error.request);
                    else console.log(error.message);
                });
        } else
            AlertifyService.alert('Error');
    }
    onChangeData(type, data) {
        const stateData = this.state;
        stateData[type] = data;
        this.setState({ stateData });
    }

    render() {
        let { email, password } = this.state;
        return (
            <div className="row">
                <div className="col-sm-8">
                    <h2 className="text-center">LOGIN PATIENT</h2>
                    <form>
                        <div className="form-group">
                            <label>Email:</label>
                            <input placeholder="Email" name="email" className="form-control" value={email} onChange={e => this.onChangeData('email', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input placeholder="Password" name="password" className="form-control" type="password" value={password} onChange={e => this.onChangeData('password', e.target.value)} />
                        </div>
                        <button className="btn btn-success" type="button" onClick={this.saveUser}>Login</button>
                    </form>
                    {/* <button className='btn btn-primary mt-2'
                        onClick={() => this.props.history.push('/add-patient')}> Not Registered? Sign Up </button> */}
                </div>
                <div className="col"></div>
                <div className="col-lg-3">
                    <img style={{ height: 200 }} src="https://i1.wp.com/www.nosinmiubuntu.com/wp-content/uploads/2013/02/New-Database.png?w=770" alt="" />
                </div>
            </div>
        );
    }
}

export default LoginPatientComponent;
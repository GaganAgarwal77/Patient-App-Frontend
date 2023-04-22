import React, { Component } from 'react'
import PatientService from '../../services/PatientService';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import AlertifyService from '../../services/AlertifyService';

class AddPatientComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastname: '',
            email: '',
            phoneNo:'',
            gender: 'Male',
            password: '',
            city: '',
            bornDate: new Date(),
            status: 1,
            cities: [],
            ehrbID: ''
        }
        // this.saveUser = this.saveUser.bind(this);
    }
    controlQuickly() {
        return this.state.name === null || this.state.name === '' || this.state.name === ' ' ||
            this.state.lastname === null || this.state.lastname === '' || this.state.lastname === ' ';
    }
    saveUser = (e) => {
        if (!this.controlQuickly()) {
            e.preventDefault();
            let patient = {
                firstName : this.state.name,
                lastName : this.state.lastname,
                emailAddress : this.state.email,
                password : this.state.password,
                phoneString : this.state.phoneNo,
                gender : this.state.gender,
                address : this.state.city,
                ehrbID : this.state.ehrbID,
            }
            PatientService.addPatient(patient)
                .then(res => {
                    this.setState({ message: 'User added successfully.' });
                    alertify.success("Adding patient is ok");
                    this.props.history.push('/login-patient');
                }).catch((error) => {
                    console.log(error.response)
                    if (error.response) {
                        this.setState({ errorMessage: error.response.data.message, id: null });
                        AlertifyService.alert(error.response.data.message);
                        //this.props.history.push('/patients');
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
        console.log(type, data);
        this.setState({ stateData });
    }

    render() {
        let { ehrbID, name, lastname,phoneNo, email, password, gender, city } = this.state;
        return (
            <div className="row">

                <div className="col-sm-8">
                    <h2 className="text-center">REGISTER</h2>
                    <form>
                    <div className="form-group">
                            <label>EHRB ID *</label>
                            <input type="text" placeholder="EHRB ID" name="ehrbID" className="form-control" value={ehrbID} onChange={e => this.onChangeData('ehrbID', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>First Name *</label>
                            <input type="text" placeholder="First Name" name="name" className="form-control" value={name} onChange={e => this.onChangeData('name', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Last Name *</label>
                            <input placeholder="Last name" name="lastname" className="form-control" value={lastname} onChange={e => this.onChangeData('lastname', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Phone *</label>
                            <input placeholder="Last name" name="phone No" className="form-control" value={phoneNo} onChange={e => this.onChangeData('phoneNo', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input placeholder="Email" name="email" className="form-control" value={email} onChange={e => this.onChangeData('email', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input placeholder="Password" name="password" className="form-control" value={password} onChange={e => this.onChangeData('password', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Gender *</label>
                            <select className="form-control"
                                value={gender}
                                onChange={e => this.onChangeData('gender', e.target.value)} >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Address *</label>
                            <input type="text" placeholder="Address" name="city" className="form-control" value={city} onChange={e => this.onChangeData('city', e.target.value)} />
                        </div>
                        <button className="btn btn-success" type="button" onClick={this.saveUser}>Register</button>
                    </form>
                    <button className='btn btn-primary mt-2'
                        onClick={() => this.props.history.push('/login-patient')}> Already Registered? Login </button>
                </div>
                <div className="col"></div>
                <div className="col-lg-3">
                    <img style={{ height: 200 }} src="https://i1.wp.com/www.nosinmiubuntu.com/wp-content/uploads/2013/02/New-Database.png?w=770" alt="" />
                </div>

            </div>
        );
    }
}

export default AddPatientComponent;
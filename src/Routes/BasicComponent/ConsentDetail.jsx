import React, { Component } from 'react'
import Moment from 'react-moment'
import { withRouter } from 'react-router'

class ProblemDetail extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
        }
        this.openReceipeForm = this.openReceipeForm.bind(this);
    }

    openReceipeForm(id, problemid){
        window.localStorage.setItem("patientID", id);
        window.localStorage.setItem("problemID", problemid);
        this.props.history.push('/problem/receipe-form');
    }
    render() {
        return (
            <div>
                <div className="card" >

                    <div className="card-header"><h3> Consent Detail</h3> </div>
                    <ul className="text-left list-group list-group-flush">
                        <li className="list-group-item"> <b>Transaction ID: </b> {this.props.consentObject.txnID} </li>
                        <li className="list-group-item"> <b>HIU Name: </b> {this.props.consentObject.hiuName} </li>
                        <li className="list-group-item"> <b>HIP Name: </b> {this.props.consentObject.hipName} </li>
                        <li className="list-group-item"> <b>Doctor Name: </b> {this.props.consentObject.doctorName} </li>
                        <li className="list-group-item"> <b>Consent ID: </b> {this.props.consentObject.consentID} </li>
                        <li className="list-group-item"> <b>EHRB ID: </b> {this.props.consentObject.ehrbID} </li>
                        <li className="list-group-item"> <b>HIU ID: </b> {this.props.consentObject.hiuID} </li>
                        <li className="list-group-item"> <b>HIP ID: </b> {this.props.consentObject.hipID} </li>
                        <li className="list-group-item"> <b>Doctor ID: </b> {this.props.consentObject.doctorID} </li>
                        <li className="list-group-item"> <b>HI Type: </b> {this.props.consentObject.hiType?.toString()} </li>
                        <li className="list-group-item"> <b>Departments: </b> {this.props.consentObject.departments?.toString()} </li>
                        <li className="list-group-item"> <b>Consent Description: </b> {this.props.consentObject.consentDescription} </li>
                        <li className="list-group-item"> <b>Consent Validity: </b> <Moment>{this.props.consentObject.consent_validity}</Moment> </li>
                        <li className="list-group-item"> <b>Date From: </b> <Moment>{this.props.consentObject.date_from}</Moment> </li>
                        <li className="list-group-item"> <b>Date To: </b> <Moment>{this.props.consentObject.date_to}</Moment> </li>
                        <li className="list-group-item"> <b>Callback URL: </b> {this.props.consentObject.callback_url} </li>
                        <li className="list-group-item"> <b>Consent Status: </b> {this.props.consentObject.consent_status} </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default withRouter(ProblemDetail)
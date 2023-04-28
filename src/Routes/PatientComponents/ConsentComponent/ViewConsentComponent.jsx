import React, { Component } from 'react'
import PatientService from '../../../services/PatientService'
import DoctorService from '../../../services/DoctorService'
//import Moment from 'react-moment';
import PatientDetail from '../../BasicComponent/PatientDetail';
import ConsentDetail from '../../BasicComponent/ConsentDetail';
import "@material/react-checkbox/dist/checkbox.css";
import AlertifyService from '../../../services/AlertifyService';
import ReceipesComponent from "../ReceipeComponent/ReceipesComponent";




export default class ViewConsentComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: window.localStorage.getItem("ehrbID"),
            consentid: props.match.params.consentid || window.localStorage.getItem("consentID"),
            patient: {},

            consentObject: {},

            transaction: {},
            consentStatus: ""
        }
        this.loadPatient = this.loadPatient.bind(this);
        this.loadConsentObject = this.loadConsentObject.bind(this);
    }
    componentDidMount() {
        this.loadPatient();
        this.loadConsentObject();
    }
    loadPatient() {
        PatientService.getPatientById(this.state.id).then(res => {
            let p = res.data;
            this.setState({ patient: p });
            this.setState({
                id: p.id,
            }); 
        }).catch((error) => {
            if (error.response) {
                AlertifyService.alert(error.response.data.message);
                this.props.history.push('/patients');
            }
            else if (error.request) console.log(error.request);
            else console.log(error.message);
        });
        // let data = {
        //     "firstName": "Ishan",
        //     "lastName": "shanware",
        //     "email": "manishpandy014@gmail.com",
        //     "ehrbID": "ahdfjkashdjfhjksadh",
        //     "password": "password2",
        //     "phoneString": "1234677890",
        //     "gender": "M",
        //     "address": "Delhi"
        // }
        // this.setState({ patient: data });
    } 
    loadConsentObject() {
        PatientService.getConsentRequestByTxnID(this.state.consentid, window.localStorage.getItem("token")).then(res => {
            let data = res.data;
            this.setState({ consentObject: data, hiType: data.hiType.toString(), departments: data.departments.toString() ,dateFrom: new Date(data.date_from), dateTo: new Date(data.date_to), valdityTill: new Date(data.consent_validity) });
        }).catch((error) => {
            if (error.response) {
                AlertifyService.alert(error.response.data.message);
                this.props.history.push('/patients');
            }
            else if (error.request) console.log(error.request);
            else console.log(error.message);    
        });
        // let data = {
        //     "txnID": "jjdhclkdlkhllcd",
        //     "hiuName": "dkdkdsdc",
        //     "hipName": "sjdsklkdskds",
        //     "doctorName": "sdjhjdjkdsc",
        //     "consentID": null,
        //     "ehrbID": "ishanthegenius",
        //     "hiuID": "sadfhjkhasfjkhasd",
        //     "hipID": "asdfhkjhasdfhjasdhkf",
        //     "doctorID": "dashfjkhasdkjf",
        //     "hiType": [
        //         "consultation"
        //     ],
        //     "departments": [
        //         "Surgery",
        //         "Cardiology"
        //     ],
        //     "consentDescription": null,
        //     "consent_validity": "2023-04-17T06:45:04.259+00:00",
        //     "date_from": "2021-03-16T06:45:04.259+00:00",
        //     "date_to": "2022-03-18T06:45:04.259+00:00",
        //     "callback_url": "http://localhost:8083/api/v1/consent/notify-status",
        //     "consent_status": "PENDING"
        // }
        // this.setState({ consentObject: data });
    }
    viewPatient(id) {
        window.localStorage.setItem("patientID", id);
        this.props.history.push('/view-patient/' + id);
    }
    openDataRequestForm(){
        window.localStorage.setItem("")
        this.props.history.push('/request-data');
    }

    createDataRequest(){
        let data = {
            txnID: this.state.transaction.txnID,
            ehrbID: this.state.consentObject.patient_ehrb_id,
            hipID: this.state.consentObject.hip_id,
            doctorID: this.state.consentObject.doctor_ehrb_id,
            request_details: {
                department: this.state.consentObject.departments,
                hiType: this.state.consentObject.hi_type,
                dateFrom: this.state.consentObject.date_from,
                dateTo: this.state.consentObject.date_to,
            },
            request_message: "message"
        }
        DoctorService.createDataRequest(data, window.localStorage.getItem("token")).then(res => {
            AlertifyService.alert("Data Request Created Successfully");
            this.props.history.push('/patients');
        }).catch((error) => {
            if (error.response) {
                AlertifyService.alert(error.response.data.message);
                this.props.history.push('/patients');
            }
            else if (error.request) console.log(error.request);
            else console.log(error.message);
        });
    }
    openReceipeForm(id, consentid) {
        window.localStorage.setItem("patientID", id);
        window.localStorage.setItem("consentID", consentid);
        this.props.history.push('/receipe-form');
    }

    acceptConsentRequest(){
        let data = this.state.consentObject;
        data.consent_status = "ACCEPTED";
        PatientService.updateConsentRequest(data, window.localStorage.getItem("token")).then(res => {
            AlertifyService.alert("Consent Request Accepted");
            this.props.history.push('/recieved-consent-requests');
        }).catch((error) => {
            if (error.response) {
                AlertifyService.alert(error.response.data.message);
            }
            else if (error.request) console.log(error.request);
            else console.log(error.message);
        });
    }

    rejectConsentRequest(){
        let data = this.state.consentObject;
        data.consent_status = "REJECTED";
        PatientService.updateConsentRequest(data, window.localStorage.getItem("token")).then(res => {
            AlertifyService.alert("Consent Request Rejected");
            this.props.history.push('/recieved-consent-requests');
        }).catch((error) => {
            if (error.response) {
                AlertifyService.alert(error.response.data.message);
            }
            else if (error.request) console.log(error.request);
            else console.log(error.message);
        });
    }

    revokeConsentRequest(){
        let data = this.state.consentObject;
        data.consent_status = "REVOKED";
        PatientService.updateConsentRequest(data, window.localStorage.getItem("token")).then(res => {
            AlertifyService.alert("Consent Request Revoked");
            this.props.history.push('/recieved-consent-requests');
        }).catch((error) => {
            if (error.response) {
                AlertifyService.alert(error.response.data.message);
            }
            else if (error.request) console.log(error.request);
            else console.log(error.message);
        });
    }

    render() {
        let {patient} = this.state;
        return (
            <div className="row">
                <div className="col-sm-12">
                    <h1>Consent Details</h1>
                    <hr />
                </div>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <button
                                className="btn btn-primary"
                                onClick={() => this.props.history.push('/recieved-consent-requests')}>
                                Back </button>
                            <hr />
                            {this.state.consentObject.consent_status === "PENDING" &&
                            <>
                            <button className='btn btn-success mr-2'>Accept</button>
                            <button className='btn btn-warning mr-2' onClick={() => this.props.history.push('/modify-consent-request')}>Modify</button>
                            <button
                                className="btn btn-danger">
                               Reject </button>
                               </>}
                               {this.state.consentObject.consent_status === "ACCEPTED" &&
                               <>
                                 <button className='btn btn-danger mr-2' onClick={() => this.props.history.push('/modify-consent-request')}>Revoke</button>
                                 </>}

                                {this.state.consentObject.consent_status === "REJECTED" &&
                                <>
                                <button disabled className='btn btn-secondary'>REJECTED</button>
                                </>}
                            <hr/>
                        </div>
                        <div className="col-lg-6">
                        <PatientDetail
                            id={patient.ehrbID}
                            name={patient.firstName}
                            lastname={patient.lastName}
                            phoneNo={patient.phoneString}
                            email={patient.email}
                            city={patient.address}
                            bornDate={Date("2000-03-25")}
                            gender={patient.gender}
                            // array={['id','name','lastname','email','city','bornDate','gender']}
                        />
                        </div>


                        <div className="col-lg-6">
                            <ConsentDetail
                                consentObject = {this.state.consentObject}
                                showButtons={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

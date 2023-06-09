import React, { Component } from 'react'
import Moment from 'react-moment';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";
import "@material/react-checkbox/dist/checkbox.css";
import AlertifyService from '../../../services/AlertifyService';
import { withRouter } from 'react-router'; 
import DoctorService from '../../../services/DoctorService';
import PatientService from '../../../services/PatientService';

let filterAllConsent = [];
let filters = ["consentName", "consentStatus"];
class ConsentRequestsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: window.localStorage.getItem("ehrbID"),
            consentObjects: [],
        }
    }
    componentDidMount() {
        this.getConsents();
    }
    getConsents() {
        PatientService.getConsentRequests(this.state.id, window.localStorage.getItem("token")).then(res => {
            let consents = res.data.consentReqs;
            console.log(consents)
            this.setState({ consentObjects: consents });
        })
        // let data = {
        //     "consentReqs": [
        //         {
        //             "txnID": "jjdhclkdlkhllcd",
        //             "hiuName": "dkdkdsdc",
        //             "hipName": "sjdsklkdskds",
        //             "doctorName": "sdjhjdjkdsc",
        //             "consentID": null,
        //             "ehrbID": "ishanthegenius",
        //             "hiuID": "sadfhjkhasfjkhasd",
        //             "hipID": "asdfhkjhasdfhjasdhkf",
        //             "doctorID": "dashfjkhasdkjf",
        //             "hiType": [
        //                 "consultation"
        //             ],
        //             "departments": [
        //                 "Surgery",
        //                 "Cardiology"
        //             ],
        //             "consentDescription": null,
        //             "consent_validity": "2023-03-17T06:45:04.259+00:00",
        //             "date_from": "2023-03-17T06:45:04.259+00:00",
        //             "date_to": "2023-03-17T06:45:04.259+00:00",
        //             "callback_url": "http://localhost:8083/api/v1/consent/notify-status",
        //             "consent_status": "PENDING"
        //         }
        //     ]
        // }
        // this.setState({ consentObjects: data.consentReqs });
    }
    onChangeSearchByStatusOrDate = (e) => { this.filterConsents(e.target.value); }
    filterConsents(value) {
        var results = [];
        if (value !== '') {
            results = filterAllConsent.filter(consentObject => {
                let find = false;
                //filters.forEach(filter=>{
                filters.forEach(function (filter) {
                    let control = consentObject[filter].toLowerCase().indexOf(value.toLowerCase());
                    if (control > -1) find = true;
                });
                return find;
            });
            this.setState({ consentObjects: results });
        }
        else { this.loadPatient(); }
    }
    limitingPatientDetail(data) {
        if (data.length < 31) return data;
        else return data.substr(0, 30) + "...";
    }
    deleteConsent(consentid) {
        alertify.confirm("Are you sure to delete the consentObject.",
            ok => {
                    //this.setState({ consentObjects: this.state.consentObjects.filter(p => p.consentid !== consentid) });
                    AlertifyService.successMessage('Deleting is ok : ');
                    this.getAllConsents();
            },
            cancel => { AlertifyService.errorMessage('Cancel'); }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }
    viewConsent(consentid) {
        window.localStorage.setItem("consentID", consentid);
        this.props.history.push('/consent/' + consentid);
    }
    viewQuickly(consentObject){
        this.setState({consentObject:consentObject});
    }
    render() {
        let {consentObjects} = this.state;
        return (
            <div className="row">
            <div className="col-lg-12">
                <hr />
                <p className="h3 d-flex justify-content-center">Consent Requests</p>
                <hr />
                <div className="form-group">
                    <input type="text"
                        placeholder="Search Consent by consentObject Name or consentObject Status"
                        name="searchByName"
                        className="form-control"
                        onChange={this.onChangeSearchByStatusOrDate}
                    />
                </div>
                <hr />
                <div className="table-responsive">
                    <table className="table table-bordered table-sm table-dark table-hover">
                        <thead>
                            <tr>
                                <th>Doctor Name</th>
                                <th>HIU Name</th>
                                <th>HIP Name</th>
                                <th>Date From</th>
                                <th>Date To</th>
                                <th>Valid Till</th>
                                <th>Consent Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {console.log(this.state)}
                            {this.state.consentObjects.map((consentObject, index) =>
                                <tr className="bg-default" key={consentObject.txnID}>
                                    <td>{consentObject.doctorName}</td>
                                    <td>{consentObject.hiuName}</td>
                                    <td>{consentObject.hipName}</td>
                                    <td>
                                        <Moment format="YYYY/MM/DD HH:mm">
                                            {consentObject.date_from}
                                        </Moment>
                                    </td>
                                    <td>
                                        <Moment format="YYYY/MM/DD HH:mm">
                                            {consentObject.date_to}
                                        </Moment>
                                    </td>
                                    <td>
                                        <Moment format="YYYY/MM/DD HH:mm">
                                            {consentObject.consent_validity}
                                        </Moment>
                                    </td>
                                    <td>
                                        {consentObject.consent_status}
                                    </td>
                                    <td>
                                    <button
                                                    className="btn btn-primary"
                                                    onClick={() => this.viewConsent(consentObject.txnID)} >
                                                    View </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <hr />
                    <hr />
                    <hr />
                </div>
            </div></div>
        )
    }
}
export default withRouter(ConsentRequestsComponent);
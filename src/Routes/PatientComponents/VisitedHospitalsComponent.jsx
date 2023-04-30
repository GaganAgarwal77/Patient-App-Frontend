import React, { Component } from 'react'
import Moment from 'react-moment';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";
import "@material/react-checkbox/dist/checkbox.css";
import AlertifyService from '../../services/AlertifyService';
import { withRouter } from 'react-router'; 
import PatientService from '../../services/PatientService';

let filterAllConsent = [];
let filters = ["consentName", "consentStatus"];
class VisitedHospitalsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: window.localStorage.getItem("ehrbID"),
            hospitals: [],
        }
    }
    componentDidMount() {
        this.getVisitedHospitals();
    }
    getVisitedHospitals() {
        PatientService.getVisitedHospitals(this.state.id, window.localStorage.getItem("token")).then(res => {
            let hospitals = res.data.hospitals;
            console.log(hospitals)
            this.setState({ hospitals: hospitals });
        })
        // let data = {
        //     "hospitals": [
        //         {
        //             "visitID": "8b532ee1-468f-40a5-82ee-a3f578b97f79",
        //             "ehrbID": "gagan",
        //             "hospitalID": "123-2314-4121",
        //             "hospitalName": "hospital",
        //             "timestamp": "2023-03-17T06:45:04.259+00:00",
        //             "department": "cardiology"
        //         }
        //     ]
        // }
        // this.setState({ hospitals: data.hospitals });
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
    render() {
        let {hospitals} = this.state;
        return (
            <div className="row">
            <div className="col-lg-12">
                <hr />
                <p className="h3 d-flex justify-content-center">Visited Hospitals</p>
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
                                <th>Visit ID</th>
                                <th>Hospital ID</th>
                                <th>Hospital Name</th>
                                {/* <th>Department</th> */}
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {console.log(this.state)}
                            {this.state.hospitals.map((hospital, index) =>
                                <tr className="bg-default" key={hospital.visitID}>
                                    <td>{hospital.visitID}</td>
                                    <td>{hospital.hospitalID}</td>
                                    <td>{hospital.hospitalName}</td>
                                    {/* <td>{hospital.department}</td> */}
                                    <td>
                                        <Moment format="YYYY/MM/DD HH:mm">
                                            {hospital.timestamp}
                                        </Moment>
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
export default withRouter(VisitedHospitalsComponent);
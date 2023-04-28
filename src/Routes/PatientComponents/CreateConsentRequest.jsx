
import React, { Component } from 'react'
import ProblemService from '../../services/ProblemService';
import DoctorService from '../../services/DoctorService';
import { ErrorMessage, Field, Form, Formik } from "formik";
import ReactDatePicker from 'react-datepicker';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import AlertifyService from '../../services/AlertifyService';
import PatientService from '../../services/PatientService';
//import Select from 'react-select';

var statuses = [];
export default class CreateConsentRequest extends Component {

    constructor(props) {
        super(props)
        this.state = {
            consentid: window.localStorage.getItem("consentID"),

            hiType: "",
            departments:"",

            dateFrom: new Date(),
            dateTo: new Date(),
            valdityTill: new Date()
        }
    }
    componentDidMount() {
        this.loadConsentObject();
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
    }

    viewPatient(id) {
        window.localStorage.setItem("patientID", id);
        this.props.history.push('/view-patient/' + id);
    }
    validate(values) {
        let errors = {};
        if (!values.hiType) {
            errors.hiType = 'Enter hiType';
        } else if (values.hiType.length < 3) {
            errors.hiType = 'Enter at least 3 Characters in hiType';
        }
        if (!values.departments) {
            errors.departments = 'Enter departments';
        } else if (values.departments.length < 3) {
            errors.departments = 'Enter at least 3 Characters in departments';
        }
        return errors;
    }
    modifyAndAccept = () => {
        let data = this.state.consentObject;
        data.consent_status = "ACCEPTED";
        data.hiType = this.state.hiType.split(",");
        data.departments = this.state.departments.split(",");
        data.date_from = this.state.dateFrom.toISOString();
        data.date_to = this.state.dateTo.toISOString();
        data.consent_validity = this.state.valdityTill.toISOString();
        console.log(data)
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
    onChangeData(type, e) {
        const addproblem = this.state;
        addproblem[type] = e;
        this.setState({ addproblem });
    }
    render() {
        {console.log(this.state)}
        let { hiType, departments, creationDate, dateFrom, dateTo, valdityTill } = this.state;
        const isWeekday = date => {
            const day = date.getDay(date);
            return day !== 0 && day !== 6;
        };
        return (
            <div className="row">
                <div className="col-sm-12">
                    <h5>Consent Request Form</h5>
                    <hr />
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => this.props.history.push("/consent/"+this.state.consentObject.txnID)} >  Back </button>
                    <hr />
                    <Formik
                        onSubmit={this.modifyAndAccept}
                        validate={this.validate}
                        initialValues={{ hiType, departments, creationDate }}
                        enableReinitialize={true} >
                        <Form>
                        <fieldset className="form-group">
                                <label>hiType:</label>
                                <Field
                                    className="form-control"
                                    type="text"
                                    name="hiType"
                                    value={hiType}
                                    onChange={e => this.onChangeData('hiType', e.target.value)} />
                                <ErrorMessage name="hiType" component="div" className="alert alert-danger text-danger" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>departments:</label>
                                <Field
                                    className="form-control"
                                    type="text"
                                    name="departments"
                                    value={departments}
                                    onChange={e => this.onChangeData('departments', e.target.value)} />
                                <ErrorMessage name="departments" component="div" className="alert alert-danger text-danger" />
                            </fieldset>
                                <div className='d-flex'>
                            <fieldset className="form-group">
                                <label >Date From: </label>
                                <ReactDatePicker
                                    className="form-control"
                                    // showTimeSelect
                                    showTimeInput
                                    selected={dateFrom}
                                    onChange={e => this.onChangeData('dateFrom', e)}
                                    timeIntervals={15}              // time range around 15 min
                                    //showWeekNumbers               // show week number
                                    timeFormat="HH:mm"              // show time format
                                    dateFormat="yyyy/MM/dd h:mm aa" // show all of time format
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <label >Date To: </label>
                                <ReactDatePicker
                                    className="form-control"
                                    // showTimeSelect
                                    showTimeInput
                                    selected={dateTo}
                                    onChange={e => this.onChangeData('dateTo', e)}
                                    timeIntervals={15}              // time range around 15 min
                                    //showWeekNumbers               // show week number
                                    timeFormat="HH:mm"              // show time format
                                    dateFormat="yyyy/MM/dd h:mm aa" // show all of time format
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <label >Valid Till: </label>
                                <ReactDatePicker
                                    className="form-control"
                                    // showTimeSelect
                                    showTimeInput
                                    selected={valdityTill}
                                    onChange={e => this.onChangeData('valdityTill', e)}
                                    timeIntervals={15}              // time range around 15 min
                                    //showWeekNumbers               // show week number
                                    timeFormat="HH:mm"              // show time format
                                    dateFormat="yyyy/MM/dd h:mm aa" // show all of time format
                                />
                            </fieldset>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={() => this.viewPatient(this.state.id)}  
                                    data-dismiss="modal">Close</button>
                                <div className="dropdown-divider"></div>
                                <button className="btn btn-success" type="submit">Save</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        )
    }
}

import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from "react-router-dom"; //Router,
import ViewPatientComponent from './Routes/PatientComponents/ViewPatientComponent';
import AddPatientComponent from './Routes/PatientComponents/AddPatientComponent';
import NotFoundComponent from './NotFound/NotFoundComponent';
import IndexPage2 from './Routes/IndexPage2';
import { Lines } from 'react-preloaders';
import NavbarComponent from './Navbar/NavbarComponent';
import CreateConsentRequest from './Routes/PatientComponents/CreateConsentRequest';
import ViewConsentComponent from './Routes/PatientComponents/ConsentComponent/ViewConsentComponent';
import ConsentRequestsComponentHIP from './Routes/PatientComponents/ConsentComponent/ConsentRequestsComponentHIP';
import ConsentRequestsComponentHIU from './Routes/PatientComponents/ConsentComponent/ConsentRequestsComponentHIU';
import LoginPatientComponent from './Routes/PatientComponents/LoginPatientComponent';
import ConsentRequestsComponent from './Routes/PatientComponents/ConsentComponent/ConsentRequestsComponent';
import VisitedHospitalsComponent from './Routes/PatientComponents/VisitedHospitalsComponent';

// https://www.youtube.com/watch?v=DQ93TxqKkWo
function App() {
  return (            
    <div className="App" >
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
          <NavbarComponent />
          <a href="/">
            {/* style={{width: 400, height: 100}}  */}
            <img style={{ height: "100px", margin: "10px 0"}}  
            src="https://www.phuketinternationalhospital.com/en/wp-content/themes/pih/images/logo-nonetext.png" alt="" />
          </a>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact component={AddPatientComponent} />
                <Route path="/add-patient" component={AddPatientComponent} />
                <Route path="/login-patient" component={LoginPatientComponent} />
                <Route path="/view-patient" component={ViewPatientComponent} />

                <Route path="/visited-hospitals" component={VisitedHospitalsComponent} />

                <Route path="/recieved-consent-requests" component={ConsentRequestsComponent} /> 
                <Route path="/request-consent" component={CreateConsentRequest} />
                <Route path="/consent/:consentid" component={ViewConsentComponent} />
                <Route path="/sent-consent-requests" component={ConsentRequestsComponentHIU} /> 


                <Route path="/notfound" component={NotFoundComponent} />
                <Route path="/de" component={IndexPage2} />
                <Route path="*" component={NotFoundComponent} />
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </div>
      {/* <Lines /> */}
      {/* <Lines animation="slide-left" />; */}
      
      <Lines animation="slide" />

      {/* <Lines animation="slide-down" />; */}

      {/* <Lines animation="slide-right" />; */}
    </div>
  );
}

export default App;
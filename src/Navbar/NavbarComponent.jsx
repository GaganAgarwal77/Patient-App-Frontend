import React, { Component } from 'react'

export default class NavbarComponent extends Component {
    render() {
        return (
            <div className="sticky-top">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">Home</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">

                            {window.localStorage.getItem("token") == null &&
                            <a className="nav-link"  href="/add-patient">Register</a>}
                            {window.localStorage.getItem("token") == null &&
                            <a className="nav-link"  href="/login-patient">Login</a>}
                        {window.localStorage.getItem("token") != null &&
                            <a className="nav-link" href={"/view-doctor/"+window.localStorage.getItem("doctorID")}>Doctor Profile</a>
                        }
                                                    {window.localStorage.getItem("token") != null &&
                            <a className="nav-link" type="submit" onClick={() => {window.localStorage.removeItem("token");window.location.reload()}}>Logout</a>}
{window.localStorage.getItem("token") != null &&
<>
<a className="nav-link"  href="/visited-hospitals">Visited Hospitals</a>
<a className="nav-link"  href="/recieved-consent-requests">Consent Requests</a>
                            </>
    }
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

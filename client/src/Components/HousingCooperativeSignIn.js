import React, { Component } from "react";
import "../css/signIn.css";
import Admin from "./Admin";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { setInStorage } from "../utils/storage";
import beautifulblack from "../images/beautifulblack.jpg";

class HousingCooperativeSignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      housingCooperativeName: "",
      password: "",

      signInError: "",
      signedIn: false,
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleHousingCoopNameChange =
      this.handleHousingCoopNameChange.bind(this);

    this.submitData = this.submitData.bind(this);
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleHousingCoopNameChange(event) {
    this.setState({
      housingCooperativeName: event.target.value,
    });
  }

  submitData(event) {
    event.preventDefault();
    const { housingCooperativeName, password } = this.state;

    const data = {
      housingCooperativeName,
      password,
    };

    axios
      .post("http://localhost:5000/api/admin/housingcooperativesignin", data)
      .then((res) => {
        const { success, message, token } = res.data;
        if (!success) {
          return this.setState({
            signInError: message,
          });
        }
        setInStorage("Parcel_app", { token: token });
        this.setState({
          signedIn: true,
          password: "",
        });
      });

    console.log(this.state);
  }

  render() {
    const { password, signedIn, signInError } = this.state;
    if (signedIn) {
      //remainder:change signedIn state back to false

      return (
        <Redirect
          to={{
            pathname: "/housingcooperative",
            state: {
              housingCooperativeName: this.state.housingCooperativeName,
            },
          }}
        />
      );
    }
    return (
      <div
        style={{
          backgroundImage: `url(${beautifulblack})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <div
          className="container"
          style={{
            color: "white",
            borderRadius: "0px",
            paddingTop: "150px",
            boxShadow: "rgb(38,57,77) 0px 20px 30px -10px",
          }}
        >
          <h1 style={{ textAlign: "center" }}>
            Housing Cooperative <br />
            Sign In
          </h1>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="form-group">
                <br />
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="housingCooperativeName"
                  aria-describedby="helpId"
                  onChange={this.handleHousingCoopNameChange}
                />
                <small id="helpId" className="form-text text-muted">
                  User Name
                </small>
                <br />
                <br />
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  aria-describedby="password"
                  onChange={this.handlePasswordChange}
                />
                <small id="passwordHelpId" className="form-text text-muted">
                  Password
                </small>
                <br />
                <div className="form-group">
                  {signInError ? (
                    <div class="alert alert-danger ">{signInError}</div>
                  ) : null}

                  <div className="col-md-4"></div>
                </div>
                <br />
                <button
                  type="submit"
                  style={{ marginTop: 10 }}
                  className="btn btn-primary"
                  onClick={this.submitData}
                >
                  Submit
                </button>
                <br />
                <strong>
                  If do not have an account Contact Site To Register One
                </strong>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default HousingCooperativeSignIn;
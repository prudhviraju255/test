import React, { Component } from "react";
import axios from 'axios';
// import IntlTelInput from 'react-intl-tel-input';
// import 'react-intl-tel-input/dist/main.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      Id:"",
      hideCreateAccount:false,
      hideUpdate:false,
      usersData: [],
      items:[],
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };
  }

  async componentDidMount() {
    let token=localStorage.getItem('token')
    // await this.getItemsList();
    axios.get("http://localhost:3003/getuserdata",{
      headers:{
        'email':"prudhvi@gmail.com",
      'authorization':'data '+token,
      'Content-Type':'application/json',
      'Accept':'application/json'
    }
  }).then(response=>{
    console.log(response)
  }).catch(error=>{
    console.log(error)
  })
  }

  handleSubmit = e => {
    e.preventDefault();
this.setState({firstName:'',lastName:'',email:'',password:''})
    if (formValid(this.state)) {
      axios.post('http://localhost:3003/register', this.state)
        .then(response => {
          console.log('Registered Succesfully')
        })
        .catch(error => {
          console.log('Failed to Register')
        })
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => '');
  };

  edit(id) {
this.state.usersData.map((user)=>{
  if(user.id===id){
this.setState({firstName:user.firstName,lastName:user.lastName,email:user.email,password:user.password,Id:id,hideCreateAccount:true,hideUpdate:false})
  }
})
  }

  update(){
axios.post('http://localhost:3003/updateuser',this.state)
.then(response=>{
  console.log(response);
})
.catch(error=>{
  console.log(error);
})
  }

  delete(id){
const userId={
  id:id
}
    axios.post('http://localhost:3003/deleteuser',userId)
.then(response=>{
  console.log(response);
})
.catch(error=>{
  console.log(error);
})
}


filtertext=(event)=>{
 let items=this.state.usersData
 items=items.filter((user)=>{
   return user.firstName.toLowerCase().search(event.target.value.toLowerCase())!==-1
 })
 this.setState({usersData:items})
}

  render() {
    
    const { formErrors } = this.state;
    return (
      
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
          {/* <IntlTelInput
  containerClassName="intl-tel-input"
  inputClassName="form-control"
/> */}
            <div className="firstName">
              <label htmlFor="firstName" >First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                value={this.state.firstName}
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                value={this.state.lastName}
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                value={this.state.email}
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                value={this.state.password}
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
             {!this.state.hideUpdate?
              <button type="button" onClick={this.update.bind(this)}>Update</button>:null
            }
              {!this.state.hideCreateAccount ?
                              <button type="submit">Create Account</button>:null
              }
              <small>Already Have an Account?<Link to="/login">Login</Link></small>
            </div>
          </form>
        </div>
        <div style={{ marginTop: '20px', color: 'white' }}>
          <input type="text" placeholder="searchfor" style={{color:"black"}} onChange={this.filtertext}></input>
          {/* <div>{this.state.items.map((user)=>{
           return <div key={user.firstName}>{user.firstName}</div>
          })}</div> */}
          <table>
            <thead>
              <tr>
              <th>Id</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.usersData.map((user) => (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td style={{ cursor: 'pointer' }} onClick={() => this.edit(user.id)}>Edit</td>
                  <td style={{ cursor: 'pointer' }} onClick={()=>this.delete(user.id)}>delete</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Signup;
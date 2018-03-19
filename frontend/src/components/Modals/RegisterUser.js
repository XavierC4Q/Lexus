import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from "axios"
import { Redirect } from "react-router-dom"

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '25%', 
    textAlign             : 'center'
  }
};

Modal.setAppElement('#root')

class RegisterUser extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '', 
      confirmpassword: '', 
      firstname: '', 
      lastname: '', 
      email: '', 
      isLoggedIn: false,
      message: '',
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false, message: ''});
  }

  handleFormInput = e => {
    const { confirmpassword, password, message } = this.state
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLoginFormSubmit = e => {
    e.preventDefault();

    const { username, password, email, confirmpassword, firstname,  lastname } = this.state;
    axios
      .post("/users/register", {
          username: username, 
          password: password, 
          email: email, 
          first_name: firstname,
          last_name: lastname
      })
      .then(res => {
        console.log('res', res)
        this.setState({
          message: 'success', 
          isLoggedIn: true,
        });
      })
      .catch(err => {
        this.setState({
          message: `Error registering. ${err}`, 
        });
      });  
  }

  render() {
    const { confirmpassword, password, username, email, isLoggedIn } = this.state
    
    if(isLoggedIn === true) { 
      return <Redirect to='/feed' />
    }
    return (
      <div className="Modal">
      <div>
      <button onClick={this.openModal}>Register</button>
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
      >

        <h2 ref={subtitle => this.subtitle = subtitle}>Register</h2>
        <form onSubmit={this.handleLoginFormSubmit}>
          <input className="input" type="text" placeholder="Username" onChange={this.handleFormInput} name='username' required></input> <br />
          <input className="input" type="text" placeholder="Firstname" onChange={this.handleFormInput} name='firstname' required></input> <br /> 
          <input className="input" type="text" placeholder="Lastname" onChange={this.handleFormInput} name='lastname' required></input> <br /> 
          <input className="input" type="email" placeholder="Email" onChange={this.handleFormInput} name='email' required></input> <br /> 
          <input className="input" type="password" placeholder="Password" onChange={this.handleFormInput} name='password' required></input> <br /> 
          <input className="input" type="password" placeholder="Confirm Password" onChange={this.handleFormInput} name='confirmpassword' required></input> <br /> 
          <button>Register</button>
        </form>
        <p> {this.state.message} </p>
        <p> {this.state.password !== this.state.confirmpassword && this.state.confirmpassword 
              ? 'passwords do not match' : '' } </p>
        <p> {password && password.length < 6 ? 'password must be 6 characters' : ''} </p>
        <button onClick={this.closeModal}>close</button>
      </Modal>
      </div>
      </div>
    );
  }
}

export default RegisterUser;
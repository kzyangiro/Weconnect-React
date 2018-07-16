import React, { Component } from 'react';
import '../Styles/App.css';
import Header from './Header';
import Footer from './Footer';
import swal from 'sweetalert';
import axios from 'axios'
import {browserHistory} from 'react-router';

class EditPassword extends Component {
  render() {
    return (
      <div className="row">
      <Header />
      <EditPasswordBody />
      <Footer />
      </div>     
    );
  }
}

class EditPasswordBody extends Component {
  componentDidMount() {

    if (!localStorage.loggedIn) {
      swal("Error!!", 'Login first to edit password', "error");
      browserHistory.push('/login')
    }
    else {}} 
  state = {
      businesses : []
    };

  render(){
    return(
      <div className="businesscontent">
      <div className = "row">
        
        <h3 style={{paddingLeft:'20px',color:'break'}}>Edit my password</h3><br />

        <div className="col-md-1" ></div>
        <div className="col-md-10" >
          <FormContent editpass={this.editpass}/>
        </div>
        <div className = "col-md-1"></div>
  
        </div>
      </div>
    );
  }
}

class FormContent extends Component {

  render() {
    return (

            <form className="create-business-form" onSubmit={this.editpass}>
              <div className="form-group">
                <label>Email:</label>
                <input type="text" className="field" name='email' />
                
              </div><br />
              <div className="form-group">
                <label>Current Password:</label>
                <input type="password" className="field" name='current_password'/>
              </div><br />
              <div className="form-group"> 
                <label>New Password:</label>
                <input type="password" className="field" name='new_password'/>
              
              </div><br />

              <div className="form-group">
                <label >Confirm Password:</label><br /><br />
                <input type="password" className="field" name='confirm_password'/>
              </div><br /><br />
            <a style={{float:'right'}}><button type="submit" className="btn btn-primary">Create</button></a>
          </form>
    
          );
        }

        editpass = (e) => {
    e.preventDefault()

    
    const email = e.target.elements.email.value;
    const current_password = e.target.elements.current_password.value;
    const new_password = e.target.elements.new_password.value;
    const confirm_password = e.target.elements.confirm_password.value;

    const access_token = localStorage.getItem("access_token")
    const config = {
      headers: {'Authorization': "bearer " + access_token}
    }

    axios.put('https://weconnectapi-v2.herokuapp.com/api/v1/auth/update_password', {
      email: email,
      current_password: current_password,
      new_password: new_password,
      confirm_password: confirm_password

    }, config).then(response =>{
      browserHistory.push('/dashboard')
      // sweet alert pop up
      swal({
          title: "Success!",
          text: "Password Updated successfully",
          icon: "success",
          button: "OK",
        });
  })
  .catch(error => {
      
      if (error.response.status === 400){
        swal("Error!!", error.response.data.Error, "error");
        }

      else if (error.response.status === 401){
        swal("Error!!", error.response.data.Error, "error");
        localStorage.removeItem('loggedIn')
        browserHistory.push('/login')
        }

  });

  }
      }

export default EditPassword;
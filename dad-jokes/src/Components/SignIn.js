import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

class SignIn extends React.Component{
    state = {
        username: '',
        password: ''
    }
   
   loginUser = ( userCreds) =>{
        axios.post('http://localhost:3300/api/login', userCreds)
            .then(res =>{
                console.log(res.data);
                localStorage.setItem('jwtKey', res.data.token);
            })
            .catch(err =>{
                console.log('Failed to add new user');
            })
    }
    
    inputHandler = (event)  =>{
        this.setState({[event.target.name] : event.target.value})
    }

    submitHandler = (event) =>{
        //prevents page from reloading when submitted
        event.preventDefault();
        //Calls axios post function with username and password set by input handler in state as the new user object
        this.loginUser(this.state);
        //resets input fields to an empty state once submit is complete
        this.setState({
            username: '',
            password: ''
        });
        //takes us to the jokes URL after submit
        this.props.history.push('/jokes');
    }
    render(){
        return(
            <div className = 'sign-in-container'>
                <h1 className = 'sign-in-header'>Dad Joke Login</h1>
                <form className = 'sign-in-form' >
                    <h3 className = 'username-header'> Username:</h3>
                    <input 
                        className = 'username-input'
                        name = 'username'
                        value = {this.state.username}
                        onChange = {this.inputHandler}
                        placeholder = 'Enter Username'
                        type = 'text'
                    />
                    <h3 className = 'password-header'>Password:</h3>
                    <input 
                        className = 'password-input'
                        name = 'password'
                        value = {this.state.password}
                        onChange = {this.inputHandler}
                        placeholder = 'Enter password'
                        type = 'text'
                    />
                    <div className = 'submit-button' onClick = {this.submitHandler}>Submit Login</div>
                </form>
                <NavLink to = '/register' className = 'register-link'>Navigate to user registration</NavLink>
            </div>
        )
    }
    
}

export default SignIn;
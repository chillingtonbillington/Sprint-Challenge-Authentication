import React from 'react';
import axios from 'axios';


class SignUp extends React.Component{
    state = {
        username: '',
        password: ''
    }
   
   registerUser = ( newUser) =>{
        axios.post('http://localhost:3300/api/register', newUser)
            .then(res =>{
                console.log(res.data);
                localStorage.setItem('jwt', res.data.token);
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
        this.registerUser(this.state);
        //resets input fields to an empty state once submit is complete
        this.setState({
            username: '',
            password: ''
        });
        //takes us to the jokes URL after submit
        this.props.history.push('/');
    }
    render(){
        return(
            <div className = 'sign-up-contuper'>
                <h1 className = 'sign-up-header'>Dad Joke Registration</h1>
                <form className = 'sign-up-form' >
                    <h3 className = 'username-header'> Username:</h3>
                    <input 
                        className = 'username-input'
                        name = 'username'
                        value = {this.state.username}
                        onChange = {this.inputHandler}
                        placeholder = 'Enter A New Username'
                        type = 'text'
                    />
                    <h3 className = 'password-header'>Password:</h3>
                    <input 
                        className = 'password-input'
                        name = 'password'
                        value = {this.state.password}
                        onChange = {this.inputHandler}
                        placeholder = 'Enter A New Password'
                        type = 'text'
                    />
                    <div className = 'submit-button' onClick = {this.submitHandler}>Create User</div>
                </form>
                
            </div>
        )
    }
    
    
}

export default SignUp;
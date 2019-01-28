import React from 'react';
import axios from 'axios';
import Joke from './Joke';

class Jokes extends React.Component{
    state = {
        jokes: []
    }

    getJokes = () =>{
        const token = localStorage.getItem('jwt');
        const headers ={
          headers: {
            'Authorization': token
          }
        }
        axios.get('http://localhost:3300/api/jokes', headers)
            .then(res =>{
                this.setState({
                    jokes: res.data
                })
                console.log(res)
            })
            .catch(err =>{
                console.log('Unable to fetch jokes');
            })
    }

    componentDidMount(){
        this.getJokes();
    }
    render(){
        return(
            <div className = 'jokes-container'>
                <h1 className = 'jokes-header'>Welcome to Dad Jokes!</h1>
                    {this.state.jokes.map(joke =>{
                        return (
                            <Joke 
                                joke = {joke}
                                key = {joke.id}
                        />
                        )
                    })}
            </div>
        )
    }
    
}

export default Jokes;
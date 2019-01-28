import React from 'react';

class Joke extends React.Component{
    render(){
        return(
            <div classNamew = 'joke-container'>
                {this.props.joke.joke}
            </div>
        )
    }
}

export default Joke;
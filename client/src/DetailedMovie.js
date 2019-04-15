import React, { Component } from 'react';

class DetailedMovie extends Component{
    // The render function will run when you need to update something on the page
    render(){
        // Everything in the return is the JSX that will show up on the page
        return(
            <div>
                {/*This is using the props eachElement that was passed to it from the MovieListing component and showing movieName and genre*/}
                <p>{this.props.eachElement.movieName} has
                        genre {this.props.eachElement.genre} <button name={this.props.eachElement._id} onClick={this.props.fetchEditDetails}>Edit</button>
                            {this.props.eachElement.cast?(this.props.eachElement.cast.mainActor):("No cast")}
                </p>
            </div>
        );
    }
}

export default DetailedMovie;
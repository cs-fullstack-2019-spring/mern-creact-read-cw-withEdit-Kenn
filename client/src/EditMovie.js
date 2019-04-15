import React, { Component } from 'react';

class EditMovie extends Component{
    constructor(props) {
        super(props);
        this.state = {
            // This state will hold any successMessages from the server
            successMessage: "",
        };
        console.log("In edit");
        console.log(this.props.entryCollection);
    }

    // This function is run when you submit the form and add a new movie
    submitAdditionalMovie = (e) =>{
        // You need preventDefault to stop the page from reloading. If it reloaded the rest of the function wouldn't run.
        e.preventDefault();
        //Call localhost[PORT]/movie like you would in POSTMAN. It's a POST method as seen below.
        fetch('/movie', {
            method: "PUT",
            // You need HTML headers so the server knows the data in the HTML body is json.
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            // We want to make the JSON data that's going to the body of the message into a string when we send it to the server.
            body:JSON.stringify({
                _id: this.props.entryCollection._id,
                movieName: e.target.movieName.value,
                genre: e.target.genre.value,
                cast:{
                    mainActor:e.target.mainActor.value,
                    mainActress:e.target.mainActress.value,
                    supportingActor: e.target.supportingActor.value,
                    supportingActress: e.target.supportingActress.value,
                }
            }),
        })
        // The response or res from your server is pushed into the variable here. Because it's getting a string back we want to use .text()
            .then(data=>data.text())
            // This is saving the string data into the state successMessage
            .then(data=>this.setState({successMessage: data}))
            .then(()=>this.props.changeEdit(false,undefined))
    };

    // The render function will run when you need to update something on the page
    render(){
        // Everything in the return is the JSX that will show up on the page
        return(
            <div>
                <h1>MovieListing</h1>
                {/*This form will run the submitAdditionalMovie function when you hit a button in the form*/}
                <form onSubmit={this.submitAdditionalMovie}>
                    {/*The label and input in the p tag keeps them separated from the rest of the label/inputs because a p tag has a block display by default*/}
                    <p>
                        <label htmlFor="movieName">Enter the movie name:</label>
                        <input type="text" id={"movieName"} name={"movieName"} defaultValue={this.props.entryCollection.movieName}/>
                    </p>
                    <p>
                        <label htmlFor="genre">Enter the movie genre:</label>
                        <input type="text" id={"genre"} name={"genre"} defaultValue={this.props.entryCollection.genre}/>
                    </p>

                    <p>
                        <label htmlFor="mainActor">Enter the movie mainActor:</label>
                        <input type="text" id={"mainActor"} name={"mainActor"} defaultValue={this.props.entryCollection.cast.mainActor}/>
                    </p>

                    <p>
                        <label htmlFor="mainActress">Enter the movie mainActress:</label>
                        <input type="text" id={"mainActress"} name={"mainActress"} defaultValue={this.props.entryCollection.cast.mainActress}/>
                    </p>

                    <p>
                        <label htmlFor="supportingActor">Enter the movie supportingActor:</label>
                        <input type="text" id={"supportingActor"} name={"supportingActor"} defaultValue={this.props.entryCollection.cast.supportingActor}/>
                    </p>

                    <p>
                        <label htmlFor="supportingActress">Enter the movie supportingActress:</label>
                        <input type="text" id={"supportingActress"} name={"supportingActress"} defaultValue={this.props.entryCollection.cast.supportingActress}/>
                    </p>
                    {/*When you click this button it will send all the form's data to the submitAdditionalMovie because of the onSubmit call in the beginning of the form*/}
                    <button>Submit</button>
                </form>
                {/*This is going to show a successMessage pulled from the database. It was set in the fetch function above*/}
                <div className={"successMessage"}>{this.state.successMessage}</div>
            </div>
        );
    }
}

export default EditMovie;
import React, { Component } from 'react';
import DetailedMovie from "./DetailedMovie";

class MovieListing extends Component{

    constructor(props) {
        super(props);
        this.state = {
            // this state (variable) will grab the array of collections straigt from the database
            movieCollectionArray: [],
            // this state (variable) will hold an array of styled HTML for each entry in the database
            mappedMovie:[],
            editCollection: {},
        };
    }

    // This is run when the component is loaded
    componentDidMount() {
        // This called the fetchDatabaseEntries function
        this.fetchDatabaseEntries();
    }

    fetchEditDetails=(e)=>{
        fetch('movie/edit/'+e.target.name)
            .then(data=>data.json())
            .then(response=>this.setState({editCollection: response}))
            .then(()=>{this.props.changeEdit(true, this.state.editCollection)});
    };

    // Going to GET the URL '/movie'. The results should be put into JSON, then sent to the movieCollectionArray
    fetchDatabaseEntries = (e) =>{
        //Call localhost[PORT]/movie like you would in POSTMAN. It's GET by default.
        fetch('/movie')
            // The response or res from your server is pushed into the variable here. It doesn't have to be named data. It can be anything. If it's a collection put data.json(). If it's a string put data.text()
            .then(data=>data.json())
            // Now that the data is a collection again we want to save it in the movieCollectionArray state so we can call it in a different function.
            .then(data=>this.setState(
                // Once the movieCollectionArray state is saved I want to run the mappedMovieFunction. I have to call it this way so it doesn't run the function before the data is finished being fetched and saved.
                {movieCollectionArray:data}, ()=>this.mappedMovieFunction()));
    };

    // This function will map out our movieCollectionArray and save the style HTML array in the mappedMovie state.
    mappedMovieFunction(){
        // This is saving the movieCollectionArray map to the mappedArray variable
        const mappedArray= this.state.movieCollectionArray.map(
            // For each element in the movieCollection Array to the following function
            (eachElement)=>{
                // You want to style each Element using JSX and give it a key
                return( <div key={eachElement._id}>
                    {/*We want to do all the styling in a different component so we have to send the element as a prop to the component.*/}
                            <DetailedMovie eachElement={eachElement} fetchEditDetails={this.fetchEditDetails}/>
                        </div>)
            }
        );
        // Once we're all done the stylized HTML array will be saved in the mappedMovie state
        this.setState({mappedMovie: mappedArray});
    }

    render(){
        return( <div>
                    <h1>Movies</h1>
            {/*Print out MappedMovie state with the stylized element array*/}
                    <h4>{this.state.mappedMovie}</h4>
                </div>);
    }
}

export default MovieListing;
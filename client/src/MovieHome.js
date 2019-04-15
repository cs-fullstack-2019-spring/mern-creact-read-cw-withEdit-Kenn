import React, { Component } from 'react';
import MovieListing from "./MovieListing";
import AddMovie from "./AddMovie";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import EditMovie from "./EditMovie";

class MovieHome extends Component{
    constructor(props) {
        super(props);
        this.state={
            isEditing: false,
            entryCollection: -1,
        };
    }

    changeEdit=(editBoolean, editID)=>{
        this.setState({isEditing: editBoolean,
            entryCollection: editID});
    };

    render(){
        return(
            <div>
                {/*Allows you to use Link and Router*/}
                <Router>
                    <h1>Welcome to the Movie Database</h1>
                    {/*A link back home to the main '/' root page. It doesn't have a route associated to it*/}
                    <Link className={'linkSpacing'} to='/'>Home</Link>
                    {/*A link to the '/listing' route path. You have to look at the "to" URL and compare it to the same path in a route to know which component it calls*/}
                    <Link className={'linkSpacing'} to='/listing'>Listing</Link>
                    {/*A link to the '/addMovie' route path. Same as above except for a different to URL*/}
                    <Link className={'linkSpacing'} to='/addMovie'>Add Movie</Link>

                    {/*This will tell a link where to go when it matches it's path to a Link's "to". It will call the component MovieListing*/}

                    {this.state.isEditing?
                        (<Route path={'/listing'} component={()=>{return <EditMovie entryCollection={this.state.entryCollection} changeEdit={this.changeEdit}/>}}/>):
                        (<Route path={'/listing'} component={()=>{return <MovieListing  changeEdit={this.changeEdit}/>}}/>)}

                    {/*Same as above. It will call the component Add Movie*/}
                    <Route path={'/addMovie'} component={AddMovie}/>
                </Router>
            </div>
    );
    }
}

export default MovieHome;
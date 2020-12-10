import React, { Component } from 'react'
import {Link} from "react-router-dom"

export default class Profile extends Component {
    render() {
        return (
            
            <div>
                <h1>This is Profile Page</h1>
                <Link to={"/profile/addSpot"}>
                <button type="submit">Add Route</button>
                </Link>

                <button type='submit'>Delete your account</button>
            </div>
        )
    }
}

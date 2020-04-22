import React from 'react'
import axios from 'axios'
import Dashboard from './Dashboard'

import {BrowserRouter,Route, Redirect } from 'react-router-dom'

class LoginPage extends React.Component {

    constructor() {
        super()
        this.state = {
            email:'',
            status: false,
            users: [],
            emails: [],
            LoginStatus: false,
            redirect:null
        }
    }
    
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            let users = response.data
            let emails = users.map(user => {
                return user.email
            } )
            this.setState({users, emails})
        })

    }

    handleEmail = (e) => {
        let email = e.target.value
        this.setState({email})

        localStorage.setItem('email',email)
    }

    handleChange = () => {
        if(!this.state.emails.includes(this.state.email)){
            this.setState(prevState => ({
                status: !prevState.status
            }))
        } else {
            this.setState({ redirect:"/Dashboard",LoginStatus: true })

        }
    }

    render() {
        return (
            <BrowserRouter>
            <div>
                
                {this.state.LoginStatus== false && (
                    <div>
                     <h2>LOGIN</h2>
                    <input type="text" value={this.state.email} onChange={this.handleEmail} onBlur={this.handleChange} />
                    {(this.state.status) && (<div><p>Invalid email / Syntax Error. Please type again</p></div>)} <br/><br/>
                    </div>
                    )}
                    {this.state.LoginStatus && (
                     <div>
                   
                        
                        <Redirect to={this.state.redirect} />

                        <Route path="/Dashboard" component={Dashboard}  />
                        </div>

                    )}
                        
                
          
            </div>
           </BrowserRouter>
        )
    }
}

export default LoginPage
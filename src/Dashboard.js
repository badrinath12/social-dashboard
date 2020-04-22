import React from 'react'
import axios from 'axios'
import LoginPage from './LoginPage'

import {BrowserRouter,Route, Redirect } from 'react-router-dom'


class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            email: localStorage.getItem('email'),
            posts: [],
            userInfo: {},
            redirect:null,
            status:false,
            company: '', 
            catchPhrase: ''
        }
    }

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            let users = response.data
            let object = users.find(user => {
                if(user.email === this.state.email) {
                    return (user.id)
                }
                
            })
            let id = object.id
            //console.log(users)
            //console.log(id)
            
            this.setState({users})
            axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${id}`)
            .then((response) => {
                let posts = response.data
                this.setState({posts})
            })
            
            axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((response) => {
                let userInfo = response.data
                let company = userInfo.company.name
                let catchPhrase = userInfo.company.catchPhrase
                //console.log(userInfo.company.catchPhrase)
                this.setState({userInfo, company, catchPhrase})
                
            })
        })
    }

    handleLogout=()=>{
        localStorage.removeItem('email')
        this.setState({ redirect:"/",  status:true })

    }

    render(){
        return (
            <BrowserRouter>
            <div>
            {this.state.status== false && (
                <div>
                <p>SwitchDash</p><button onClick={this.handleLogout}>Logout </button><br/>
                
                <h3>NAME: {this.state.userInfo.name} </h3> <br/>
                <p>email: {this.state.userInfo.email} </p>
                <p>phone: {this.state.userInfo.phone} </p>
                <p>Company: {this.state.company} </p> 
                <p>CatchPhrase: {this.state.catchPhrase} </p><br/>
                
                <h4>All posts of {this.state.userInfo.name}: </h4>
                
                <ul>
                    {
                        this.state.posts.map(post => {
                            return (
                                <li key={post.id}>{post.title}</li>
                            )
                        })
                    }
                </ul>
                </div>
                )}
                {this.state.status && (
                     <div>
                     <Redirect to={this.state.redirect}  />
                     <Route path="/" exact component={LoginPage} />
                     </div>
                )}
            </div>
            </BrowserRouter>
        )
    }
}

export default Dashboard
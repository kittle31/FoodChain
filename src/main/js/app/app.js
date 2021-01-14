import axios from "axios"
import React from 'react'
import ReactDOM from 'react-dom'
import {AppComponent} from "./components/AppComponent"

axios.defaults.headers.put['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'

ReactDOM.render(
    <AppComponent/>,
    document.getElementById('fc')
)
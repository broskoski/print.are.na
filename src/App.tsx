import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { Switch, Route } from "react-router"

import { Style } from "styles/index"

import Home from "components/Home"
import Book from "components/Book"
import Error from "components/ErrorPage"

function App() {
  return (
    <>
      <Style />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/book/:slug" component={Book} />
          <Route exact path="/error/:error" component={Error} />
        </Switch>
      </Router>
    </>
  )
}

export default App

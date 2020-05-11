import React from 'react'
import { Switch, Route } from "react-router-dom"
import Join from "../Screens/Join"
import Chat from "../Screens/Chat"
import Landing from "../Screens/Landing"

export default function Index() {
  return (
    <div>
      <Switch>
        <Route exact
          path="/"
          render={props => <Landing {...props} />}
        />
        <Route exact
          path="/Join"
          render={props => <Join {...props} />}
        />
        <Route exact
          path="/chat"
          render={props => <Chat {...props} />}
        />

      </Switch>
    </div>
  )
}

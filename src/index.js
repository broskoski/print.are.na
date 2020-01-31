import React from "react"
import ReactDOM from "react-dom"
import App from "./App.tsx"
import { unregister } from "./serviceWorker"

ReactDOM.render(<App />, document.getElementById("root"))
unregister()

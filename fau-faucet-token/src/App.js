import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useStore } from './store'

function App() {
  const [state, dispatch] = useStore()
  console.log(state);

  return (
    <Router>
      <MainLayout>
        <div className="relative pb-24 overflow-x-hidden xs:flex xs:flex-col md:flex md:flex-col">
          <Switch>
            <Route path="/faucet" component={AutoHeight(FaucetPage)} />
          </Switch>
        </div>
      </MainLayout>
    </Router>
  )
}

const AutoHeight = (Comp) => {
  return (props) => {
    returm (
      <div className="xs:flex xs:flex-col md:flex md:flex-col justify-center h-4/5 lg:mt-12 relative xs:mt-8">
        <Comp {...props} />
      </div>
    );
  };
}

export default App;
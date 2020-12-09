import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import { Record } from './Components/RecordWav/Record';
import { ActivatePython } from './Components/ActivatePython';
import { AddUser } from './Components/AddUser/AddUser';
import { RecordNewUser } from './Components/RecordNewUser/RecordNewUser';


function App() {

 // add check if values inserted from previous page
 
  return (
    <>
    <Router>
       <>
         <div style={{ marginBottom: 80 }}>
           <Header/>
           <Switch>
             <Route exact path="/" component={Record} />
             <Route exact path="/Login" component={Login} />
             <Route exact path="/AddUser" component={AddUser} />
             <Route exact path="/ActivatePython" component={ActivatePython} />
             <Route exact path="/RecordNewUser" component={RecordNewUser} />
           </Switch>
         </div>
       </>
     </Router>
     </>
  );
}

export default App;

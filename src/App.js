import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchScreen from './pages/search'
import { firebaseConfig } from './service/config';
import Login from './pages/login';
import  Details from './pages/details';
import { AuthProvider } from './service/app_authentication/authentication';
import PrivateRoute from './service/app_authentication/privateRoute';
import BarcodeScanner from './pages/BarcodeScanner'
import './App.css'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


function App() {

  return (<>
  <AuthProvider>
  <Router>
    <Switch>
        <PrivateRoute exact path="/" component={SearchScreen}/>
        <Route exact path="/wowbudd/:buddId" component={Details}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/scan_barcode" component={BarcodeScanner} />
        {/* <Route exact path="/news" ><News /></Route>
        <Route exact path="/projects"><Projects /></Route> */}
      </Switch>
  </Router>
  </AuthProvider>
      </>);
}

export default App;

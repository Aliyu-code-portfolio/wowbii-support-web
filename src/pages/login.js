import { useState, useEffect, useContext } from 'react';
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { Redirect, withRouter } from 'react-router-dom';
import LoadingIcons from 'react-loading-icons';
import { AuthContext } from '../service/app_authentication/authentication';
import './login.css'

function Login({history}) {
const [email, setEmail] = useState(null);
const [password, setPassword] = useState(null);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);

useEffect(() => {
  document.title = "Login | WowSupport"
}, [])

const emailUpdate=()=>{
  const text = document.getElementById('email').value;
  setEmail(text);
}
const passwordUpdate=()=>{
  const text = document.getElementById('password').value;
  setPassword(text);
}
const handleKeyDown=(e)=>{
  if(e.key==='Enter'){
    login();
  }
}

const login=()=>{
  if(email==null||password==null){
    setError("Fields cannot be empty");
  }
  else{
    setLoading(true);
  const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    setLoading(false)
    history.push("/");
  })
  .catch((error) => {
    setLoading(false)
    setError(error.message);
  });
}
}
const {currentUser} = useContext(AuthContext)
if(currentUser){
  return <Redirect push to="/"/>
}
  return (<>
    <div className="container">
        <div className="form-box">
          <div className="header-form">
            <h4 className="text-primary text-center"><i className="fa fa-user-circle" style={{fontSize:"110px"}}></i></h4>
            <div className="image">
            </div>
          </div>
          <div className="body-form">
           <form>
              <div className="input-group mb-3">
   <div className="input-group-prepend">
    <span className="input-group-text"><i className="fa fa-user"></i></span>
  </div>
  <input type="text" id='email' className="form-control" placeholder="Email " onChange={emailUpdate}/>
</div>
 <div className="input-group mb-3">
   <div className="input-group-prepend">
    <span className="input-group-text"><i class="fa fa-lock"></i></span>
  </div>
  <input type="password" id='password' className="form-control" placeholder="Password"onKeyDown={(e)=>handleKeyDown(e)} onChange={passwordUpdate}/>
</div>
{loading? <div className='bt'>
                <LoadingIcons.Rings stroke="#00FF00" speed={2.50} />
              </div>: <button type="button" className="btn btn-secondary btn-block" onClick={login}>LOGIN</button>
}
 <div className="message">
  {error&& error}
 </div>
   </form>
          </div>
        </div>
       </div>   
      </>);
}

export default withRouter(Login)

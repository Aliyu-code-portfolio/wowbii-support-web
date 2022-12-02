import { useState, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import {QrCode2Sharp} from '@mui/icons-material';
import './search.css';

function SearchScreen({history, location}) {
  const [id, setID] = useState(false);
  const [action, setAction] = useState(null);
  const [error, setError] = useState(false);

useEffect(() => {
  document.title = "Home | WowSupport";
  setID(location.state);
}, [location.state])

const queryUpdate=()=>{
  if(document.getElementById("serial").value.length < 13){
  setError(true)
  } 
  else{
    setError(false);
  }
}
const handleKeyDown=(e)=>{
  if(e.key==='Enter'){
    checkDB();
  }
}
const resetID=(e)=>{
  //console.log("yes")
  if(id){
    document.getElementById('serial').value=id
    setID(null)
  }
}

const checkDB =()=>{
  const text1 = document.getElementById("serial").value;
if(text1===""||text1===null){
  setError(true);
} //yes
else{
  //setLoading(true);
  history.push(`/wowbudd/${text1}`);
  setAction("wowbudd");
}
}

const scan=()=>{
  history.push("/scan_barcode")
}
const logout=()=>{
  const auth=getAuth();
  signOut(auth).then(()=>{
    history.push("/login")
    setAction("login")
  })
}

if(action==="login"){
  return <Redirect to="/login"/>
}
else if(action==="wowbudd"){
  const text1 = document.getElementById("serial").value;
  return <Redirect to={`/wowbudd/${text1}`}/>
}

  return (
    <div className="App">
      <div className='lookuppage'>
      <div className='logout fa fa-sign-out-alt'onClick={logout}> Logout</div>
        <><div className="container">
            <div className="form-box">
            <img src={require('../assets/wowbii.jpg')} alt="Wowbii" className = "img"/>
                <form>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-search"></i></span>
                    </div>
                    <input type="text" id='serial' className="form-control" placeholder="Enter Serial number" value={id? id:null} onChange={queryUpdate} onKeyDown={(e)=>handleKeyDown} onClick={(e)=>resetID(e)}></input>
                    <div className='barcode'><QrCode2Sharp fontSize="large" onClick={scan}/></div>
                </div>
              <button type="button" className="btn btn-secondary btn-block" onClick={checkDB} disabled={error}>SEARCH</button>
 <div className="message">
  {error&& 'Serial number should be numbers and 8 digits long'}
 </div>
   </form>
        </div>
       </div>   
</>
            
            </div>
    </div>
  );
}

export default withRouter(SearchScreen);

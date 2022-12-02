import { useState, useEffect } from 'react'
import { withRouter, useParams } from 'react-router-dom'
import ReactLoading from 'react-loading';
import './detail.css'
import { searchDB } from '../service/firebase';

const Details=({history})=>{
    const [detail,setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const id = useParams().buddId

    useEffect(()=>{
        document.title = "Wowbudd | WowSupport"
        searchDB(id, data);
    },[])
    const data=(info)=>{
        setDetail(info);
        setLoading(false);
      }
 const back =()=>{
        history.push("/");
 }
 const capitalizeFirstLetter=(word)=>{
    return word.charAt(0).toUpperCase()+ word.slice(1);
 }
    return(<>
        {loading?
        <div >
            <ReactLoading className='loader' type="spin" color="#00FF00" height={'5%'} width={'5%'} />        </div>
         : 

        <div className='body'>
            <div className='back  fa fa-arrow-circle-left' onClick={back}>  Back</div>
            {detail?
            <>
            <div className='size'>{detail.size} Wowbudd</div>
            <div className='sn'><span>Serial Number: </span>{detail.serial}</div>
            <div className='sn'><span>Support service: </span>{capitalizeFirstLetter(detail.service)}</div>
            <div className='Firstbuddinfo'>
                <div className='title'>Owner Details</div>
                <div className='info'><span>Owned by: </span>{detail.owner}</div>
                <div className='info'><span>Date purchased: </span>{detail.dateBought}</div>
            </div>
            <div className='buddinfo'>
                <div className='title'>OPS Specification</div>
                <div className='info'><span>Manufacturer: </span>{detail.opsMake}</div>
                <div className='info'><span>Model: </span>{detail.Model}</div>
                <div className='info'><span>Processor: </span>{detail.Processor}</div>
                <div className='info'><span>Storage Capacity: </span>{detail.storageCapacity1}</div>
                <div className='info'><span>RAM: </span>{detail.RAM1}</div>
                <div className='info'><span>Service Tag: </span>{detail.serviceTag}</div>
            </div>
            <div className='buddinfo'>
                <div className='title'>Andriod Specification</div>
                <div className='info'><span>Manufacturer: </span> {detail.buddMake}</div>
                <div className='info'><span>Version: </span>{detail.version}</div>
                <div className='info'><span>Storage Capacity: </span>{detail.storageCapacity2}</div>
                <div className='info'><span>RAM: </span>{detail.RAM2}</div>
            </div></>:
                <div className='center'>
                    <div className='img'><img src={require('../assets/error.png')} alt='Not found'/></div>
                    <div className='error'>Oppps, we couldn't retrieve the data</div>
                    <div className='detail'>Internet connection or wowbudd details was not found. </div>
                </div>
        }
            
        </div>}</>
    )
}
export default withRouter(Details);
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export const searchDB = async(id, buddInfo)=>{
   await firebase.firestore().collection("WowBudds").doc(id).get().then(item=>{
        buddInfo(item.data())
    }).catch(e=>{
        buddInfo(null);
    })
}
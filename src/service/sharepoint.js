import * as pnp from 'sp-pnp-js';
import NodeFetchClient from 'node-pnp-js';
import {credentials} from './credential'
pnp.setup({
        fetchClientFactory: () => {
            return new NodeFetchClient(credentials);
        }
    });
export const getWowBuddData=()=>{
    new pnp.Web('https://equipmenthall.sharepoint.com/sites/EquipmenthallLimited/Lists/Wowbii%20OPS%20Tracking%20list/AllItems.aspx?env=WebViewList&viewid=a89c86df%2Dcfe9%2D4418%2D935a%2D9da2c656e878')
    .get()
    .then(data => {
        console.log(`Your web title: ${data.Title}`);
        return data;
    })
}
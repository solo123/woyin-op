/**
 * 本地local 管理器，把需要进行的local的key需要在本地配置好
 */

class LocalStr{
 
    constructor(){
        this.key = {
            merchantId: true,
            wateruserid: true,
            waterusertype: true,
            merchantInfo: true,
            orderId: true
        }
    }

    set(key, value){
        if(this.key[key]){
          localStorage.setItem(key, value);
        }
    }

    get(key){
      if(this.key[key]){
       return localStorage.getItem(key);
      }
      return null;
    }
}

export default new LocalStr();
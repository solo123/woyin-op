class LocalStr{
 
    constructor(){
        this.key = {
            merchantId: true,
            wateruserid: true,
            waterusertype: true,
            merchantInfo: true
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
class LocalStr{
 
    constructor(){
        this.key = {
            merchantId: true,
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
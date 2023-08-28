 
function checkMatch(obj: any, querys: any) {
  for (const query in querys) {
    if(!obj.hasOwnProperty(query)){

        for (const key in obj) {
   
           if(typeof obj[key] ==='object'){

            if(checkMatch(obj[key],querys))
            {
                
                return true
            }
            
           }
        }

    }
    else{
        if(obj[query].includes(querys[query])){
            return true
        }
        else{
            return false
        }

    }
    
  }
}
export default checkMatch;

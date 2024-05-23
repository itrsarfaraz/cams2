export const WriteResponse=(res,statusCode,message=null,data=null)=>{
   if(statusCode==null || typeof(statusCode)!=='number'){
      return res.send({statusCode:400,message:"error:Status code must be number only and it cannot be null",data:null})
   }
   if(typeof(message)!=='string' || null){
      return res.send({statusCode:400,message:"error:message must be sent in string or can be null only.",data:null})
   }
   if(message.toLowerCase().includes('error')){
      data=null;
   }
   return res.send({
    statusCode,
    message,
    data
   });
}
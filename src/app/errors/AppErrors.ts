
export class AppError extends Error{
    public statusCode : number ;
  
    constructor(statusCode:number,message:string,stack=''){
      super(message)
      this.statusCode=statusCode;
  
      if (stack) {
        this.stack=stack
        // console.log(stack);
      }else{
        Error.captureStackTrace(this,this.constructor)
        // console.log(this,this.constructor);
      }
    }
  
  }
  
class ApiResponse{
    constructor(message,data,statusCode,sucess=statusCode<400){
        this.message=message;
        this.data=data;
        this.statusCode=statusCode;
        this.sucess=sucess
    }
}
module.exports=ApiResponse
using SQLitePCL;

namespace API.Errors
{
    public class ApiResponse
    {

        public ApiResponse(int statusCode, string message=null)
        {
            this.StatusCode = statusCode;

            // null collase parameter 
            this.Message = message ?? GetDefaultMessage(StatusCode);

        }


        public int StatusCode { get; set; }

        public string Message { get; set; }



        private string GetDefaultMessage(int statusCode)
        {
            //c# 8 yoda style mess and new switch case
            return statusCode switch
            {

                400 => "A bad Request, you have made.",
                404 => " Resources forund , naah it was not.",
                401 => "Authorized, no it is not.",
                500 => "Error park to the dark side",
                _ => null
            };
        }
    }
}
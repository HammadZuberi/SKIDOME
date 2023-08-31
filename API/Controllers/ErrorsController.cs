
using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Produces("application/json")]
    [Route("errors/{code}")]
    [ApiExplorerSettings(IgnoreApi =true)]

    public class ErrorsController : BaseApiController
    {
        public IActionResult Errors(int code)
        {


            return new ObjectResult(new ApiResponse(code));
        }

    }
}
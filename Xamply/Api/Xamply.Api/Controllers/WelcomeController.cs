namespace Xamply.Api.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("[controller]")]
    public class WelcomeController : ControllerBase
    {
        public ActionResult<string> Get()
        {
            return "Welcome to Xamply api. For detailed information please check ReadMe.txt file.";
        }
    }
}

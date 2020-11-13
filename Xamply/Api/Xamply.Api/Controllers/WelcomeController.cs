namespace Xamply.Api.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using System.Security.Claims;

    [ApiController]
    [Route("[controller]")]
    public class WelcomeController : ControllerBase
    {
        public ActionResult<string> Get()
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);

            return $"Welcome to Xamply api. For detailed information please check ReadMe.txt file. Currently logged as {userId ?? "not logged"}";
        }
    }
}

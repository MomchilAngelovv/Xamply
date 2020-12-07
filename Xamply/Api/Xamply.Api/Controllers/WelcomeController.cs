namespace Xamply.Api.Controllers
{
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using System.Security.Claims;

    [ApiController]
    [Route("[controller]")]
    public class WelcomeController : ControllerBase
    {
        private readonly IWebHostEnvironment environment;

        public WelcomeController(IWebHostEnvironment environment)
        {
            this.environment = environment;
        }

        public ActionResult<object> Get()
        {
            var env = this.environment.EnvironmentName;

            var response = new
            {
                Environemt = env
            };

            return response;
        }
    }
}

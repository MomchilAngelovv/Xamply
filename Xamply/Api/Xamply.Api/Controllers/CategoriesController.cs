using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Xamply.Api.Services;

namespace Xamply.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoriesService categoriesService;

        public CategoriesController(ICategoriesService categoriesService)
        {
            this.categoriesService = categoriesService;
        }

        public ActionResult<object> Get()
        {
            var categories = this.categoriesService
                .GetAll()
                .Select(category => new
                {
                    category.Id,
                    category.Name
                })
                .ToList();

            var response = new
            {
                Categories = categories
            };

            return response;
        }
    }
}

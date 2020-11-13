namespace Xamply.Api.Controllers
{
    using System.Linq;
    using System.Threading.Tasks;
    using System.Collections.Generic;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Identity;

    using Xamply.Data.Models;
    using Xamply.Api.Services;
    using Xamply.Api.Services.Common;

    [ApiController]
    [Route("[controller]")]
    public class SeedController : ControllerBase
    {
        private readonly UserManager<XamplyUser> userManager;
        private readonly RoleManager<XamplyRole> roleManager;
        private readonly ICategoriesService categoriesService;
        private readonly IDifficultiesService difficultiesService;

        public SeedController(
            UserManager<XamplyUser> userManager,
            RoleManager<XamplyRole> roleManager,
            ICategoriesService categoriesService,
            IDifficultiesService difficultiesService)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.categoriesService = categoriesService;
            this.difficultiesService = difficultiesService;
        }

        public async Task<ActionResult> Get()
        {
            if (this.userManager.Users.Any())
            {
                return this.Ok("Database already seeded.");
            }

            var defaultRole = new XamplyRole
            {
                Name = Roles.Default
            };

            var adminRole = new XamplyRole
            {
                Name = Roles.Admin
            };

            await this.roleManager.CreateAsync(defaultRole);
            await this.roleManager.CreateAsync(adminRole);

            var adminUser = new XamplyUser
            {
                Email = Admin.Email,
                UserName = Admin.Email,
                PhoneNumber = Admin.Phone,
                PhoneNumberConfirmed = true
            };

            await this.userManager.CreateAsync(adminUser, Admin.Password);
            await this.userManager.AddToRoleAsync(adminUser, Xamply.Api.Services.Common.Roles.Admin);

            var categoryNames = new List<string> { "History", "Politics", "Art", "Sports", "Geography", "Mythology" };

            foreach (var category in categoryNames)
            {
                await this.categoriesService.CreateAsync(category);
            }

            var difficultyNames = new List<string> { "Eazy", "Medium", "Hard" };

            foreach (var difficulty in difficultyNames)
            {
                await this.difficultiesService.CreateAsync(difficulty);
            }

            return this.Ok("Successfully data seeded.");
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using Xamply.Api.Models.ExternalApiResponses;
using Xamply.Api.Models.InputModels;
using Xamply.Api.Services;
using Xamply.Api.Utilities;

namespace Xamply.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExamsController : ControllerBase
    {
        private readonly ICategoriesService categoriesService;
        private readonly IDifficultiesService difficultiesService;
        private readonly IHttpClientAsync httpClient;
        private readonly IExamsService examsService;

        public ExamsController(
            ICategoriesService categoriesService,
            IDifficultiesService difficultiesService,
            IHttpClientAsync httpClient,
            IExamsService examsService)
        {
            this.categoriesService = categoriesService;
            this.difficultiesService = difficultiesService;
            this.httpClient = httpClient;
            this.examsService = examsService;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<object>> NewExam(ExamsNewExamInputModel inputModel)
        {
            var category = await this.categoriesService.GetByValueAsync(inputModel.CategoryValue);
            if (category == null)
            {
                return this.NotFound(inputModel.CategoryValue);
            }

            var difficulty = await this.difficultiesService.GetByValueAsync(inputModel.DifficultyValue);
            if (difficulty == null)
            {
                return this.NotFound(inputModel.DifficultyValue);
            }

            var examUrl = $"https://opentdb.com/api.php?amount={inputModel.QuestionCount}&category={category.UrlValue}&difficulty={difficulty.Value.ToLower()}";
            var data = await this.httpClient.GetAsync<ExamApi>(examUrl);

            var exam = await this.examsService.CreateAsync(data.Results, category.Id, difficulty.Id, this.User.FindFirstValue(ClaimTypes.NameIdentifier));

            var respone = new
            {
                Started = DateTime.Now,
                Questions = 1,
                Data = exam
            };

            return respone;
        }
    }
}

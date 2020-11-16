using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Xamply.Api.Models;
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

        public ExamsController(
            ICategoriesService categoriesService,
            IDifficultiesService difficultiesService,
            IHttpClientAsync httpClient)
        {
            this.categoriesService = categoriesService;
            this.difficultiesService = difficultiesService;
            this.httpClient = httpClient;
        }

        [HttpPost]
        public async Task<ActionResult<object>> NewExam(ExamsNewExamInputModel inputModel)
        {
            var category = await this.categoriesService.GetByNameAsync(inputModel.CategoryName);
            if (category == null)
            {
                return this.NotFound(inputModel.CategoryName);
            }

            var difficulty = await this.difficultiesService.GetByNameAsync(inputModel.DifficultyName);
            if (difficulty == null)
            {
                return this.NotFound(inputModel.DifficultyName);
            }

            var examUrl = $"https://opentdb.com/api.php?amount={inputModel.QuestionCount}&category={category.UrlValue}&difficulty={difficulty.Name.ToLower()}";
            var data = await this.httpClient.GetAsync<ExamApiResponse>(examUrl);




            var respone = new
            {
                Started = DateTime.Now,
                Questions = 1,
                Data = data
            };

            return respone;
        }
    }
}

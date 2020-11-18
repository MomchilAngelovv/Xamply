using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
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

        [Authorize]
        public ActionResult<object> MyExams()
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var myExams = this.examsService.GetMyExams(userId);

            var response = new
            {
                MyExams = myExams
            };

            return response;
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

            var examUrl = $"https://opentdb.com/api.php?type=multiple&amount={inputModel.QuestionCount}&category={category.UrlValue}&difficulty={difficulty.Value.ToLower()}";
            var data = await this.httpClient.GetAsync<ExamApi>(examUrl);

            for (int i = 0; i < data.Results.Count; i++)
            {
                data.Results[i].Question = HttpUtility.HtmlDecode(data.Results[i].Question);
            }

            var exam = await this.examsService.CreateAsync(data.Results, category.Id, difficulty.Id, this.User.FindFirstValue(ClaimTypes.NameIdentifier));

            var respone = new
            {
                Exam = new
                {
                    exam.Id,
                    exam.UserId,
                    Difficulty = exam.Difficulty.Value,
                    Category = exam.Category.Value,
                    Started = exam.CreatedOn,
                    exam.QuestionCount,
                    Questions = exam.ExamsQuestions
                        .Select(eq => eq.Question)
                        .Select(q => new
                        {
                            q.Value,
                            Answers = q.Answers.Select(a => new
                            {
                                a.Value,
                                a.IsCorrect
                            })
                            .ToList()
                        })
                        .ToList()
                }
            };

            return respone;
        }
    }
}

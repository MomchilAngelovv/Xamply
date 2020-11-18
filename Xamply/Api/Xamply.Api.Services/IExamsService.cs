using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xamply.Api.Models.ExternalApiResponses;
using Xamply.Data.Models;

namespace Xamply.Api.Services
{
    public interface IExamsService
    {
        Task<Exam> CreateAsync(List<ExamQuestionApi> questionsApi, int categoryId, int difficultyId, string userId);
        IEnumerable<object> GetMyExams(string userId);
    }
}

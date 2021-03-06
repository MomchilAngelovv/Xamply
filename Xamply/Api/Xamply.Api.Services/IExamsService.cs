﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xamply.Api.Models.ExternalApiResponses;
using Xamply.Api.Models.InputModels;
using Xamply.Data.Models;

namespace Xamply.Api.Services
{
    public interface IExamsService
    {
        Task<Exam> CreateAsync(IEnumerable<ExamQuestionApi> questionsApi, int categoryId, int difficultyId, string userId);
        Task<IEnumerable<object>> GetUserExams(string userId);
        Task<int> FinishExamAsync(string examId, IEnumerable<ExamsResultsCheckAnswer> answers);
        Exam GetById(string id);
    }
}

using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
using Xamply.Api.Models.ExternalApiResponses;
using Xamply.Data;
using Xamply.Data.Models;

namespace Xamply.Api.Services
{
    public class ExamsService : IExamsService
    {
        private readonly XamplyDbContext db;
        private readonly IQuestionsService questionsService;

        public ExamsService(
            XamplyDbContext db,
            IQuestionsService questionsService)
        {
            this.db = db;
            this.questionsService = questionsService;
        }


        public async Task<Exam> CreateAsync(List<ExamQuestionApi> questionsApi, int categoryId, int difficultyId, string userId)
        {
            var exam = new Exam
            {
                CategoryId = categoryId,
                DifficultyId = difficultyId,
                QuestionCount = questionsApi.Count,
                UserId = userId
            };

            var questionList = questionsApi.Select(q => q.Question).ToList();
            var searchQuestions = await this.questionsService.GetQuestionListByValues(questionList);
            var searchedQuestionValues = searchQuestions.Select(sq => sq.Value).ToList();

            foreach (var questionApi in questionsApi)
            {
                if (searchedQuestionValues.Contains(questionApi.Question))
                {
                    exam.ExamsQuestions.Add(new ExamQuestion
                    {
                        Exam = exam,
                        Question = searchQuestions.First(x => x.Value == questionApi.Question)
                    });
                }
                else
                {
                    var question = new Question
                    {
                        Value = questionApi.Question
                    };

                    question.Answers.Add(new Answer
                    {
                        Value = questionApi.CorrectAnswer,
                        IsCorrect = true
                    });

                    foreach (var incorrectAnswer in questionApi.IncorrectAnswers)
                    {
                        question.Answers.Add(new Answer
                        {
                            Value = incorrectAnswer,
                            IsCorrect = false,
                        });
                    }

                    exam.ExamsQuestions.Add(new ExamQuestion
                    {
                        Exam = exam,
                        Question = question
                    });
                }
            }

            await this.db.Exams.AddAsync(exam);
            await this.db.SaveChangesAsync();

            return exam;
        }

        public IEnumerable<object> GetMyExams(string userId)
        {
            return this.db.Exams
                .Where(exam => exam.UserId == userId)
                .Select(exam => new
                {
                    exam.Id,
                    Category = exam.Category.Value,
                    Difficulty = exam.Difficulty.Value,
                    exam.QuestionCount
                })
                .ToList();
        }
    }
}

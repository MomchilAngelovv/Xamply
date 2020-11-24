using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
using Xamply.Api.Models.ExternalApiResponses;
using Xamply.Api.Models.InputModels;
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


        public async Task<Exam> CreateAsync(IEnumerable<ExamQuestionApi> questionsApi, int categoryId, int difficultyId, string userId)
        {
            var exam = new Exam
            {
                CategoryId = categoryId,
                DifficultyId = difficultyId,
                QuestionCount = questionsApi.Count(),
                UserId = userId
            };

            var questionList = questionsApi.Select(q => q.Question).ToList();
            var searchQuestions = await this.questionsService.GetQuestionListByValues(questionList);
            var searchedQuestionValues = searchQuestions.Select(sq => sq.Value).ToList();

            foreach (var questionApi in questionsApi)
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

            await this.db.Exams.AddAsync(exam);
            await this.db.SaveChangesAsync();

            return exam;
        }

        public Exam GetById(string id)
        {
            return this.db.Exams
                .Include(e => e.ExamsQuestions)
                    .ThenInclude(e => e.Question)
                        .ThenInclude(q => q.Answers)
                .FirstOrDefault(e => e.Id == id);
        }

        public IEnumerable<object> GetMyExams(string userId)
        {
            return this.db.Exams
                .Where(e => e.UserId == userId)
                .Select(e => new
                {
                    e.Id,
                    Category = e.Category.Value,
                    Difficulty = e.Difficulty.Value,
                    e.QuestionCount
                })
                .ToList();
        }

        public async Task<int> FinishExamAsync(IEnumerable<ExamsResultsCheckAnswer> answers)
        {
            //TODO: Think if we need to pass examId if we dont dublicate questions
            var questionIds = answers.Select(a => a.QuestionId);

            var questionsWithAnswers = await this.db.Questions
                .Where(q => questionIds.Contains(q.Id))
                .Select(q => new
                {
                    q.Id,
                    AnswerText = q.Answers.First(a => a.IsCorrect).Value
                })
                .ToListAsync();

            var correctAnswersCounter = 0;

            foreach (var answer in answers)
            {
                var question = questionsWithAnswers.First(qa => qa.Id == answer.QuestionId);

                if (question.AnswerText == answer.AnswerText)
                {
                    correctAnswersCounter++;
                }
            }

            return correctAnswersCounter;
        }
    }
}

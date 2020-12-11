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

        public async Task<Exam> CreateAsync(IEnumerable<ExamQuestionApi> examQuestions, int categoryId, int difficultyId, string userId)
        {
            //using (this.db.Database.BeginTransaction())
            //{
            //await this.db.SaveChangesAsync();
            //await this.db.SaveChangesAsync();
            //await this.db.SaveChangesAsync();
            //await this.db.SaveChangesAsync();
            //};

            var exam = new Exam
            {
                CategoryId = categoryId,
                DifficultyId = difficultyId,
                QuestionCount = examQuestions.Count(),
                UserId = userId
            };

            var questionList = examQuestions.Select(q => q.Question).ToList();
            var questionsInDb = await this.questionsService.GetQuestionListByValues(questionList);
            var searchedQuestionValues = questionsInDb.Select(sq => sq.Value).ToList();

            foreach (var examQuestion in examQuestions)
            {
                if (questionsInDb.Any(q => q.Value == examQuestion.Question))
                {
                    exam.ExamsQuestions.Add(new ExamQuestion
                    {
                        Exam = exam,
                        Question = questionsInDb.First(q => q.Value == examQuestion.Question)
                    });

                    continue;
                }

                var question = new Question
                {
                    Value = examQuestion.Question
                };

                question.Answers.Add(new Answer
                {
                    Value = examQuestion.CorrectAnswer,
                    IsCorrect = true
                });

                foreach (var incorrectAnswer in examQuestion.IncorrectAnswers)
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

        public async Task<IEnumerable<object>> GetUserExams(string userId)
        {
            var exams = await this.db.Exams
                .Where(e => e.UserId == userId)
                .Select(e => new
                {
                    e.Id,
                    Category = e.Category.Value,
                    Difficulty = e.Difficulty.Value,
                    e.QuestionCount,
                    e.Result.Score
                })
                .ToListAsync();

            return exams;
        }

        public async Task<int> FinishExamAsync(string examId, IEnumerable<ExamsResultsCheckAnswer> answers)
        {
            var exam = this.db.Exams.FirstOrDefault(e => e.Id == examId);

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

            var score = 0.00m;

            if (correctAnswersCounter != 0)
            {
                score = (decimal)correctAnswersCounter / answers.Count() * 100;
            }

            var result = new Result
            {
                ExamId = exam.Id,
                Score = Math.Round(score, 4)
            };

            exam.ResultId = result.Id;

            await this.db.Results.AddAsync(result);
            await this.db.SaveChangesAsync();

            return correctAnswersCounter;
        }
    }
}

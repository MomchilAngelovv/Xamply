using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamply.Data;
using Xamply.Data.Models;

namespace Xamply.Api.Services
{
    public class QuestionsService : IQuestionsService
    {
        private readonly XamplyDbContext db;

        public QuestionsService(XamplyDbContext db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<Question>> GetQuestionListByValues(List<string> values)
        {
            var questions =  await this.db.Questions
                .Where(question => values.Contains(question.Value))
                .ToListAsync();

            return questions;
        }
    }
}

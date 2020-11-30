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
    public class RankingsService : IRankingsService
    {
        private readonly XamplyDbContext db;

        public RankingsService(XamplyDbContext db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<object>> GetUserRankings()
        {
            var users = await this.db.Users
                .Where(u => u.Exams.Count > 0)
                .OrderByDescending(u => u.Exams.Average(e => e.Result.Score))
                .Select(u => new 
                {
                    u.Email,
                    AverageScore = u.Exams.Average(e => e.Result.Score)
                })
                .ToListAsync();

            return users;
        }
    }
}

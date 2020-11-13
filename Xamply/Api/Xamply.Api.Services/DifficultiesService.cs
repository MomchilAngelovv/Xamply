using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xamply.Data;
using Xamply.Data.Models;

namespace Xamply.Api.Services
{
    public class DifficultiesService : IDifficultiesService
    {
        private readonly XamplyDbContext db;

        public DifficultiesService(XamplyDbContext db)
        {
            this.db = db;
        }
        public async Task<Difficulty> CreateAsync(string name)
        {
            var difficulty = new Difficulty
            {
                Name = name,
            };

            await this.db.Difficulties.AddAsync(difficulty);
            await this.db.SaveChangesAsync();

            return difficulty;
        }
    }
}

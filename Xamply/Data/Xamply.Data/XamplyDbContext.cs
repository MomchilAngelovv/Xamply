namespace Xamply.Data
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

    using Xamply.Data.Models;

    public class XamplyDbContext : IdentityDbContext<XamplyUser, XamplyRole, string>
    {
        public XamplyDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Answer> Answers { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Difficulty> Difficulties { get; set; }
        public DbSet<Exam> Exams { get; set; }
        public DbSet<ExamQuestion> ExamsQuestions { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Result> Results { get; set; }
    }
}

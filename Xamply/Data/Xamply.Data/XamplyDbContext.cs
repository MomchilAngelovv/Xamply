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

        public DbSet<Category> Categories { get; set; }
        public DbSet<Difficulty> Difficulties { get; set; }
    }
}

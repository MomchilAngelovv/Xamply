namespace Xamply.Api.Services
{
    using System.Linq;
    using System.Threading.Tasks;

    using Xamply.Data;
    using Xamply.Data.Models;

    public class CategoriesService : ICategoriesService
    {
        private readonly XamplyDbContext db;

        public CategoriesService(XamplyDbContext db)
        {
            this.db = db;
        }

        public async Task<Category> CreateAsync(string name)
        {
            var category = new Category
            {
                Name = name,
            };

            await this.db.Categories.AddAsync(category);
            await this.db.SaveChangesAsync();

            return category;
        }

        public IQueryable<Category> GetAll()
        {
            return this.db.Categories;
        }
    }
}

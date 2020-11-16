namespace Xamply.Api.Services
{
    using Microsoft.EntityFrameworkCore;
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

        public async Task<Category> CreateAsync(string name, string urlValue)
        {
            var category = new Category
            {
                Value = name,
                UrlValue = urlValue,
            };

            await this.db.Categories.AddAsync(category);
            await this.db.SaveChangesAsync();

            return category;
        }

        public IQueryable<Category> GetAll()
        {
            return this.db.Categories;
        }

        public async Task<Category> GetByValueAsync(string value)
        {
            return await this.db.Categories.FirstOrDefaultAsync(category => category.Value == value);
        }
    }
}

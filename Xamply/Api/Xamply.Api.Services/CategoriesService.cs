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
            var imageUrl = name switch
            {
                "History" => "https://img.freepik.com/free-vector/open-book-with-history-doodles-lettering-education-illustration_288944-5.jpg?size=626&ext=jpg",
                "Politics" => "https://www.abqjournal.com/wp-content/uploads/2020/12/02/BC-ML-Israel-Politics-IMG.jpg",
                "Art" => "https://media.istockphoto.com/photos/vintage-stylized-photo-of-paintbrushes-closeup-and-artist-palett-picture-id577949148?k=6&m=577949148&s=612x612&w=0&h=9NlFjyVPRyk2gt-K4Pa568rT-OUudYXqgEi4WGqt8TY=",
                "Sports" => "https://upload.wikimedia.org/wikipedia/commons/4/49/Philipp_Lahm_Training_2017-05_FC_Bayern_Muenchen-1.jpg",
                _ => "Unknown"
            };

            var category = new Category
            {
                Value = name,
                UrlValue = urlValue,
                ImageUrl = imageUrl
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

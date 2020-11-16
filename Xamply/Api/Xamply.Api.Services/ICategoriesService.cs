namespace Xamply.Api.Services
{
    using System.Linq;
    using System.Threading.Tasks;

    using Xamply.Data.Models;

    public interface ICategoriesService
    {
        Task<Category> CreateAsync(string name, string urlValue);
        Task<Category> GetByNameAsync(string name);
        IQueryable<Category> GetAll();
    }
}

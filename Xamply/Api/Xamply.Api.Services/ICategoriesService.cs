namespace Xamply.Api.Services
{
    using System.Linq;
    using System.Threading.Tasks;

    using Xamply.Data.Models;

    public interface ICategoriesService
    {
        Task<Category> CreateAsync(string value, string urlValue);
        Task<Category> GetByValueAsync(string value);
        IQueryable<Category> GetAll();
    }
}

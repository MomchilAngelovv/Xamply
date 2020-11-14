namespace Xamply.Api.Services
{
    using System.Collections;
    using System.Linq;
    using System.Threading.Tasks;

    using Xamply.Data.Models;

    public interface ICategoriesService
    {
        Task<Category> CreateAsync(string name);
        IQueryable<Category> GetAllAsQuarable();
    }
}

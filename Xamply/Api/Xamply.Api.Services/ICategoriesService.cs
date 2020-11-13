namespace Xamply.Api.Services
{
    using System.Threading.Tasks;

    using Xamply.Data.Models;

    public interface ICategoriesService
    {
        Task<Category> CreateAsync(string name);
    }
}

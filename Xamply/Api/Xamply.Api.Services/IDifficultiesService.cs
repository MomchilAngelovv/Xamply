namespace Xamply.Api.Services
{
    using System.Threading.Tasks;

    using Xamply.Data.Models;

    public interface IDifficultiesService
    {
        Task<Difficulty> CreateAsync(string name);
    }
}

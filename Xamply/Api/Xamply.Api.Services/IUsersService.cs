using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xamply.Data.Models;

namespace Xamply.Api.Services
{
    public interface IUsersService
    {
        Task<XamplyUser> RegisterAsync(string email, string password);
        Task<XamplyUser> LoginAsync(string email, string password);
    }
}

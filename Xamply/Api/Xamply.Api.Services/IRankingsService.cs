using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamply.Data.Models;

namespace Xamply.Api.Services
{
    public interface IRankingsService
    {
        Task<IEnumerable<object>> GetUserRankings();
    }
}

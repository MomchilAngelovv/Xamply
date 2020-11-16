using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Xamply.Api.Utilities
{
    public interface IHttpClientAsync
    {
        Task<T> GetAsync<T>(string url);
    }
}

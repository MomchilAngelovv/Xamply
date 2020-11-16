using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Net.Http;
using System.Threading.Tasks;

namespace Xamply.Api.Utilities
{
    public class HttpClientAsync : IHttpClientAsync
    {
        private readonly HttpClient httpClient;

        public HttpClientAsync(IHttpClientFactory httpClientFactory)
        {
            this.httpClient = httpClientFactory.CreateClient();
        }

        public async Task<T> GetAsync<T>(string url)
        {
            var response = await httpClient.GetAsync(url);
            var data = await response.Content.ReadAsStringAsync();

            var options = new JsonSerializerOptions
            {
                AllowTrailingCommas = true,
                PropertyNameCaseInsensitive = true,
            };

            var mappedData = JsonSerializer.Deserialize<T>(data, options);
            return mappedData;
        }
    }
}

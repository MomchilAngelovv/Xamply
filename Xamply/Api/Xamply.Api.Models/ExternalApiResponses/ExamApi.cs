namespace Xamply.Api.Models.ExternalApiResponses
{
    using System.Collections.Generic;
    using System.Text.Json.Serialization;

    public class ExamApi
    {
        [JsonPropertyName("Response_Code")]
        public int ResponseCode { get; set; }
        public List<ExamQuestionApi> Results { get; set; }
    }
}

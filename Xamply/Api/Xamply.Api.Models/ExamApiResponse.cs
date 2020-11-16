namespace Xamply.Api.Models
{
    using System.Collections.Generic;

    public class ExamApiResponse
    {
        public int Response_Code { get; set; }
        public List<QuestionApiResponse> Results { get; set; }
    }
}

namespace Xamply.Api.Models
{
    using System.Collections.Generic;

    public class QuestionApiResponse
    {
        public string Category { get; set; }
        public string Type { get; set; }
        public string Difficulty { get; set; }
        public string Question { get; set; }
        public string Correct_Answer { get; set; }
        public List<string> Incorrect_Answers { get; set; }
    }
}

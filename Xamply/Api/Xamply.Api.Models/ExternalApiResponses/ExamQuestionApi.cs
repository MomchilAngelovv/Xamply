namespace Xamply.Api.Models.ExternalApiResponses
{
    using System.Collections.Generic;
    using System.Text.Json.Serialization;

    public class ExamQuestionApi
    {
        public string Category { get; set; }
        public string Type { get; set; }
        public string Difficulty { get; set; }
        public string Question { get; set; }
        [JsonPropertyName("Correct_Answer")]
        public string CorrectAnswer { get; set; }
        [JsonPropertyName("Incorrect_Answers")]
        public List<string> IncorrectAnswers { get; set; }
    }
}

namespace Xamply.Api.Models.InputModels
{
    using System.Collections.Generic;

    public class ExamsResultsCheckInputModel
    {
        public string ExamId { get; set; }
        public IEnumerable<ExamsResultsCheckAnswer> Answers { get; set; }
    }
}

namespace Xamply.Api.Models.InputModels
{
    using System.Collections.Generic;

    public class ExamsResultsCheckInputModel
    {
        public IEnumerable<ExamsResultsCheckAnswer> Answers { get; set; }
    }
}

namespace Xamply.Api.Models.InputModels
{
    using System.ComponentModel.DataAnnotations;

    public class ExamsNewExamInputModel
    {
        [Range(1, 50)]
        public int QuestionCount { get; set; }
        [Required]
        public string CategoryValue { get; set; }
        [Required]
        public string DifficultyValue { get; set; }
    }
}

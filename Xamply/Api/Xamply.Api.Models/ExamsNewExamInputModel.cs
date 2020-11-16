namespace Xamply.Api.Models
{
    using System.ComponentModel.DataAnnotations;

    public class ExamsNewExamInputModel
    {
        [Range(1,50)]
        public int QuestionCount { get; set; }
        [Required]
        public string CategoryName { get; set; }
        [Required]
        public string DifficultyName { get; set; }
    }
}

namespace Xamply.Data.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class ExamQuestion : IEntityMetaData
    {
        public ExamQuestion()
        {
            this.Id = Guid.NewGuid().ToString("N");
            this.CreatedOn = DateTime.UtcNow;
        }

        public string Id { get; set; }
        [Required]
        public string ExamId { get; set; }
        [Required]
        public string QuestionId { get; set; }

        public virtual Exam Exam { get; set; }
        public virtual Question Question { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public DateTime? DeletedOn { get; set; }
        public string MetaData { get; set; }
    }
}

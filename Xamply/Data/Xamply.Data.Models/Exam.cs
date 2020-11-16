namespace Xamply.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class Exam : IEntityMetaData
    {
        public Exam()
        {
            this.Id = Guid.NewGuid().ToString("N");
            this.CreatedOn = DateTime.UtcNow;
        }

        public string Id { get; set; }
        [Range(0, 50)]
        public int QuestionCount { get; set; }
        public int CategoryId { get; set; }
        public int DifficultyId { get; set; }
        public string UserId { get; set; }

        public virtual XamplyUser User { get; set; }
        public virtual Category Category { get; set; }
        public virtual Difficulty Difficulty { get; set; }

        public virtual ICollection<ExamQuestion> ExamsQuestions { get; set; } = new HashSet<ExamQuestion>();

        public DateTime CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public DateTime? DeletedOn { get; set; }
        public string MetaData { get; set; }
    }
}

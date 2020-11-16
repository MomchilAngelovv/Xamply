namespace Xamply.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using Xamply.Data.Models.Common;

    public class Question : IEntityMetaData
    {
        public Question()
        {
            this.Id = Guid.NewGuid().ToString("N");
            this.CreatedOn = DateTime.UtcNow;
        }
        
        public string Id { get; set; }
        [Required]
        [MaxLength(LengthConstraints.Long)]
        public string Value { get; set; }

        public virtual ICollection<ExamQuestion> ExamsQuestions { get; set; } = new HashSet<ExamQuestion>();
        public virtual ICollection<Answer> Answers { get; set; } = new HashSet<Answer>();

        public DateTime CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public DateTime? DeletedOn { get; set; }
        public string MetaData { get; set; }
    }
}

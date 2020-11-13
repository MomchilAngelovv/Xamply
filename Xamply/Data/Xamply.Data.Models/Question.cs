namespace Xamply.Data.Models
{
    using System;
    using System.Collections.Generic;

    public class Question : IEntityMetaData
    {
        public Question()
        {
            this.Id = Guid.NewGuid().ToString("N");
            this.CreatedOn = DateTime.UtcNow;
        }
        
        public string Id { get; set; }

        public virtual ICollection<ExamQuestion> ExamsQuestions { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public DateTime? DeletedOn { get; set; }
        public string MetaData { get; set; }
    }
}

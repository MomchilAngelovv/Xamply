namespace Xamply.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using Xamply.Data.Models.Common;

    public class Category : IEntityMetaData
    {
        public Category()
        {
            this.CreatedOn = DateTime.UtcNow;
        }

        public int Id { get; set; }
        [Required]
        [MaxLength(LengthConstraints.Short)]
        public string Value { get; set; }
        public string UrlValue { get; set; }

        public virtual ICollection<Exam> Exams { get; set; } = new HashSet<Exam>();

        public DateTime CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public DateTime? DeletedOn { get; set; }
        public string MetaData { get; set; }
    }
}

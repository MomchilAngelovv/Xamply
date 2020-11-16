using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Text;
using Xamply.Data.Models.Common;

namespace Xamply.Data.Models
{
    public class Answer : IEntityMetaData
    {
        public Answer()
        {
            this.Id = Guid.NewGuid().ToString("N");
            this.CreatedOn = DateTime.UtcNow;
        }

        public string Id { get; set; }
        [Required]
        [MaxLength(LengthConstraints.Average)]
        public string Value { get; set; }
        public bool IsCorrect { get; set; }
        [Required]
        public string QuestionId { get; set; }

        public virtual Question Question { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public DateTime? DeletedOn { get; set; }
        public string MetaData { get; set; }
    }
}

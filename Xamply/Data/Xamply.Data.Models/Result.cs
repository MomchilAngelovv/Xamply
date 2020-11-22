using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Xamply.Data.Models
{
    public class Result : IEntityMetaData
    {
        public Result()
        {
            this.Id = Guid.NewGuid().ToString("N");
            this.CreatedOn = DateTime.UtcNow;
        }

        public string Id { get; set; }
        [Column(TypeName = "decimal(4, 4)")]
        public decimal Score { get; set; }
        public string ExamId { get; set; }

        public virtual Exam Exam { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public DateTime? DeletedOn { get; set; }
        public string MetaData { get; set; }
    }
}

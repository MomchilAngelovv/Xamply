namespace Xamply.Data.Models
{
    using System;
    using System.Collections.Generic;

    using Microsoft.AspNetCore.Identity;

    public class XamplyUser : IdentityUser<string>, IEntityMetaData
    {
        public XamplyUser()
        {
            this.Id = Guid.NewGuid().ToString("N");
            this.CreatedOn = DateTime.UtcNow;
        }

        public virtual ICollection<Exam> Exams { get; set; } =  new HashSet<Exam>();

        public DateTime CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public DateTime? DeletedOn { get; set; }
        public string MetaData { get; set; }
    }
}

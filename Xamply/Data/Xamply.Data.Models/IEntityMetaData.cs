﻿namespace Xamply.Data.Models
{
    using System;

    public interface IEntityMetaData
    {
        public DateTime CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public DateTime? DeletedOn { get; set; }
        public string MetaData { get; set; }
    }
}

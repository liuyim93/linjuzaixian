using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.domain
{
    public abstract class Entity:BaseObject
    {
        public Entity()
        {
            Id = Guid.NewGuid().ToString();
            CreateTime = DateTime.Now;
            IsDelete = false;
            Version = 1;
        }
        public virtual string Id { get; protected set; }

        public virtual DateTime CreateTime { get; protected set; }

        public virtual bool IsDelete { get; set; }

        public virtual Int32 Version { get; protected set; }

        public virtual int EntityIndex { get; set; }
    }
}

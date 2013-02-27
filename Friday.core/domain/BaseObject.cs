using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.domain
{
    [Serializable]
    public abstract class BaseObject
    {
        public BaseObject()
        {
            IsDelete = false;
        }
        public virtual bool IsDelete { get; set; }
    }
}

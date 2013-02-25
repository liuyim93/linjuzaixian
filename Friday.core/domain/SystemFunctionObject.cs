using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class SystemFunctionObject:Entity
    {
        public virtual string PermissonTag
        {
            get;
            set;
        }
        public virtual string FunctionObjectName
        {
            get;
            set;
        }
        public virtual string ParentFunctionObjectId
        {
            get;
            set;
        }
        public virtual bool FunctionAvailable
        {
            get;
            set;
        }
        public virtual bool DeletePermissionAvailable
        {
            get;
            set;
        }
        public virtual bool EditPermissionAvailable
        {
            get;
            set;
        }
        public virtual string Description
        {
            get;
            set;
        }
    }
}

using System;
using System.Linq;
using System.Text;
using friday.core.EnumType;
using Iesi.Collections.Generic;
namespace friday.core.domain
{
    public class FeedBack:Entity
    {
        public virtual SystemUser SystemUser
        {
            set;

            get;
        }

        public virtual string Contents
        {
            set;

            get;
        }

        public virtual string Type
        {
            set;

            get;
        }

        public virtual FeedBack ParentFeedBack
        {
            set;

            get;
        }

        public virtual ISet<FeedBack> ChildFeedBack
        {
            set;

            get;
        }
    }
}

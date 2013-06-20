using System;
using System.Linq;
using System.Text;
using friday.core.EnumType;
using Iesi.Collections.Generic;

namespace friday.core.domain
{
    public class FeedBack:Entity
    {
        //LoginUser发消息给管理员的表，管理员给大家回复
        public FeedBack()
        {
            ChildFeedBacks = new Iesi.Collections.Generic.HashedSet<FeedBack>();

        }

        public virtual LoginUser LoginUser
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

        public virtual ISet<FeedBack> ChildFeedBacks
        {
            set;

            get;
        }
    }
}

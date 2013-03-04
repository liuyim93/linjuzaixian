using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class Message:Entity
    {

        public virtual LoginUser LoginUser
        {
            get;
            set;
        }

        public virtual Merchant Merchant
        {
            get;
            set;
        }

        public virtual string ThreadIndex
        {
            get;
            set;
        }

     

        public virtual string TrackIndex
        {
            get;
            set;
        }

        public virtual bool IsNew
        {
            get;
            set;
        }

        public virtual MessageContent MessageContent
        {
            get;
            set;
        }
        public virtual int MessageType
        {
            get;
            set;
        }
    }
}

using System;
using System.Linq;
using System.Text;
using friday.core.domain;
using Iesi.Collections.Generic;
using friday.core.EnumType;
using System.Collections.Generic;
using friday.core;

namespace friday.core.domain
{
    public class DataAttachment : Entity
    {
        public virtual string AttachmentName
        {
            get;
            set;
        }

        public virtual string AttachmentUrl
        {
            get;
            set;
        }

        public virtual string Description
        {
            get;
            set;
        }

        public virtual DataResource DataResource
        {
            get;
            set;
        }

    }
}

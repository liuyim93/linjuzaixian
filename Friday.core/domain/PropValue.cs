﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.domain
{
    public class PropValue : BaseObject
    {
        public PropValue()
        {
            CreateTime = DateTime.Now;
        }
        public virtual int Id
        {
            get;
            set;
        }
        public virtual string PropValueName
        {
            get;
            set;
        }
        public virtual DateTime CreateTime
        {
            get;
            protected set;
        }
        public virtual PropID PropID
        {
            get;
            set;
        }
        public virtual Merchant Merchant
        {
            get;

            set;
        }
    }
}

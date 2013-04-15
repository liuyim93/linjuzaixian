﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.domain
{
    public class SKUProp : BaseObject
    {
        public virtual int Id
        {
            get;
            set;
        }
        public virtual PropID PropID
        {
            get;
            set;
        }
        public virtual PropValue PropValue
        {
            get;
            set;
        }
    }
}
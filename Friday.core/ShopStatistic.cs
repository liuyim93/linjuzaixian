﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class ShopStatistic:MerchantStatistic
    {
        public virtual Shop Shop
        {
            get;
            set;
        }
    }
}

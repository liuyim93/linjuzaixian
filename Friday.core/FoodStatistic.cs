﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class FoodStatistic:Statistic
    {
        public Food Food
        {
            get;
            set;
        }
    }
}

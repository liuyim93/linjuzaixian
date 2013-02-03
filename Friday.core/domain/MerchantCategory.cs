﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.EnumType;

namespace friday.core
{
    public class MerchantCategory:Entity
    {
        //对于Restaurant有中餐 西餐 清真……；对于Shop有服装、电子产品、化妆品……；对于Rent
         public MerchantCategory()
        {
            // TODO: Complete member initialization
        }

         public MerchantCategory(string id): this()
        {
            this.Id = id;
        }
        //中餐 西餐 清真
        public virtual string MerchantCategoryName
        {
            get;

            set;
        }
        //餐馆、租房、百货
        public virtual MerchantTypeEnum MerchantType
        {
            get;

            set;
        }
    }
}

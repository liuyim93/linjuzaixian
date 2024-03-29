﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public abstract class AbstractCommodity:Entity
    {
        public virtual string Image
        {
            get;

            set;

        }
        public virtual string Image1
        {
            get;

            set;

        }
        public virtual string Image2
        {
            get;

            set;

        }
        public virtual string Image3
        {
            get;

            set;

        }
        public virtual string Name
        {
            get;

            set;
        }
        public virtual double OldPrice
        {
            get;

            set;

        }
        //2013-01-22 basilwang 存货数量
        public virtual double InventoryCount
        {
            get;

            set;

        }
        public virtual double Price
        {
            get;

            set;

        }
        //2013-01-22 basilwang 上架/下架
        public virtual bool IsEnabled
        {
            get;

            set;

        }

        //2013-02-16 pangfuxing add IsDiscount/IsLimited/DiscountInventoryCount/DiscountPrice
        public virtual bool IsDiscount
        {
            get;
            set;
        }

        public virtual bool IsLimited
        {
            get;
            set;
        }

        public virtual double DiscountInventoryCount
        {
            get;
            set;
        }

        public virtual double DiscountPrice
        {
            get;
            set;
        }

       

        //public virtual MerchantGoodsType MerchantGoodsType
        //{
        //    get;

        //    set;
        //}
        public virtual GlobalGoodsType GlobalGoodsType
        {
            get;

            set;
        }
        //2013-05-09 basilwang 便捷属性
        public virtual string GlobalGoodsTypeFamily
        {
            get;

            set;
        }
        public virtual decimal Amount
        {
            get;
            set;
        }
        public virtual int ValuingCount
        {
            get;
            set;
        }
        public virtual float AverageValuing
        {
            get;
            set;
        }
        public virtual int MonthAmount
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

using System;
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
        public virtual MerchantGoodsType MerchantGoodsType
        {
            get;

            set;
        }
         
          
    }
}

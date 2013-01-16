using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.EnumType;

namespace friday.core
{
    public class Merchant:Entity
    {
        public virtual String Name
        {
            get;

            set;

        }
        public virtual String ShortName
        {
            get;

            set;
        }

        public virtual String Owener
        {
            set;

            get;

        }

        public virtual string Logo
        {
            get;

            set;

        }
        public virtual string Description
        {
            get;

            set;

        }
        public virtual string Bulletins
        {
            get;

            set;

        }

        public virtual string Address
        {
            get;

            set;

        }
        public virtual string Tel
        {
            get;

            set;
        }
        public virtual string ShopHours
        {
            set;

            get;
        }
        public virtual string Activity
        {
            get;

            set;
        }
        public virtual string Distance
        {
            get;

            set;

        }

        public virtual double Rate //提成比率
        {
            set;

            get;
        }


        public virtual ShopStatusEnum ShopStatus
        {
            get;

            set;

        }

        public virtual MerchantCategory MerchantCategory
        {
            get;

            set;
        }
        public virtual Iesi.Collections.Generic.ISet<MerchantGoodsType> MerchantGoodsTypes
        {
            get;

            set;
        }
        ///TODO add UnionGoodsTypes only get 
        //School M:N Shop
        public virtual Iesi.Collections.Generic.ISet<SchoolOfMerchant> SchoolOfMerchants
        {

            set;

            get;
        }

        public virtual Iesi.Collections.Generic.ISet<MyOrder> MyOrders
        {
            get;

            set;
        }
        //Shop 1:N Food
        public virtual Iesi.Collections.Generic.ISet<Commodity> Commodities
        {
            get;

            set;
        }

    }
}

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
        public Merchant()
        {
            //MerchantGoodsTypes = new Iesi.Collections.Generic.HashedSet<MerchantGoodsType>();
            SchoolOfMerchants = new Iesi.Collections.Generic.HashedSet<SchoolOfMerchant>();
            LoginUserOfMerchants = new Iesi.Collections.Generic.HashedSet<LoginUserOfMerchant>();
            PropIDs = new Iesi.Collections.Generic.HashedSet<PropID>();
            PropValues = new Iesi.Collections.Generic.HashedSet<PropValue>();
        }

        public virtual string Email
        {
            get;

            set;

        }

        public virtual string Description
        {
            get;

            set;

        }
        public virtual string Name
        {
            get;

            set;

        }
        public virtual string ShortName
        {
            get;

            set;
        }

        public virtual string Owener
        {
            set;

            get;

        }

        public virtual string Logo
        {
            get;

            set;

        }
        public virtual string sBrand
        {
            get;

            set;

        }
        public virtual string bBrand
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

        public virtual MerchantTypeEnum MerchantType
        {
            get;

            set;
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
        //public virtual Iesi.Collections.Generic.ISet<MerchantGoodsType> MerchantGoodsTypes
        //{
        //    get;

        //    set;
        //}
        ///TODO add UnionGoodsTypes only get 
        //School M:N Shop
        public virtual Iesi.Collections.Generic.ISet<SchoolOfMerchant> SchoolOfMerchants
        {

            set;

            get;
        }

        public virtual Iesi.Collections.Generic.ISet<LoginUserOfMerchant> LoginUserOfMerchants
        {
            get;
            set;
        }
        public virtual Iesi.Collections.Generic.ISet<PropID> PropIDs
        {
            get;

            set;
        }
        public virtual Iesi.Collections.Generic.ISet<PropValue> PropValues
        {
            get;

            set;
        }
       
       

    }
}

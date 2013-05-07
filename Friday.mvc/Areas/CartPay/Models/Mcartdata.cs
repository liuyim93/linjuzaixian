using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Friday.mvc.Areas.CartPay.Models
{
    public class Mcartdata
    {
        public bool success
        {
            get;
            set;
        }
        public globalData globalData
        {
            get;
            set;
        }
        public List<listItem> list
        {
            get;
            set;
        }
    }

    public class globalData
    {
        public int totalSize
        {
            get;
            set;
        }
        public int invalidSize
        {
            get;
            set;
        }
        public bool isAllCItem
        {
            get;
            set;
        }
        public int diffTairCount
        {
            get;
            set;
        }
        public bool login
        {
            get;
            set;
        }
        public bool openNoAttenItem
        {
            get;
            set;
        }
    }

    public class price
    {
        public int now
        {
            get;
            set;
        }
        public int origin
        {
            get;
            set;
        }
        public int descend
        {
            get;
            set;
        }
        public int save
        {
            get;
            set;
        }
        public int sum
        {
            get;
            set;
        }
        public int actual
        {
            get;
            set;
        }
    }
    public class amount
    {
        public int now
        {
            get;
            set;
        }
        public int max
        {
            get;
            set;
        }
    }
    public class ItemIconMeta
    {
        public string title
        {
            get;
            set;
        }
        public string link
        {
            get;
            set;
        }
        public string img
        {
            get;
            set;
        }
    }

    public class itemIcon
    {
        List<ItemIconMeta> MALL_CART_XIAOBAO
        {
            get;
            set;
        }
    }

    public class order
    {
        public string id
        {
            get;
            set;
        }
        public string itemId
        {
            get;
            set;
        }
        public int skuId
        {
            get;
            set;
        }
        public string cartId
        {
            get;
            set;
        }
        public bool isValid
        {
            get;
            set;
        }
        public string url
        {
            get;
            set;
        }
        public string pic
        {
            get;
            set;
        }
        public string title
        {
            get;
            set;
        }
        public string shopId
        {
            get;
            set;
        }
        public string shopName
        {
            get;
            set;
        }
        public string seller
        {
            get;
            set;
        }
        public price price
        {
            get;
            set;
        }
        public amount amount
        {
            get;
            set;
        }
        public itemIcon itemIcon
        {
            get;
            set;
        }
        public bool isCod
        {
            get;
            set;
        }
        public bool isAttention
        {
            get;
            set;
        }
    }
    public class bundles
    {
        IList<order> orders
        {
            get;
            set;
        }
    }
    public class listItem
    {
        public string id
        {
            get;
            set;
        }
        public string title
        {
            get;
            set;
        }
        public string type
        {
            get;
            set;
        }
        public string url
        {
            get;
            set;
        }
        public string seller
        {
            get;
            set;
        }
        public string host
        {
            get;
            set;
        }
        public bool isValid
        {
            get;
            set;
        }
        public int gmtCompare
        {
            get;
            set;
        }
        public bundles bundles
        {
            get;
            set;
        }
    }
}
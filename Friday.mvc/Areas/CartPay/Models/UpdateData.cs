using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Friday.mvc.Areas.CartPay.Models
{
    public class UpdateData
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
        public List<UpdateListItem> list
        {
            get;
            set;
        }
    }

    public class UpdateOrderItem
    {
        public string id
        {
            get;
            set;
        }
        public price price
        {
            get;
            set;
        }
    }

    public class UpdateListItem
    {
        public string id
        {
            get;
            set;
        }
        public List<UpdateOrderItem> orders
        {
            get;
            set;
        }
    }
}
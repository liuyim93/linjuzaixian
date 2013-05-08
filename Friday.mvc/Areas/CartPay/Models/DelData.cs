using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Friday.mvc.Areas.CartPay.Models
{
    public class DelData
    {
        public bool success
        {
            get;
            set;
        }
        public DelGlobalData globalData
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

    public class DelGlobalData
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
        public Sss sss
        {
            get;
            set;
        }
    }

    public class Sss
    {
        public string token
        {
            get;
            set;
        }
        public int quantity
        {
            get;
            set;
        }
    }
}
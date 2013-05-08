using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Friday.mvc.Areas.CartPay.Models
{
    public class RenderList
    {
        public RenderList()
        {
            renderItems = new List<RenderItem>();
        }

        public List<RenderItem> renderItems
        {
            get;
            set;
        }
    }
    public class RenderItem
    {
        public string area_url
        {
            get;
            set;
        }
        public string id
        {
            get;
            set;
        }
        public string img
        {
            get;
            set;
        }
        public string title
        {
            get;
            set;
        }
        public double price
        {
            get;
            set;
        }
        public string url
        {
            get;
            set;
        }
    }
}
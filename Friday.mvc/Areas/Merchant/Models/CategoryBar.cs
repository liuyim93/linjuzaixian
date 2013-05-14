using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Friday.mvc.Areas.Merchant.Models
{
    public class CategoryBar
    {
        public CategoryBar()
        {
            this.categoryItems = new List<Friday.mvc.Areas.Merchant.Models.CategoryItem>();
        }

        public IList<CategoryItem> categoryItems
        {
            get;
            set;
        }
    }

    public class CategoryItem
    {
        public string href
        {
            get;
            set;
        }
        public string title
        {
            get;
            set;
        }
        public string atp
        {
            get;
            set;
        }
    }

}
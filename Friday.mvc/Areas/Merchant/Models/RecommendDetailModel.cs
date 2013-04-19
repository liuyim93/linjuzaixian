using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Friday.mvc.Areas.Merchant.Models
{
    public class RecommendDetailModel
    {
        public string id
        {
            get;
            set;
        }
        public string sellerId
        {
            get;
            set;
        }
        public string title
        {
            get;
            set;
        }
        public string url
        {
            get;
            set;
        }
		public string img
        {
            get;
            set;
        }
        public int commentNum
        {
            get;
            set;
        }
        public float rate
        {
            get;
            set;
        }
        public float price
        {
            get;
            set;
        }
         public float marketPrice
        {
            get;
            set;
        }
        public string lastBitOfSCM
        {
            get;
            set;
        }
    }
    
}
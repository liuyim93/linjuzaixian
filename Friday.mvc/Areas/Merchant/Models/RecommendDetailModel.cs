using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Friday.mvc.Areas.Merchant.Models
{
    public class RecommendDetailModel
    {
        public object recommend
        {
            get;
            set;
        }
        public string acurl
        {
            get;
            set;
        }
    }
    public class  Recommend
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
        public double rate
        {
            get;
            set;
        }
        public double price
        {
            get;
            set;
        }
         public double marketPrice
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
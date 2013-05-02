using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Friday.mvc.Areas.Merchant.Models
{
    public class DSRModel
    {
        public DSR dsr
        {
            get;
            set;
        }
    }
    public class DSR
    {
        public float gradeAvg
        {
            get;
            set;
        }
        public string itemId
        {
            get;
            set;
        }
        public int peopleNum
        {
            get;
            set;
        }
        public int periodSoldQuantity
        {
            get;
            set;
        }
        public int rateTotal
        {
            get;
            set;
        }
        public string sellerId
        {
            get;
            set;
        }
        public string spuId
        {
            get;
            set;
        }
        public int totalSoldQuantity
        {
            get;
            set;
        }
    }
}
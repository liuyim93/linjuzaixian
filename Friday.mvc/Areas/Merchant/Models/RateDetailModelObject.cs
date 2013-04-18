using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Friday.mvc.Areas.Merchant.Models
{
    public class RateDetailModelObject
    {
        public Paginator paginator
        {
            get;
            set;
        }
        public RateCount rateCount
        {
            get;
            set;
        }
        public RateDanceInfo rateDanceInfo
        {
            get;
            set;
        }
        public Object rate
        {
            get;
            set;
        }
        public Object tags
        {
            get;
            set;
        }
    }
    public class Paginator
    {
        public int items
        {
            get;
            set;
        }
        public int lastPage
        {
            get;
            set;
        }
        public int page
        {
            get;
            set;
        }
    }
    public class RateCount
    {
        public int shop
        {
            get;
            set;
        }
        public int total
        {
            get;
            set;
        }
        public int used
        {
            get;
            set;
        }
    }
    public class RateDanceInfo
    {
        public  string currentMilles
        {
            get;
            set;
        }
        public  string intervalMilles
        {
            get;
            set;
        }
        public bool showChooseTopic 
        {
            get;
            set;
        }
        public int storeType
        {
            get;
            set;
        }
    }
    public class Rate
    {
        public bool aliMallSeller 
        {
            get;
            set;
        }
        public bool anony 
        {
            get;
            set;
        }
        public object appendComment
        {
            get;
            set;
        }
        public object attributes
        {
            get;
            set;
        }
        public string auctionSku
        {
            get;
            set;
        }
        public int buyCount 
        {
            get;
            set;
        }
        public string cmsSource 
        {
            get;
            set;
        }
        public string displayRatePic 
        {
            get;
            set;
        }
        public int displayRateSum 
        {
            get;
            set;
        }
        public string displayUserLink 
        {
            get;
            set;
        }
        public string displayUserNick 
        {
            get;
            set;
        }
        public string displayUserNumId 
        {
            get;
            set;
        }
        public string displayUserRateLink 
        {
            get;
            set;
        }
         public double dsr 
        {
            get;
            set;
        }
        public bool fromMall 
        {
            get;
            set;
        }
        public int fromMemory 
        {
            get;
            set;
        }
        public string id 
        {
            get;
            set;
        }
        public string position 
        {
            get;
            set;
        }
        public string rateContent 
        {
            get;
            set;
        }
        public string rateDate 
        {
            get;
            set;
        }
        public string reply 
        {
            get;
            set;
        }
        public string serviceRateContent 
        {
            get;
            set;
        }
        public int tamllSweetLevel 
        {
            get;
            set;
        }
        public string tmallSweetPic 
        {
            get;
            set;
        }
        public bool useful 
        {
            get;
            set;
        }
        public string userInfo 
        {
            get;
            set;
        }
        public int userVipLevel 
        {
            get;
            set;
        }
        public string userVipPic 
        {
            get;
            set;
        }
    }
    
}
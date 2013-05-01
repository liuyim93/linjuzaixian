using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Friday.mvc.Areas.Merchant.Models
{
    public class DcModel
    {
        public DcPartial DcHd
        {
            get;
            set;
        }
        public DcPartial DcFt
        {
            get;
            set;
        }
        public DcPartial DcLeft
        {
            get;
            set;
        }
        public DcPartial DcTopRight
        {
            get;
            set;
        }
        public DcPartial DcBottomRight
        {
            get;
            set;
        }
        public bool isSuccess
        {
            get;
            set;
        }
        public DateTime renderTime
        {
            get;
            set;
        }
        public DateTime releaseTime
        {
            get;
            set;
        }
    }
    public class DcPartial
    {
        public string html
        {
            get;
            set;
        }
    }
}
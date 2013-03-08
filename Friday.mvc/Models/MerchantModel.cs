using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Friday.mvc.Models
{
    public class MerchantModel
    {
        public string actCode { get; set; }

        public string actCodeName { get; set; }

        public bool actDesc { get; set; }

        public bool activityType { get; set; }

        public bool bigPicBrand { get; set; }

        public bool brandDesc { get; set; }

        public bool brandId { get; set; }

        public bool brandName { get; set; }

        public bool cat { get; set; }

        public bool dx { get; set; }

        public bool isCol { get; set; }

        public bool lastBitOfSCM { get; set; }

        public bool linkedUrl { get; set; }

        public bool logo { get; set; }

        public bool logoPicType { get; set; }

        public bool resource { get; set; }

        public bool resourceId4BI { get; set; }

        public bool score { get; set; }

        public bool source { get; set; }

        public bool statUrl { get; set; }
    }
}
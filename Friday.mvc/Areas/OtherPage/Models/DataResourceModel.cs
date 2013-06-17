using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using friday.core;
using friday.core.domain;

namespace Friday.mvc.Models
{
    public class DataResourceModel
    {
        public DataResourceModel()
        {
            DataResource = new DataResource();
 
        }

        public DataResource DataResource { get; set; }
 
    }
}
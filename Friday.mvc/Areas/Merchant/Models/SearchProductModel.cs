using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using friday.core;
using friday.core.domain;
using MvcPaging;

namespace Friday.mvc.Models
{
    public class SearchProductModel
    {
        public SearchProductModel()
        {
            int count ;
            int pageSize;
            int currentPage;
            int pageNum;
            int prodCount;
    
            IList<Food> Foods = new List<Food>();
            IList<House> Houses = new List<House>();
            IList<Commodity> Commoditys = new List<Commodity>();
        }

        public int prodCount { get; set; }

        public int count { get; set; }
        public int currentPage { get; set; }
        public int pageNum { get; set; }


        public IList<Food> Foods { get; set; }
        public IList<House> Houses { get; set; }
        public IList<Commodity> Commoditys { get; set; }
     
    }
}
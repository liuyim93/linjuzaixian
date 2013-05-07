using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using friday.core.domain;

namespace Friday.mvc.Areas.Category.Models
{
    public class CategoryModel
    {
        public CategoryModel()
        {

            IList<GlobalGoodsType> GlobalGoodsTypeTlevelZero = new List<GlobalGoodsType>();
            IList<GlobalGoodsType> GlobalGoodsTypeTlevelFirst = new List<GlobalGoodsType>();
            IList<GlobalGoodsType> GlobalGoodsTypeTlevelSecond = new List<GlobalGoodsType>();
         }
        public IList<GlobalGoodsType> GlobalGoodsTypeTlevelZero { get; set; }
        public IList<GlobalGoodsType> GlobalGoodsTypeTlevelFirst { get; set; }
        public IList<GlobalGoodsType> GlobalGoodsTypeTlevelSecond { get; set; }
             
    }
}
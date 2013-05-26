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

            IList<Shop> NationalShops = new List<Shop>();

            IList<Shop> shopModes = new List<Shop>();
            IList<Shop> orderFoodModes = new List<Shop>();


         }
        public IList<GlobalGoodsType> GlobalGoodsTypeTlevelZero { get; set; }
        public IList<GlobalGoodsType> GlobalGoodsTypeTlevelFirst { get; set; }
        public IList<GlobalGoodsType> GlobalGoodsTypeTlevelSecond { get; set; }

        public IList<Shop> NationalShops { get; set; }

        public IList<Shop> shopModes { get; set; }
        public IList<Shop> orderFoodModes { get; set; }
             
    }
}
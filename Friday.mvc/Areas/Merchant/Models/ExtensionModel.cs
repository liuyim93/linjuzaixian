using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Friday.mvc.Areas.Merchant.Models
{
    public class ExtensionModel
    {
        public BreadCrumbDO breadCrumbDO
        {
            get;
            set;
        }
        public MealResult mealResult
        {
            get;
            set;
        }
        public ShopPromotionDO shopPromotionDO
        {
            get;
            set;
        }
        public SpuMaintainerDO spuMaintainerDO
        {
            get;
            set;
        }
        public bool success
        {
            get;
            set;
        }
    }
    public class BreadCrumbDO
    {
        public List<string[]> breadCrumb
        {
            get;
            set;
        }
    }
    public class MealResult
    {

    }
    public class ShopPromotionDO
    {

    }
    public class SpuMaintainerDO
    {
        public List<Spu> providerList
        {
            get;
            set;
        }
        public List<Spu> reviewerList
        {
            get;
            set;
        }
        public List<Spu> maintainerList
        {
            get;
            set;
        }
    }
    public class Spu
    {
       public string shopUrl
       {
           get;
           set;
       }
       public string shopName
       {
           get;
           set;
       }
    }
}
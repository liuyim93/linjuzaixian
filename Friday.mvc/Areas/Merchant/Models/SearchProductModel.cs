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
            
            Merchants = new List<Merchant>();

            //IList<MerchantGoodsType> merchantGoodsTypes = new List<MerchantGoodsType>();
            IList<GlobalGoodsType> globalGoodsTypes = new List<GlobalGoodsType>();
            this.listGlobalGoodsTypes = new List<IList<GlobalGoodsType>>();
            this.headGlobalGoodsType = new List<GlobalGoodsType>();
            this.headGlobalGoodsTypeNum = new List<int>();
            this.listGlobalGoodsTypesNum = new List<IList<int>>();
            this.listBarGlobalGoodsType = new List<IList<GlobalGoodsType>>();
            this.headBarGlobalGoodsType = new List<GlobalGoodsType>();
            this.siblingSchools = new List<School>();
            this.parentSiblingSchools = new List<School>();

            //IList<Food> Foods = new List<Food>();
            //IList<House> Houses = new List<House>();
            IList<Commodity> Commoditys = new List<Commodity>();

            IList<Commodity> recommendComdties = new List<Commodity>();
        }

        public IList<Merchant> Merchants { get; set; }

        public int prodCount { get; set; }

        public int count { get; set; }
        public int currentPage { get; set; }
        public int pageNum { get; set; }

        public IList<GlobalGoodsType> globalGoodsTypes { get; set; }
        public IList<IList<GlobalGoodsType>> listGlobalGoodsTypes { get; set; }
        public IList<IList<int>> listGlobalGoodsTypesNum { get; set; }
        public IList<GlobalGoodsType> headGlobalGoodsType { get; set; }
        public IList<int> headGlobalGoodsTypeNum { get; set; }

        public IList<GlobalGoodsType> headBarGlobalGoodsType { get; set; }
        public IList<IList<GlobalGoodsType>> listBarGlobalGoodsType { get; set; }

        //public IList<Food> Foods { get; set; }
        public IList<Commodity> recommendComdties { get; set; }
        public IList<Commodity> Commoditys { get; set; }
     
        //school
        public School currentFirstSchool { get; set; }
        public School currentSecondSchool { get; set; }
        public IList<School> siblingSchools { get; set; }
        public IList<School> parentSiblingSchools { get; set; }
    }
}
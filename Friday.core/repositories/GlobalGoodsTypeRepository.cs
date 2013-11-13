using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate;
using friday.core.components;
using NHibernate.Linq;
using friday.core.domain;

namespace friday.core.repositories
{
    public class GlobalGoodsTypeRepository : Repository<GlobalGoodsType>, IGlobalGoodsTypeRepository
    {
        public IList<GlobalGoodsType> GetChildrenFromParentID(string ParentID)
        {
            if (ParentID == null || ParentID == "")
            {
                var list = (from x in this.Session.Query<GlobalGoodsType>() select x).Where(o => o.ParentID == null && o.IsDelete == false).ToList();
                return list;
            }
            else
            {
                var list = (from x in this.Session.Query<GlobalGoodsType>() select x).Where(o => o.ParentID == ParentID && o.IsDelete == false).ToList();
                return list;
            }
        }
        public IList<GlobalGoodsType> GetChildrenByFamily(string ParentID)
        {
            var list = (from x in this.Session.Query<GlobalGoodsType>() select x).Where(o => o.Family.Contains(ParentID) && o.IsDelete == false).ToList();
            return list;
        }
        public IList<GlobalGoodsType> GetFirstLevelAll()
        {
            var list = (from x in this.Session.Query<GlobalGoodsType>() select x).Where(o => o.ParentID == null && o.IsDelete == false).ToList();
            return list;
        }
        public GlobalGoodsType GetGlobalGoodsTypeByName(string Name)
        {
            var gt = (from x in this.Session.Query<GlobalGoodsType>() select x).Where(o => o.Name == Name && o.IsDelete == false).SingleOrDefault();
            return gt;
        }

        public IList<GlobalGoodsType> GetGlobalGoodsTypeByTlevel(int level)
        {
            var gt = (from x in this.Session.Query<GlobalGoodsType>() select x).Where(o => o.TLevel == level && o.IsDelete == false).OrderBy(o => o.EntityIndex).ToList();
            return gt;
        }
        public IList<GlobalGoodsType> GetGlobalGoodsTypeByTlevelAndSchool(int level, string schoolId)
        {
            IList<string> merchants = (from x in this.Session.Query<Merchant>()
                                       where x.Schools.Contains(schoolId)
                                       && x.IsDelete == false

                                       select x.Id).Distinct().ToList();

            var gt = (from x in this.Session.Query<Commodity>()
                      where merchants.Contains(x.Shop.Id)
                      && x.IsDelete == false

                      select x.GlobalGoodsType).Where(o => o.TLevel == level && o.IsDelete == false).Distinct();

            return gt.ToList<GlobalGoodsType>();
        }


        public IList<GlobalGoodsType> GetGoodsTypeByIdAndLevel(List<string> ids,int level)
        {
            var m = (from x in this.Session.Query<GlobalGoodsType>() select x).Where(o => o.TLevel == level && o.IsDelete == false && ids.Contains(o.Id)).ToList();
            return m;
        }

        public IList<GlobalGoodsType> GetByThirdGoodsTypeByMerchant(Merchant merchant,int level)
        {
            var m = (from x in this.Session.Query<Commodity>() where x.IsDelete==false select x)
                .Where(o =>o.Shop==merchant
                      &&o.IsDelete==false
                      && o.GlobalGoodsType.TLevel == level
                         ).Select(o=>o.GlobalGoodsType).Distinct().ToList();
            return m;
        }

        public IList<GlobalGoodsType> GetSimilarGoodsTypeListInThirdLevelByKeyword(string keyword)
        {
            var m = (from x in this.Session.Query<GlobalGoodsType>() select x).Where(o => o.Name.Contains(keyword) && o.IsDelete == false).ToList();
            return m;
        }
        public bool IsHaveChild(GlobalGoodsType globalGoodsType)
        {
            var isHaveChild = (from x in this.Session.Query<GlobalGoodsType>() select x).Where(o => o.ParentID == globalGoodsType.Id && o.IsDelete == false).Count() > 0 ? true : false;
            return isHaveChild;
        }
        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(GlobalGoodsType)); }
        }
        //对外获取方法
        public IList<GlobalGoodsType> Search(List<DataFilter> termList)
        {
            return SearchByGlobalGoodsType(Query, termList, true).List<GlobalGoodsType>();
        }
        public IList<GlobalGoodsType> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByGlobalGoodsType(Query, termList, true);
            //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<GlobalGoodsType>();
        }

        public IList<GlobalGoodsType> GetSelledG()
        {
            var list = (from x in this.Session.Query<CartOfCommodity>()
                        where x.IsDelete == false


                        select x.Commodity.GlobalGoodsType

                       )
           .Distinct().Take(16)
              .ToList();
            return list;
        }

    }

}

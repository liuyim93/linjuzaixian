using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using NHibernate;
using NHibernate.Criterion;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core.EnumType;
using NHibernate.Linq;
namespace friday.core.repositories
{
    public class MerchantGoodsTypeRepository : Repository<MerchantGoodsType>, friday.core.repositories.IMerchantGoodsTypeRepository
    {       

        public IList<MerchantGoodsType> GetGoodsTypeByMerchantID(string mid)
        {
            var list = (from x in this.Session.Query<MerchantGoodsType>() select x).Where(o => o.Merchant.Id== mid).ToList();
            return list;
        }
        public MerchantGoodsType GetGoodsTypeByTypeNameAndMerchantID(string mname, string mid)
        {
            var m = (from x in this.Session.Query<MerchantGoodsType>() select x).Where(o => o.Merchant.Id == mid && o.GoodsType==mname).SingleOrDefault();
            return m;
        }
        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(MerchantGoodsType)); }
        }
        //对外获取方法
        public IList<MerchantGoodsType> Search(List<DataFilter> termList)
        {
            return SearchByMerchantGoodsType(Query, termList, true).List<MerchantGoodsType>();
        }
        public IList<MerchantGoodsType> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByMerchantGoodsType(Query, termList, true);
            //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<MerchantGoodsType>();
        }

        public bool IsHaveTheSameName(string name)
        {
            var isHaveChild = (from x in this.Session.Query<MerchantGoodsType>() select x).Where(o => o.GoodsType == name).Count() > 0 ? true : false;
            return isHaveChild;
        }
    }
}

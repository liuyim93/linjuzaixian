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
namespace friday.core.repositories
{
    public class MerchantGoodsTypeRepository : Repository<MerchantGoodsType>, friday.core.repositories.IMerchantGoodsTypeRepository
    {        
        public IList<MerchantGoodsType> GetGoodsTypeByMerchantID(string mid)
        {
            var q = Session.CreateQuery(@"select mgt from MerchantGoodsType as mgt
                     where Merchant_id=:mchid")
                      .SetString("mchid", mid);
            return q.List<MerchantGoodsType>();
        }
        public MerchantGoodsType GetGoodsTypeByTypeNameAndMerchantID(string mname, string mid)
        {
            var q = Session.CreateQuery(@"select mgt from MerchantGoodsType as mgt
                     where GoodsType=:mGoodsType and Merchant_id=:mchtid")
                      .SetString("mGoodsType", mname).SetString("mchtid",mid);
            return q.UniqueResult<MerchantGoodsType>();
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

    }
}

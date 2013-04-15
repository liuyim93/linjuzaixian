using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using NHibernate;
using NHibernate.Linq;
using NHibernate.Criterion;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core.EnumType;

namespace friday.core.repositories
{
    public class PropIDRepository : Repository<PropID>, IPropIDRepository
    {

        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(PropID)); }
        }
        //对外获取方法
        public IList<PropID> Search(List<DataFilter> termList)
        {
            return SearchByPropID(Query, termList, true).List<PropID>();
        }
        public IList<PropID> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByPropID(Query, termList, true);
            //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<PropID>();
        }
        public bool IsHaveTheSameName(string name)
        {
            var isHaveChild = (from x in this.Session.Query<PropID>() select x).Where(o => o.PropIDName == name && o.IsDelete == false).Count() > 0 ? true : false;
            return isHaveChild;
        }
        public PropID getPropIDbyPropIDName(string name)
        {
            var ppd = (from x in this.Session.Query<PropID>() select x).Where(o => o.PropIDName == name && o.IsDelete == false).SingleOrDefault();
            return ppd;
        }
        public IList<PropID> GetPropIDByMerchantID(string mid)
        {
            var list = (from x in this.Session.Query<PropID>() select x).Where(o => o.Merchant.Id == mid && o.IsDelete == false).OrderByDescending(o => o.CreateTime).ToList();
            return list;
        }

    }
     
}

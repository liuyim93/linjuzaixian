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
    public class PropValueRepository : Repository<PropValue>, IPropValueRepository
    {

        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(PropValue)); }
        }
        //对外获取方法
        public IList<PropValue> Search(List<DataFilter> termList)
        {
            return SearchByPropValue(Query, termList, true).List<PropValue>();
        }
        public IList<PropValue> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByPropValue(Query, termList, true);
            //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<PropValue>();
        }

        public bool IsHaveTheSameName(string name)
        {
            var isHaveChild = (from x in this.Session.Query<PropValue>() select x).Where(o => o.PropValueName == name && o.IsDelete == false).Count() > 0 ? true : false;
            return isHaveChild;
        }
        public PropValue getPropValuebyIntID(string id)
        {
            int pid = Convert.ToInt32(id);
            var ppd = (from x in this.Session.Query<PropValue>() select x).Where(o => o.Id == pid && o.IsDelete == false).SingleOrDefault();
            return ppd;
        }

    }
     
}

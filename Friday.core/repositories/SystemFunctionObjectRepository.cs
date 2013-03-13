using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate.Linq;
using NHibernate;
using friday.core.components;

namespace friday.core.repositories
{
    public class SystemFunctionObjectRepository : Repository<SystemFunctionObject>, ISystemFunctionObjectRepository
    {
        public IList<SystemFunctionObject> GetChildrenFromParentID(string ParentID)
        {
            var list = (from x in this.Session.Query<SystemFunctionObject>() select x).Where(o => o.ParentFunctionObjectId == ParentID && o.IsDelete == false).ToList();
            return list;
        }
        public bool IsHaveChild(SystemFunctionObject systemFunctionObject)
        {
            var isHaveChild = (from x in this.Session.Query<SystemFunctionObject>() select x).Where(o => o.ParentFunctionObjectId == systemFunctionObject.Id && o.IsDelete == false).Count() > 0 ? true : false;
            return isHaveChild;
        }
        public SystemFunctionObject GetSystemFunctionObjectByName(string name)
        {
            var s = (from x in this.Session.Query<SystemFunctionObject>() select x).Where(o => o.FunctionObjectName == name && o.IsDelete == false).SingleOrDefault();
            return s;
        }
        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(SystemFunctionObject)); }
        }
        //对外获取方法
        public IList<SystemFunctionObject> Search(List<DataFilter> termList)
        {
            return SearchBySystemFunctionObject(Query, termList).List<SystemFunctionObject>();
        }
        public IList<SystemFunctionObject> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchBySystemFunctionObject(Query, termList);
            //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<SystemFunctionObject>();
        }
    }
}

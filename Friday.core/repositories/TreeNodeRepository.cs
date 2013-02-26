using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate.Criterion;

namespace friday.core.repositories
{
    public class TreeNodeRepository<T> : Repository<T>, ITreeNodeRepository<T> where T : TreeNode
    {
        public bool IsHaveChild(T model)
        {
            var cnt = Session.CreateCriteria<T>()
            .Add(Expression.Eq("ParentID", model.TreeCode))
            .SetProjection(Projections.RowCountInt64()).UniqueResult<long>();
            return cnt > 0 ? true : false;
        }

        public IList<T> GetChildrenFromParentID(string ParentID)
        {
            var list = Session.CreateCriteria<T>()
               .Add(Expression.Eq("ParentID", ParentID))
               .AddOrder(Order.Asc("ColIndex"))
               .List<T>();
            return list;
        }

        public T GetModelByTreeCode(string TreeCode)
        {
            var model = Session.CreateCriteria<T>()
               .Add(Expression.Eq("TreeCode", TreeCode))
               .Add(Expression.Eq("IsDelete", false))
               .UniqueResult<T>();
            return model;

        }

    }
}

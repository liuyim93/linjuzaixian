﻿using System;
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
    public class SystemRoleRepository : Repository<SystemRole>, ISystemRoleRepository
    {
        //public SystemRole SearchByShortName(string name)
        //{
        //    var q = Session.CreateQuery(@"select sp  from   SystemRole as  sp   where  sp.ShortName=:spshortname ")
        //              .SetString("spshortname", name).UniqueResult<SystemRole>(); ;

        //    return q;
        //}

        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(SystemRole)); }
        }
        //对外获取方法
        public IList<SystemRole> Search(List<DataFilter> termList)
        {
            return SearchBySystemRole(Query, termList, true).List<SystemRole>();
        }
        public IList<SystemRole> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchBySystemRole(Query, termList, true);
            //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<SystemRole>();
        }


    }
     
}

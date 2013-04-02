using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Linq;
using System.Text.RegularExpressions;
using NHibernate;
using NHibernate.Linq;
using NHibernate.Criterion;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core.EnumType;
using NHibernate.Linq;

namespace friday.core.repositories
{
    public class LoginUserRepository : Repository<LoginUser>, ILoginUserRepository
    {

        public LoginUser GetLoginUserByLoginName(string LoginName)
        {
            var q = (from x in this.Session.Query<LoginUser>() select x).Where(o => o.IsDelete == false && o.LoginName == LoginName).SingleOrDefault();
            return q;
        }
        public LoginUser GetLoginUserByEmail(string email)
        {
            var q = (from x in this.Session.Query<LoginUser>() select x).Where(o => o.IsDelete == false && o.SystemUser.Email == email).SingleOrDefault();
            return q;
        }
        public bool DeleteLoginUserByCreateTime(string month)
        {
            int mon=Convert.ToInt32(month); 
            DateTime  goaldate=DateTime.Now.AddMonths(-mon);
            var q = (from x in this.Session.Query<LoginUser>() select x).Where(o => o.CreateTime <= goaldate);
            
            return true;
        }
        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(LoginUser)); }
        }

        //对外获取方法
        public IList<LoginUser> Search(List<DataFilter> termList)
        {
            return SearchByLoginUser(Query, termList, true).List<LoginUser>();
        }

        public IList<LoginUser> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByLoginUser(Query, termList, true);
            //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<LoginUser>();
        }

    


    }
     
}

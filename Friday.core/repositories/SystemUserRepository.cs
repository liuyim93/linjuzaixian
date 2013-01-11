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
    public class SystemUserRepository:Repository<SystemUser>
    {

        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(SystemUser)); }
        }

        //对外获取方法
        public IList<SystemUser> Search(List<DataFilter> termList)
        {
            return SearchBy(termList).List<SystemUser>();
        }
        public IList<SystemUser> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            //total = Query.SetProjection(Projections.RowCountInt64()).UniqueResult<long>();
            ICriteria query = SearchBy(termList);
            total = query.List<SystemUser>().Count;
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<SystemUser>();
        }

        private ICriteria SearchBy(List<DataFilter> termList)
        {
            ICriteria query = Query;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {

                    if (df.type.Equals("Name"))
                    {
                        query = query.Add(Restrictions.Like("Name", "%" + df.value + "%"));
                    }
                    if (df.type.Equals("LoginName"))
                    {
                        query = query.Add(Restrictions.Eq("LoginName", df.value));
                    }

                    if (df.type.Equals("Password"))
                    {
                        query = query.Add(Restrictions.Eq("Password", df.value));
                    }

                    if (df.type.Equals("UserType"))
                    {
                        query = query.Add(Restrictions.Eq("UserType", Int32.Parse(df.value)));
                    }

                    if (df.type.Equals("Email"))
                    {
                        query = query.Add(Restrictions.Eq("Email", df.value));
                    }
                    if (df.type.Equals("Tel"))
                    {
                        query = query.Add(Restrictions.Like("Tel", "%" + df.value + "%"));
                    }
                    if (df.type.Equals("Address"))
                    {
                        query = query.Add(Restrictions.Like("Address", "%" + df.value + "%"));
                    }

                    if (df.type.Equals("Status"))
                    {
                        if (df.value.Equals("0"))
                        {
                            query = query.Add(Restrictions.IsNotNull("LoginName"));
                        }
                        if (df.value.Equals("1"))
                        {
                            query = query.Add(Restrictions.IsNull("LoginName"));
                        }
                    }




                    //时间
                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        DateTime value = DateTime.Parse(df.value);
                        if (string.IsNullOrEmpty(df.valueForCompare))
                        {
                            switch (df.comparison)
                            {
                                case "lt":
                                    query = query.Add(Restrictions.Lt("CreateTime", value));
                                    break;
                                case "gt":
                                    query = query.Add(Restrictions.Gt("CreateTime", value));
                                    break;
                                default:
                                    query = query.Add(Restrictions.Eq("CreateTime", value));
                                    break;

                            }
                        }

                        else
                        {
                            DateTime valueForCompare = DateTime.Parse(df.valueForCompare);
                            query = query.Add(Restrictions.Between("CreateTime", value, valueForCompare));
                        }
                    }

                }
            }
            return query.Add(Expression.Eq("IsDelete", false))
                 .AddOrder(NHibernate.Criterion.Order.Desc("CreateTime"));
        }

        public override SystemUser Get(string id)
        {
            try
            {
                SystemUser reslut = Session.Get<SystemUser>(id);
                if (reslut == null)
                    throw new IDErrorException("返回实体为空");
                else
                    return reslut;
            }
            catch (IDErrorException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new Exception("获取实体失败", ex);
            }
        }
    }
     
}

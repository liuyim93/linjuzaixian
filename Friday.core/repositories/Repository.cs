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
using Iesi.Collections.Generic;
//CreateAlias 返回值还是当前的Criteria，但是CreateCriteria返回的新的Criteria。
namespace friday.core.repositories
{
    public class Repository<T> : IRepository<T> where T : Entity
    {
        public Repository()
        {

        }
        protected virtual ISession Session
        {
            get { return SessionBuilder.CreateSession(); }
        }

        public virtual T Load(string id)
        {
            try
            {
                T reslut = Session.Load<T>(id);
                if (reslut == null)
                    throw new Exception("返回实体为空");
                else
                    return reslut;
            }
            catch (Exception ex)
            {
                throw new Exception("获取实体失败", ex);
            }
        }
        public virtual T Get(string id)
        {
            try
            {
                T reslut = Session.Get<T>(id);
                if (reslut == null)
                    throw new Exception("返回实体为空");
                else
                    return reslut;
            }
            catch (Exception ex)
            {
                throw new Exception("获取实体失败", ex);
            }
        }
        //2010-12-16尹福青修改将CreateTime索引去掉，优化时间
        public virtual IList<T> GetAll()
        {
            return Session.CreateCriteria<T>()
                .Add(Expression.Eq("IsDelete", false))
                // .AddOrder(Order.Asc("CreateTime"))
                .List<T>();
        }
        public virtual void DeleteAll( IList<T> list)
        {
            try
            {
                foreach (T t in list)
                {
                    Session.Delete(t);
                    Session.Flush();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("删除全部实体失败", ex);
            }
        }
        public virtual void DeleteAll(Iesi.Collections.Generic.ISet<T> list)
        {
            try
            {
                foreach (T t in list)
                {
                    Session.Delete(t);
                    Session.Flush();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("删除全部实体失败", ex);
            }
        }

        public virtual void SaveOrUpdate(T entity)
        {
            try
            {
                Session.SaveOrUpdate(entity);
                Session.Flush();
            }
            catch (Exception ex)
            {
                throw new Exception("插入实体失败", ex);
            }
        }

        public virtual void Update(T entity)
        {
            try
            {
                Session.Update(entity);
                Session.Flush();
            }
            catch (Exception ex)
            {
                throw new Exception("更新实体失败", ex);
            }
        }

        public virtual void PhysicsDelete(string id)
        {
            try
            {
                var entity = Get(id);
                Session.Delete(entity);
                Session.Flush();
            }
            catch (System.Exception ex)
            {
                throw new Exception("物理删除实体失败", ex);
            }
        }

        public virtual void Delete(string id)
        {
            try
            {
                var entity = Get(id);
                entity.IsDelete = true;
                Update(entity);
            }
            catch (System.Exception ex)
            {
                throw new Exception("删除实体失败", ex);
            }
        }
        
        private string GetComparison(string comparison)
        {
            string res = string.Empty;
            switch (comparison)
            {
                case "lt":
                    res = "<";
                    break;
                case "gt":
                    res = ">";
                    break;
                case "eq":
                    res = "=";
                    break;
            }
            return res;
        }
        public IList<T> GetPageList(int start, int limit, out long total)
        {
            var query = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                 .AddOrder(NHibernate.Criterion.Order.Desc("CreateTime"))
                 .SetFirstResult(start)
                 .SetMaxResults(limit);
            total = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false)).List<T>().Count;

            return query.List<T>();

        }


      

        public IList<T> GetPageListByProperty(int start, int limit, out long total, int year, int month, object company, object project)
        {
            if (year == 0 & month == 0 & company == null & project == null)
            {
                var query = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                      .AddOrder(NHibernate.Criterion.Order.Desc("CreateTime"))
                     .SetFirstResult(start)
                     .SetMaxResults(limit);
                var totalquery = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false));
                total = totalquery.List<T>().Count;
                return query.List<T>();
            }

            if (year != 0 & month == 0 & project == null & company == null)
            {
                var query = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                    .Add(Expression.Eq("IndustryYear", year))
                      .AddOrder(NHibernate.Criterion.Order.Desc("CreateTime"))
                     .SetFirstResult(start)
                     .SetMaxResults(limit);
                var totalquery = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                    .Add(Expression.Eq("IndustryYear", year));
                total = totalquery.List<T>().Count;
                return query.List<T>();
            }
            if (year == 0 & month != 0 & project == null & company == null)
            {
                var query = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                     .Add(Expression.Eq("Month", month))
                      .AddOrder(NHibernate.Criterion.Order.Desc("CreateTime"))
                     .SetFirstResult(start)
                     .SetMaxResults(limit);
                var totalquery = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                     .Add(Expression.Eq("Month", month));
                total = totalquery.List<T>().Count;
                return query.List<T>();
            }
            if (year == 0 & month == 0 & project != null & company == null)
            {
                var query = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                    .Add(Expression.Eq("Project", project))
                      .AddOrder(NHibernate.Criterion.Order.Desc("CreateTime"))
                     .SetFirstResult(start)
                     .SetMaxResults(limit);
                var totalquery = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                    .Add(Expression.Eq("Project", project));
                total = totalquery.List<T>().Count;
                return query.List<T>();
            }
            if (year == 0 & month == 0 & project == null & company != null)
            {
                var query = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                     .Add(Expression.Eq("CompanyTele", company))
                      .AddOrder(NHibernate.Criterion.Order.Desc("CreateTime"))
                     .SetFirstResult(start)
                     .SetMaxResults(limit);
                var totalquery = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                     .Add(Expression.Eq("CompanyTele", company));
                total = totalquery.List<T>().Count;
                return query.List<T>();
            }
            if (year != 0 & month != 0 & company == null & project == null)
            {
                var query = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                     .Add(Expression.Eq("IndustryYear", year))
                     .Add(Expression.Eq("Month", month))
                      .AddOrder(NHibernate.Criterion.Order.Desc("CreateTime"))
                     .SetFirstResult(start)
                     .SetMaxResults(limit);
                var totalquery = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                    .Add(Expression.Eq("IndustryYear", year))
                    .Add(Expression.Eq("Month", month));
                total = totalquery.List<T>().Count;
                return query.List<T>();
            }

            if (year != 0 & month == 0 & company != null & project == null)
            {
                var query = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                     .Add(Expression.Eq("IndustryYear", year))
                     .Add(Expression.Eq("CompanyTele", company))
                      .AddOrder(NHibernate.Criterion.Order.Desc("CreateTime"))
                     .SetFirstResult(start)
                     .SetMaxResults(limit);
                var totalquery = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                    .Add(Expression.Eq("IndustryYear", year))
                    .Add(Expression.Eq("CompanyTele", company));
                total = totalquery.List<T>().Count;
                return query.List<T>();
            }

            if (year != 0 & month == 0 & company == null & project != null)
            {
                var query = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                     .Add(Expression.Eq("IndustryYear", year))
                     .Add(Expression.Eq("Project", project))
                      .AddOrder(NHibernate.Criterion.Order.Desc("CreateTime"))
                     .SetFirstResult(start)
                     .SetMaxResults(limit);
                var totalquery = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                    .Add(Expression.Eq("IndustryYear", year))
                    .Add(Expression.Eq("Project", project));
                total = totalquery.List<T>().Count;
                return query.List<T>();
            }

            if (year == 0 & month != 0 & company != null & project == null)
            {
                var query = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                     .Add(Expression.Eq("Month", month))
                     .Add(Expression.Eq("CompanyTele", company))
                      .AddOrder(NHibernate.Criterion.Order.Desc("CreateTime"))
                     .SetFirstResult(start)
                     .SetMaxResults(limit);
                var totalquery = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                    .Add(Expression.Eq("Month", month))
                    .Add(Expression.Eq("CompanyTele", company));
                total = totalquery.List<T>().Count;
                return query.List<T>();
            }

            if (year == 0 & month != 0 & company == null & project != null)
            {
                var query = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                     .Add(Expression.Eq("Month", month))
                     .Add(Expression.Eq("Project", project))
                      .AddOrder(NHibernate.Criterion.Order.Desc("CreateTime"))
                     .SetFirstResult(start)
                     .SetMaxResults(limit);
                var totalquery = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                    .Add(Expression.Eq("Month", month))
                    .Add(Expression.Eq("Project", project));
                total = totalquery.List<T>().Count;
                return query.List<T>();
            }
            if (year == 0 & month == 0 & company != null & project != null)
            {
                var query = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                     .Add(Expression.Eq("CompanyTele", company))
                     .Add(Expression.Eq("Project", project))
                      .AddOrder(NHibernate.Criterion.Order.Desc("CreateTime"))
                     .SetFirstResult(start)
                     .SetMaxResults(limit);
                var totalquery = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                    .Add(Expression.Eq("CompanyTele", company))
                    .Add(Expression.Eq("Project", project));
                total = totalquery.List<T>().Count;
                return query.List<T>();
            }
            if (year == 0 & month != 0 & company != null & project != null)
            {
                var query = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                     .Add(Expression.Eq("Month", month))
                     .Add(Expression.Eq("CompanyTele", company))
                     .Add(Expression.Eq("Project", project))
                      .AddOrder(NHibernate.Criterion.Order.Desc("CreateTime"))
                     .SetFirstResult(start)
                     .SetMaxResults(limit);
                var totalquery = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                    .Add(Expression.Eq("Month", month))
                    .Add(Expression.Eq("CompanyTele", company))
                    .Add(Expression.Eq("Project", project));
                total = totalquery.List<T>().Count;
                return query.List<T>();
            }
            if (year != 0 & month == 0 & company != null & project != null)
            {
                var query = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                     .Add(Expression.Eq("IndustryYear", year))
                     .Add(Expression.Eq("CompanyTele", company))
                     .Add(Expression.Eq("Project", project))
                      .AddOrder(NHibernate.Criterion.Order.Desc("CreateTime"))
                     .SetFirstResult(start)
                     .SetMaxResults(limit);
                var totalquery = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                    .Add(Expression.Eq("IndustryYear", year))
                    .Add(Expression.Eq("CompanyTele", company))
                    .Add(Expression.Eq("Project", project));
                total = totalquery.List<T>().Count;
                return query.List<T>();
            }
            if (year != 0 & month != 0 & company == null & project != null)
            {
                var query = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                     .Add(Expression.Eq("IndustryYear", year))
                     .Add(Expression.Eq("Month", month))
                     .Add(Expression.Eq("Project", project))
                      .AddOrder(NHibernate.Criterion.Order.Desc("CreateTime"))
                     .SetFirstResult(start)
                     .SetMaxResults(limit);
                var totalquery = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                    .Add(Expression.Eq("IndustryYear", year))
                    .Add(Expression.Eq("Month", month))
                    .Add(Expression.Eq("Project", project));
                total = totalquery.List<T>().Count;
                return query.List<T>();
            }
            if (year != 0 & month != 0 & company != null & project == null)
            {
                var query = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                     .Add(Expression.Eq("IndustryYear", year))
                     .Add(Expression.Eq("Month", month))
                     .Add(Expression.Eq("CompanyTele", company))
                      .AddOrder(NHibernate.Criterion.Order.Desc("CreateTime"))
                     .SetFirstResult(start)
                     .SetMaxResults(limit);
                var totalquery = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                    .Add(Expression.Eq("IndustryYear", year))
                    .Add(Expression.Eq("Month", month))
                    .Add(Expression.Eq("CompanyTele", company));
                total = totalquery.List<T>().Count;
                return query.List<T>();
            }
            else
            {
                var query = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                     .Add(Expression.Eq("IndustryYear", year))
                     .Add(Expression.Eq("Month", month))
                     .Add(Expression.Eq("CompanyTele", company))
                     .Add(Expression.Eq("Project", project))
                     .AddOrder(NHibernate.Criterion.Order.Desc("CreateTime"))
                     .SetFirstResult(start)
                     .SetMaxResults(limit);
                var totalquery = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false))
                     .Add(Expression.Eq("IndustryYear", year))
                     .Add(Expression.Eq("Month", month))
                     .Add(Expression.Eq("CompanyTele", company))
                     .Add(Expression.Eq("Project", project));
                total = totalquery.List<T>().Count;
                return query.List<T>();
            }
        }
    }
}

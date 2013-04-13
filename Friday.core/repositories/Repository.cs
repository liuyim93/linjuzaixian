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
    public class Repository<T> : IRepository<T> where T : BaseObject
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
                 .AddOrder(Order.Asc("CreateTime"))
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
            total = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false)).SetProjection(Projections.RowCountInt64()).UniqueResult<long>();

            return query.List<T>();

        }
        protected ICriteria SearchByLoginUser(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByLoginUser(query, termList);
        }
        protected ICriteria SearchByLoginUser(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByLoginUser(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByLoginUser(ICriteria query, List<DataFilter> termList,ref int deepIndex,ref string parentSearch)
        {
            string notself = null;
            string oldParentSearch = parentSearch;
            string ailisstring="loginUser";

            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "loginUser.";
                if (deepIndex == 1)
                {
                    parentSearch = "LoginUser";
                }
                else
                {
                    parentSearch = parentSearch + ".LoginUser";
                }
                alias = parentSearch;
                query.CreateAlias(alias, ailisstring);
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("LoginUser"))
                    {
                        query.Add(Expression.Eq(notself + "Id", df.value));
                        continue;
                    }
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }

                    if (df.type.Equals("LoginUserOfMerchant")) 
                    {
                        //根据LoginUserOfMerchant的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByLoginUserOfMerchant(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }
                    if (df.type.Equals("SystemUser"))
                    {                       
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchBySystemUser(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }
                    if (df.type.Equals("LoginName"))
                    {
                        query.Add(Expression.Like(notself + "LoginName", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("IsAdmin"))
                    {
                        query.Add(Expression.Eq(notself + "IsAdmin", (df.value=="是")?true:false));
                        continue;
                    }

                    //if (df.type.Equals("UserType"))
                    //{
                    //    try
                    //    {
                    //        UserTypeEnum Type = (UserTypeEnum)Enum.Parse(typeof(UserTypeEnum), df.value, true);
                    //        query.Add(Restrictions.Eq(notself + "UserType", Type));
                    //        continue;
                    //    }
                    //    catch (Exception ex)
                    //    {
                    //    }
                    //}
                 
                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }

        protected ICriteria SearchByLoginUserOfMerchant(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByLoginUserOfMerchant(query, termList);
        }
        protected ICriteria SearchByLoginUserOfMerchant(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByLoginUserOfMerchant(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByLoginUserOfMerchant(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;
            string oldParentSearch = parentSearch;

            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "loginUserOfMerchant.";
                if (deepIndex == 1)
                {
                    parentSearch = "LoginUserOfMerchants";   //LoginUser 的一个属性，LoginUser.LoginUserOfMerchants  HasMany
                }
                else
                {
                    parentSearch = parentSearch + ".LoginUserOfMerchants";  //Restaurant 的一个属性  Restaurant.LoginUserOfMerchants  HasMany
                }
                alias = parentSearch;
                query.CreateAlias(alias, "loginUserOfMerchant");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }

                    if (df.type.Equals("Merchant"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByMerchant(query, df.field,ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }

                    if (df.type.Equals("LoginUser"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByLoginUser(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }
        protected ICriteria SearchBySystemFunctionObject(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchBySystemFunctionObject(query, termList);
        }
        protected ICriteria SearchBySystemFunctionObject(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchBySystemFunctionObject(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchBySystemFunctionObject(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "systemFunctionObject.";
                if (deepIndex == 1)
                {
                    parentSearch = "SystemFunctionObject";
                }
                else
                {
                    parentSearch = parentSearch + ".SystemFunctionObject";

                }
                alias = parentSearch;
                query.CreateAlias(alias, "systemFunctionObject");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {

                    if (df.type.Equals("FunctionObjectName"))
                    {
                        query.Add(Restrictions.Eq(notself + "FunctionObjectName", df.value));                    
                        continue;
                    }


                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }
        protected ICriteria SearchByLog(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByLog(query, termList);
        }
        protected ICriteria SearchByLog(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByLog(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByLog(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "log.";
                if (deepIndex == 1)
                {
                    parentSearch = "Log";
                }
                else
                {                   
                    parentSearch = parentSearch + ".Log";

                }
                alias = parentSearch;
                query.CreateAlias(alias, "log");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                 
                   
                    if (df.type.Equals("Title"))
                    {
                        query.Add(Restrictions.Like(notself + "Title", df.value, MatchMode.Anywhere));
                        continue;
                    }


                    if (df.type.Equals("CategoryLog"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByCategoryLog(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }

                    if (df.type.Equals("Timestamp"))
                    {
                        SearchByTimestamp(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }

        protected ICriteria SearchByCategoryLog(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByCategoryLog(query, termList);
        }
        protected ICriteria SearchByCategoryLog(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByCategoryLog(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByCategoryLog(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "categoryLog.";
                if (deepIndex == 1)
                {
                    parentSearch = "CategoryLogs";
                }
                else
                {
                    parentSearch = parentSearch + ".CategoryLogs";

                }
                alias = parentSearch;
                query.CreateAlias(alias, "categoryLog");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {

                    if (df.type.Equals("Category"))
                    {                       
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByCategory(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }
                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }
        protected ICriteria SearchByCategory(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByCategory(query, termList);
        }
        protected ICriteria SearchByCategory(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByCategory(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByCategory(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "category.";
                if (deepIndex == 1)
                {
                    parentSearch = "Category";
                }
                else
                {
                    parentSearch = parentSearch + ".Category";

                }
                alias = parentSearch;
                query.CreateAlias(alias, "category");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {

                    if (df.type.Equals("CategoryID"))
                    {
                        query.Add(Restrictions.Eq(notself + "CategoryID",Convert.ToInt32(df.value)));
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }
        protected ICriteria SearchBySystemUser(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchBySystemUser(query, termList);
        }
        protected ICriteria SearchBySystemUser(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchBySystemUser(query, termList, ref deepIndex,ref parentSearch);
        }
        protected ICriteria SearchBySystemUser(ICriteria query, List<DataFilter> termList, ref int deepIndex,ref string parentSearch)
        {
            string notself = null;
            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "systemUser.";
                if (deepIndex == 1)
                {
                    parentSearch = "SystemUser";
                }
                else
                {
                    parentSearch = parentSearch + ".SystemUser";
                    
                }
                alias = parentSearch;
                query.CreateAlias(alias, "systemUser");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }

                    if (df.type.Equals("IsAnonymous"))
                    {
                        if (df.value == "0")
                        {
                            query.Add(Expression.Eq(notself + "IsAnonymous", false));
                        }
                        else 
                        {
                            query.Add(Expression.Eq(notself + "IsAnonymous", true));
                        }
                        continue;
                    }

                    if (df.type.Equals("LoginUser"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByLoginUser(query, df.field, ref deepIndex,ref parentSearch);
                        }
                        continue;
                    }

                    if (df.type.Equals("Name"))
                    {
                        query.Add(Restrictions.Like(notself + "Name", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("Tel"))
                    {
                        query.Add(Restrictions.Like(notself + "Tel", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("Email"))
                    {
                        query.Add(Restrictions.Like(notself + "Email", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }
        protected ICriteria SearchByMerchantGoodsType(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByMerchantGoodsType(query, termList);
        }
        protected ICriteria SearchByMerchantGoodsType(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByMerchantGoodsType(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByMerchantGoodsType(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "merchantGoodsType.";
                if (deepIndex == 1)
                {
                    parentSearch = "MerchantGoodsType";
                }
                else
                {
                    parentSearch = parentSearch + ".MerchantGoodsType";
                }
                alias = parentSearch;
                query.CreateAlias(alias, "merchantGoodsType");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }
                    if (df.type.Equals("GoodsType"))
                    {
                        query.Add(Expression.Like(notself + "GoodsType",df.value,MatchMode.Anywhere));
                        continue;
                    }
                    if (df.type.Equals("Merchant"))
                    {

                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByMerchant(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }
                    //if (df.type.Equals("Restaurant"))
                    //{

                    //    if (df.field != null && df.field.Count != 0)
                    //    {
                    //        SearchByRestaurant(query, df.field, ref deepIndex, ref parentSearch);
                    //    }
                    //    continue;
                    //}
                    //if (df.type.Equals("Rent"))
                    //{

                    //    if (df.field != null && df.field.Count != 0)
                    //    {
                    //        SearchByRent(query, df.field, ref deepIndex, ref parentSearch);
                    //    }
                    //    continue;
                    //}
                    //if (df.type.Equals("Shop"))
                    //{

                    //    if (df.field != null && df.field.Count != 0)
                    //    {
                    //        SearchByShop(query, df.field, ref deepIndex, ref parentSearch);
                    //    }
                    //    continue;
                    //}

                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }

        //protected ICriteria SearchByOrderOfFood(ICriteria query, List<DataFilter> termList, bool isSelf)
        //{
        //    IMyFoodOrderRepository iMyFoodOrderRepository = UnityHelper.UnityToT<IMyFoodOrderRepository>();
        //    string notself = null;
        //    if (!isSelf)
        //    {
        //        query.CreateAlias("OrderOfFood", "orderOfFood");
        //        notself = "orderOfFood.";
        //    }
        //    if (termList.Count != 0)
        //    {

        //        foreach (DataFilter df in termList)
        //        {
        //            if (df.type.Equals("IsDelete"))
        //            {
        //                query.Add(Expression.Eq(notself + "IsDelete", false));
        //                continue;
        //            }

        //            if (df.type.Equals("MyFoodOrder"))
        //            {
        //                if (!string.IsNullOrEmpty(df.value))
        //                {
        //                    query.Add(Restrictions.Eq(notself + "MyFoodOrder", iMyFoodOrderRepository.Get(df.value)));
        //                }

        //                if (df.field != null && df.field.Count != 0)
        //                {
        //                    SearchByMyFoodOrder(query, df.field, false);
        //                }
        //                continue;
        //            }

        //            if (df.type.Equals("Order"))
        //            {
        //                if (df.field != null && df.field.Count != 0)
        //                {
        //                    //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
        //                    foreach (DataFilter indf in df.field)
        //                    {
        //                        if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
        //                        {
        //                            query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
        //                        }
        //                        else
        //                        {
        //                            query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
        //                        }
        //                        continue;
        //                    }
        //                }
        //            }

        //            //时间
        //            if (df.type.Equals("CreateTime"))
        //            {
        //                SearchByCreateTime(query, df, notself);
        //                continue;
        //            }

        //        }
        //    }
        //    return query;
        //}
        protected ICriteria SearchByOrderOfFood(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByOrderOfFood(query, termList);
        }
        protected ICriteria SearchByOrderOfFood(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByOrderOfFood(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByOrderOfFood(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "orderOfFood.";
                if (deepIndex == 1)
                {
                    parentSearch = "OrderOfFood";

                }
                else
                {
                    parentSearch = parentSearch + ".OrderOfFood";

                }
                alias = parentSearch;
                query.CreateAlias(alias, "orderOfFood");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }
                    if (df.type.Equals("MyFoodOrder"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByMyFoodOrder(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }


                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }
        protected ICriteria SearchByOrderOfCommodity(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            IMyCommodityOrderRepository iMyCommodityOrderRepository = UnityHelper.UnityToT<IMyCommodityOrderRepository>();
            string notself = null;
            if (!isSelf)
            {
                query.CreateAlias("OrderOfCommodity", "orderOfCommodity");
                notself = "orderOfCommodity.";
            }
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }

                    if (df.type.Equals("MyCommodityOrder"))
                    {
                        if (!string.IsNullOrEmpty(df.value))
                        {
                            query.Add(Restrictions.Eq(notself + "MyCommodityOrder", iMyCommodityOrderRepository.Get(df.value)));
                        }

                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByMyFoodOrder(query, df.field, false);
                        }
                        continue;
                    }

                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            return query;
        }

        protected ICriteria SearchByOrderOfHouse(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            IMyHouseOrderRepository iMyHouseOrderRepository = UnityHelper.UnityToT<IMyHouseOrderRepository>();
            string notself = null;
            if (!isSelf)
            {
                query.CreateAlias("OrderOfHouse", "orderOfHouse");
                notself = "orderOfHouse.";
            }
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }

                    if (df.type.Equals("MyHouseOrder"))
                    {
                        if (!string.IsNullOrEmpty(df.value))
                        {
                            query.Add(Restrictions.Eq(notself + "MyHouseOrder", iMyHouseOrderRepository.Get(df.value)));
                        }

                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByMyHouseOrder(query, df.field, false);
                        }
                        continue;
                    }

                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            return query;
        }

        protected ICriteria SearchByValuingOfMyCommodityOrder(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByValuingOfMyCommodityOrder(query, termList);
        }
        protected ICriteria SearchByValuingOfMyCommodityOrder(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByValuingOfMyCommodityOrder(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByValuingOfMyCommodityOrder(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "valuingOfMyCommodityOrder.";
                if (deepIndex == 1)
                {
                    parentSearch = "ValuingOfMyCommodityOrder";
                }
                else
                {
                    parentSearch = parentSearch + ".ValuingOfMyCommodityOrder";
                }
                alias = parentSearch;
                query.CreateAlias(alias, "valuingOfMyCommodityOrder");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }


                    if (df.type.Equals("ValuingOfMyCommodityOrder"))
                    {
                        query.Add(Restrictions.Eq(notself + "Id", df.value));
                        continue;
                    }


                    if (df.type.Equals("LoginUser"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByLoginUser(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }

                    if (df.type.Equals("Merchant"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByMerchant(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }

                    if (df.type.Equals("MyCommodityOrder"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByMyCommodityOrder(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }

                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }

        protected ICriteria SearchByValuingOfMyFoodOrder(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByValuingOfMyFoodOrder(query, termList);
        }
        protected ICriteria SearchByValuingOfMyFoodOrder(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByValuingOfMyFoodOrder(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByValuingOfMyFoodOrder(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "valuingOfMyFoodOrder.";
                if (deepIndex == 1)
                {
                    parentSearch = "ValuingOfMyFoodOrder";
                }
                else
                {
                    parentSearch = parentSearch + ".ValuingOfMyFoodOrder";
                }
                alias = parentSearch;
                query.CreateAlias(alias, "valuingOfMyFoodOrder");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }


                    if (df.type.Equals("ValuingOfMyFoodOrder"))
                    {
                        query.Add(Restrictions.Eq(notself + "Id", df.value));
                        continue;
                    }


                    if (df.type.Equals("LoginUser"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByLoginUser(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }

                    if (df.type.Equals("Merchant"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByMerchant(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }

                    if (df.type.Equals("MyFoodOrder"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByMyFoodOrder(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }

                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }

        protected ICriteria SearchByValuingOfMyHouseOrder(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByValuingOfMyHouseOrder(query, termList);
        }
        protected ICriteria SearchByValuingOfMyHouseOrder(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByValuingOfMyHouseOrder(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByValuingOfMyHouseOrder(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "valuingOfMyHouseOrder.";
                if (deepIndex == 1)
                {
                    parentSearch = "ValuingOfMyHouseOrder";
                }
                else
                {
                    parentSearch = parentSearch + ".ValuingOfMyHouseOrder";
                }
                alias = parentSearch;
                query.CreateAlias(alias, "valuingOfMyHouseOrder");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }


                    if (df.type.Equals("ValuingOfMyHouseOrder"))
                    {
                        query.Add(Restrictions.Eq(notself + "Id", df.value));
                        continue;
                    }


                    if (df.type.Equals("LoginUser"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByLoginUser(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }

                    if (df.type.Equals("Merchant"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByMerchant(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }

                    if (df.type.Equals("MyHouseOrder"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByMyHouseOrder(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }

                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }

        protected ICriteria SearchByScoreOfItemInCommodityOrder(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByScoreOfItemInCommodityOrder(query, termList);
        }
        protected ICriteria SearchByScoreOfItemInCommodityOrder(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByScoreOfItemInCommodityOrder(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByScoreOfItemInCommodityOrder(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "scoreOfItemInCommodityOrder.";
                if (deepIndex == 1)
                {
                    parentSearch = "ScoreOfItemInCommodityOrder";
                }
                else
                {
                    parentSearch = parentSearch + ".ScoreOfItemInCommodityOrder";
                }
                alias = parentSearch;
                query.CreateAlias(alias, "scoreOfItemInCommodityOrder");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }

                    if (df.type.Equals("ValuingOfMyCommodityOrder"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByValuingOfMyCommodityOrder(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }


                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }

        protected ICriteria SearchByScoreOfItemInFoodOrder(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByScoreOfItemInFoodOrder(query, termList);
        }
        protected ICriteria SearchByScoreOfItemInFoodOrder(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByScoreOfItemInFoodOrder(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByScoreOfItemInFoodOrder(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "scoreOfItemInFoodOrder.";
                if (deepIndex == 1)
                {
                    parentSearch = "ScoreOfItemInFoodOrder";
                }
                else
                {
                    parentSearch = parentSearch + ".ScoreOfItemInFoodOrder";
                }
                alias = parentSearch;
                query.CreateAlias(alias, "scoreOfItemInFoodOrder");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }

                    if (df.type.Equals("ValuingOfMyFoodOrder"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByValuingOfMyFoodOrder(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }


                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }

        protected ICriteria SearchByScoreOfItemInHouseOrder(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByScoreOfItemInHouseOrder(query, termList);
        }
        protected ICriteria SearchByScoreOfItemInHouseOrder(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByScoreOfItemInHouseOrder(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByScoreOfItemInHouseOrder(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "scoreOfItemInHouseOrder.";
                if (deepIndex == 1)
                {
                    parentSearch = "ScoreOfItemInHouseOrder";
                }
                else
                {
                    parentSearch = parentSearch + ".ScoreOfItemInHouseOrder";
                }
                alias = parentSearch;
                query.CreateAlias(alias, "scoreOfItemInHouseOrder");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }

                    if (df.type.Equals("ValuingOfMyHouseOrder"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByValuingOfMyHouseOrder(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }


                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }


        protected ICriteria SearchByValuingComments(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByValuingComments(query, termList);
        }
        protected ICriteria SearchByValuingComments(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByValuingComments(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByValuingComments(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "valuingComments.";
                if (deepIndex == 1)
                {
                    parentSearch = "ValuingComments";
                }
                else
                {
                    parentSearch = parentSearch + ".ValuingComments";
                }
                alias = parentSearch;
                query.CreateAlias(alias, "valuingComments");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }

                    if (df.type.Equals("Valuing"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByValuing(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }


                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }

        protected ICriteria SearchByValuing(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "valuing.";
                if (deepIndex == 1)
                {
                    parentSearch = "Valuing";
                }
                else
                {
                    parentSearch = parentSearch + ".Valuing";
                }
                alias = parentSearch;
                query.CreateAlias(alias, "valuing");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }


                    if (df.type.Equals("Valuing"))
                    {
                        query.Add(Restrictions.Eq(notself + "Id", df.value));
                        continue;
                    }


                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }

        protected ICriteria SearchByMyFoodOrder(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByMyFoodOrder(query, termList);
        }
        protected ICriteria SearchByMyFoodOrder(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByMyFoodOrder(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByMyFoodOrder(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "myFoodOrder.";
                if (deepIndex == 1)
                {
                    parentSearch = "MyFoodOrder";
                }
                else
                {
                    parentSearch = parentSearch + ".MyFoodOrder";
                }
                alias = parentSearch;
                query.CreateAlias(alias, "myFoodOrder");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }

                    if (df.type.Equals("OrderNumber"))
                    {
                        query.Add(Expression.Like(notself + "OrderNumber", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("Linkman"))
                    {
                        query.Add(Expression.Like(notself + "Linkman", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("OrderStatus"))
                    {
                        try
                        {
                            MyOrderStatusEnum Type = (MyOrderStatusEnum)Enum.Parse(typeof(MyOrderStatusEnum), df.value, true);
                            query.Add(Restrictions.Eq(notself + "OrderStatus", Type));
                            continue;
                        }
                        catch (Exception ex)
                        {
                        }

                    }

                    if (df.type.Equals("SystemUser"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchBySystemUser(query, df.field,ref deepIndex,ref parentSearch);
                        }
                        continue;
                    }

                    if (df.type.Equals("Restaurant"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByRestaurant(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }

                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }

        protected ICriteria SearchByMyHouseOrder(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByMyHouseOrder(query, termList);
        }
        protected ICriteria SearchByMyHouseOrder(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByMyHouseOrder(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByMyHouseOrder(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "myHouseOrder.";
                if (deepIndex == 1)
                {
                    parentSearch = "MyHouseOrder";
                }
                else
                {
                    parentSearch = parentSearch + ".MyHouseOrder";
                }
                alias = parentSearch;
                query.CreateAlias(alias, "myHouseOrder");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }

                    if (df.type.Equals("OrderNumber"))
                    {
                        query.Add(Expression.Like(notself + "OrderNumber", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("OrderStatus"))
                    {
                        try
                        {
                            MyOrderStatusEnum Type = (MyOrderStatusEnum)Enum.Parse(typeof(MyOrderStatusEnum), df.value, true);
                            query.Add(Restrictions.Eq(notself + "OrderStatus", Type));
                            continue;
                        }
                        catch (Exception ex)
                        {
                        }

                    }

                    if (df.type.Equals("SystemUser"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchBySystemUser(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }

                    if (df.type.Equals("Rent"))
                    {
                     
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByRent(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }

                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }

        protected ICriteria SearchByMyCommodityOrder(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByMyCommodityOrder(query, termList);
        }
        protected ICriteria SearchByMyCommodityOrder(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByMyCommodityOrder(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByMyCommodityOrder(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "myCommodityOrder.";
                if (deepIndex == 1)
                {
                    parentSearch = "MyCommodityOrder";
                }
                else
                {
                    parentSearch = parentSearch + ".MyCommodityOrder";
                }
                alias = parentSearch;
                query.CreateAlias(alias, "myCommodityOrder");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }

                    if (df.type.Equals("MyCommodityOrder"))
                    {
                        query.Add(Restrictions.Eq(notself + "Id", df.value));
                        continue;
                    }


                    if (df.type.Equals("OrderNumber"))
                    {
                        query.Add(Expression.Like(notself + "OrderNumber", df.value, MatchMode.Anywhere));
                        continue;
                    }
                    if (df.type.Equals("Linkman"))
                    {
                        query.Add(Expression.Like(notself + "Linkman", df.value, MatchMode.Anywhere));
                        continue;
                    }
                    if (df.type.Equals("OrderStatus"))
                    {
                        try
                        {
                            MyOrderStatusEnum Type = (MyOrderStatusEnum)Enum.Parse(typeof(MyOrderStatusEnum), df.value, true);
                            query.Add(Restrictions.Eq(notself + "OrderStatus", Type));
                            continue;
                        }
                        catch (Exception ex)
                        {
                        }

                    }

                    if (df.type.Equals("SystemUser"))
                    {
                        //根据SystemUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchBySystemUser(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }

                    if (df.type.Equals("Shop"))
                    {
                        //根据Shop的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByShop(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }

                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }

        protected ICriteria SearchByMerchantCategory(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            string notself = null;
            if (!isSelf)
            {
                query.CreateAlias("MerchantCategory", "merchantCategory");
                notself = "merchantCategory.";
            }
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }

                    if (df.type.Equals("MerchantCategoryName"))
                    {
                        query.Add(Restrictions.Like(notself + "MerchantCategoryName", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("MerchantType"))
                    {
                        try
                        {
                            MerchantTypeEnum Type = (MerchantTypeEnum)Enum.Parse(typeof(MerchantTypeEnum), df.value, true);
                            query.Add(Restrictions.Eq(notself + "MerchantType", Type));
                            continue;
                        }
                        catch (Exception ex)
                        {
                        }

                    }
                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            return query;
        }

        protected ICriteria SearchByMerchant(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByMerchant(query, termList);
        }
        protected ICriteria SearchByMerchant(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByMerchant(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByMerchant(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;
            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "merchant.";
                if (deepIndex == 1)
                {
                    parentSearch = "Merchant";
                }
                else
                {
                    parentSearch = parentSearch + ".Merchant";

                }
                alias = parentSearch;
                query.CreateAlias(alias, "merchant");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }

                    if (df.type.Equals("Merchant"))
                    {
                        query.Add(Restrictions.Eq(notself + "Id", df.value));
                        continue;
                    }

                    if (df.type.Equals("Name"))
                    {
                        query.Add(Restrictions.Like(notself + "Name", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("Owener"))
                    {
                        query.Add(Restrictions.Like(notself + "Owener", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("MerchantCategory"))
                    {
                        SearchByMerchantCategory(query, df.field, false);
                    }
                    if (df.type.Equals("MerchantType"))
                    {
                        try
                        {
                            MerchantTypeEnum Type = (MerchantTypeEnum)Enum.Parse(typeof(MerchantTypeEnum), df.value, true);
                            query.Add(Restrictions.Eq(notself + "MerchantType", Type));
                            continue;
                        }
                        catch (Exception ex)
                        {
                        }

                    }
                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }

        protected ICriteria SearchByGlobalGoodsType(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            string notself = null;
            if (!isSelf)
            {
                query.CreateAlias("GlobalGoodsType", "globalGoodsType");
                notself = "globalGoodsType.";
            }
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }

                    if (df.type.Equals("GoodsType"))
                    {
                        query.Add(Restrictions.Like(notself + "GoodsType", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("MerchantType"))
                    {
                        try
                        {
                            MerchantTypeEnum Type = (MerchantTypeEnum)Enum.Parse(typeof(MerchantTypeEnum), df.value, true);
                            query.Add(Restrictions.Eq(notself + "MerchantType", Type));
                            continue;
                        }
                        catch (Exception ex)
                        {
                        }

                    }
                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            return query;
        }
        protected ICriteria SearchByRestaurant(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByRestaurant(query, termList);
        }
        protected ICriteria SearchByRestaurant(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByRestaurant(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByRestaurant(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "restaurant.";
                if (deepIndex == 1)
                {
                    parentSearch = "Restaurant";//(1)对于查询MyFoodOrder中的商铺名来说，此处应该为"Restaurant"：Map映射

                    //foreach (var df in termList)
                    //{
                    //    if (df.type.Equals("MerchantRestaurant"))  //(2)对于加载RestaurantList中的自定义商品类型列表来说，此处应该为Merchant：Map映射
                    //    {
                    //        parentSearch = "Merchant";
                    //        df.type = "Restaurant";
                    //    }
                    //}   
                }
                else
                {
                    parentSearch = parentSearch + ".Restaurant";
                   
                }
                alias = parentSearch;
                query.CreateAlias(alias, "restaurant");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }
                    if (df.type.Equals("Restaurant"))
                    {
                        query.Add(Restrictions.Eq(notself + "Id", df.value));
                        continue;
                    }
                    if (df.type.Equals("Name"))
                    {
                        query.Add(Restrictions.Like(notself + "Name", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("Owener"))
                    {
                        query.Add(Restrictions.Like(notself + "Owener", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("Type"))
                    {
                        try
                        {
                            ShopTypeEnum Type = (ShopTypeEnum)Enum.Parse(typeof(ShopTypeEnum), df.value, true);
                            query.Add(Restrictions.Eq(notself + "ShopType", Type));
                            continue;
                        }
                        catch (Exception ex)
                        {
                        }

                    }
                    if (df.type.Equals("Tel"))
                    {
                        query.Add(Restrictions.Like(notself + "Tel", df.value, MatchMode.Anywhere));
                        continue;
                    }                
                   
                    if (df.type.Equals("ShortName"))
                    {
                        query.Add(Restrictions.Like(notself + "ShortName", df.value, MatchMode.Anywhere));
                        continue;
                    }
                    if (df.type.Equals("Address"))
                    {
                        query.Add(Restrictions.Like(notself + "Address", df.value, MatchMode.Anywhere));
                        continue;
                    }
                    

                    if (df.type.Equals("ShopStatus"))
                    {
                        ShopStatusEnum ShopStatus = (ShopStatusEnum)Enum.Parse(typeof(ShopStatusEnum), df.value, true);
                        query.Add(Restrictions.Eq(notself + "ShopStatus", ShopStatus));
                        continue;
                    }

                    if (df.type.Equals("LoginUserOfMechant"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByLoginUserOfMerchant(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }


                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }
        protected ICriteria SearchByShop(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByShop(query, termList);
        }
        protected ICriteria SearchByShop(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByShop(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByShop(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;
       
            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "shop.";
                if (deepIndex == 1)
                {
                    parentSearch = "Shop";//(1)对于查询MyCommodityOrder中的商铺名来说，此处应该为"Shop"

                    //foreach (var df in termList)
                    //{
                    //    if (df.type.Equals("MerchantShop"))  //(2)对于加载ShopList中的自定义商品类型列表来说，此处应该为Merchant;
                    //    {
                    //        parentSearch = "Merchant";
                    //        df.type = "Shop";
                       
                    //    }
                    //}                 

                }
                else
                {                
                               
                     parentSearch = parentSearch + ".Merchant";
                                        
                }
                alias = parentSearch;
                query.CreateAlias(alias, "shop");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }
                    if (df.type.Equals("Shop"))
                    {
                        query.Add(Restrictions.Eq(notself + "Id", df.value));
                        continue;
                    }

                    if (df.type.Equals("Name"))
                    {
                        query.Add(Restrictions.Like(notself + "Name", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("Owener"))
                    {
                        query.Add(Restrictions.Like(notself + "Owener", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("Type"))
                    {
                        try
                        {
                            ShopTypeEnum Type = (ShopTypeEnum)Enum.Parse(typeof(ShopTypeEnum), df.value, true);
                            query.Add(Restrictions.Eq(notself + "ShopType", Type));
                            continue;
                        }
                        catch (Exception ex)
                        {
                        }

                    }
                    if (df.type.Equals("Tel"))
                    {
                        query.Add(Restrictions.Like(notself + "Tel", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("ShortName"))
                    {
                        query.Add(Restrictions.Like(notself + "ShortName", df.value, MatchMode.Anywhere));
                        continue;
                    }
                    if (df.type.Equals("Address"))
                    {
                        query.Add(Restrictions.Like(notself + "Address", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("ShopStatus"))
                    {
                        ShopStatusEnum ShopStatus = (ShopStatusEnum)Enum.Parse(typeof(ShopStatusEnum), df.value, true);
                        query.Add(Restrictions.Eq(notself + "ShopStatus", ShopStatus));
                        continue;
                    }

                    if (df.type.Equals("LoginUserOfMechant"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByLoginUserOfMerchant(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }


                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }

        protected ICriteria SearchByRent(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByRent(query, termList);
        }
        protected ICriteria SearchByRent(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByRent(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByRent(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "rent.";
                if (deepIndex == 1)
                {
                    parentSearch = "Rent";

                    //foreach (var df in termList)
                    //{
                    //    if (df.type.Equals("MerchantRent")) 
                    //    {
                    //        parentSearch = "Merchant";
                    //        df.type = "Rent";
                    //    }
                    //}   
                }
                else
                {                                 
                        parentSearch = parentSearch + ".Merchant";
                      
                }
                alias = parentSearch;
                query.CreateAlias(alias, "rent");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }
                    if (df.type.Equals("Rent"))
                    {
                        query.Add(Restrictions.Eq(notself + "Id", df.value));
                        continue;
                    }

                    if (df.type.Equals("Name"))
                    {
                        query.Add(Restrictions.Like(notself + "Name", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("Owener"))
                    {
                        query.Add(Restrictions.Like(notself + "Owener", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("Type"))
                    {
                        try
                        {
                            ShopTypeEnum Type = (ShopTypeEnum)Enum.Parse(typeof(ShopTypeEnum), df.value, true);
                            query.Add(Restrictions.Eq(notself + "ShopType", Type));
                            continue;
                        }
                        catch (Exception ex)
                        {
                        }

                    }
                    if (df.type.Equals("Tel"))
                    {
                        query.Add(Restrictions.Like(notself + "Tel", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("ShortName"))
                    {
                        query.Add(Restrictions.Like(notself + "ShortName", df.value, MatchMode.Anywhere));
                        continue;
                    }
                    if (df.type.Equals("Address"))
                    {
                        query.Add(Restrictions.Like(notself + "Address", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("ShopStatus"))
                    {
                        ShopStatusEnum ShopStatus = (ShopStatusEnum)Enum.Parse(typeof(ShopStatusEnum), df.value, true);
                        query.Add(Restrictions.Eq(notself + "ShopStatus", ShopStatus));
                        continue;
                    }

                    if (df.type.Equals("LoginUserOfMechant"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByLoginUserOfMerchant(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }


                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }
        protected ICriteria SearchByFoodStatistic(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByFoodStatistic(query, termList);
        }
        protected ICriteria SearchByFoodStatistic(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByFoodStatistic(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByFoodStatistic(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "foodStatistic.";
                if (deepIndex == 1)
                {
                    parentSearch = "FoodStatistic";                 
                }
                else
                {
                    parentSearch = parentSearch + ".FoodStatistic";

                }
                alias = parentSearch;
                query.CreateAlias(alias, "foodStatistic");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }
                   

                    if (df.type.Equals("Food"))
                    {                        
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByFood(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }


                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }
        protected ICriteria SearchByHouseStatistic(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByHouseStatistic(query, termList);
        }
        protected ICriteria SearchByHouseStatistic(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByHouseStatistic(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByHouseStatistic(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "houseStatistic.";
                if (deepIndex == 1)
                {
                    parentSearch = "HouseStatistic";
                }
                else
                {
                    parentSearch = parentSearch + ".HouseStatistic";

                }
                alias = parentSearch;
                query.CreateAlias(alias, "houseStatistic");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }


                    if (df.type.Equals("House"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByHouse(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }


                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }
        protected ICriteria SearchByHouse(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByHouse(query, termList);
        }
        protected ICriteria SearchByHouse(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByHouse(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByHouse(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "house.";
                if (deepIndex == 1)
                {
                    parentSearch = "House";
                }
                else
                {
                    parentSearch = parentSearch + ".House";

                }
                alias = parentSearch;
                query.CreateAlias(alias, "house");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }
                    if (df.type.Equals("House"))
                    {
                        query.Add(Expression.Eq(notself + "Id", df.value));
                        continue;
                    }
                    if (df.type.Equals("Rent"))
                    {
                        SearchByRent(query, df.field, ref deepIndex, ref parentSearch);
                        continue;
                    }

                    if (df.type.Equals("Name"))
                    {
                        query.Add(Restrictions.Like(notself + "Name", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("Remarks"))
                    {
                        query.Add(Restrictions.Like(notself + "Remarks", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("IsDiscount"))
                    {
                        query.Add(Restrictions.Eq(notself + "IsDiscount", Boolean.Parse(df.value)));
                        continue;
                    }
                    if (df.type.Equals("IsEnabled"))
                    {
                        query.Add(Restrictions.Eq(notself + "IsEnabled", Boolean.Parse(df.value)));
                        continue;
                    }
                    if (df.type.Equals("IsLimited"))
                    {
                        query.Add(Restrictions.Eq(notself + "IsLimited", Boolean.Parse(df.value)));
                        continue;
                    }
                    if (df.type.Equals("Image"))
                    {
                        if (df.comparison.Equals("NotNull"))
                        {
                            query.Add(Restrictions.IsNotNull(notself + "Image"));
                            continue;
                        }
                        if (df.comparison.Equals("IsNull"))
                        {
                            query.Add(Restrictions.IsNull(notself + "Image"));
                            continue;
                        }
                    }

                    if (df.type.Equals("Price"))
                    {
                        Double value = Double.Parse(df.value);
                        if (string.IsNullOrEmpty(df.valueForCompare))
                        {
                            switch (df.comparison)
                            {
                                case "lt":
                                    query.Add(Restrictions.Lt(notself + "Price", value));
                                    break;
                                case "gt":
                                    query.Add(Restrictions.Gt(notself + "Price", value));
                                    break;
                                default:
                                    query.Add(Restrictions.Eq(notself + "Price", value));
                                    break;
                            }
                        }

                        else
                        {
                            Double valueForCompare = Double.Parse(df.valueForCompare);
                            query.Add(Restrictions.Between(notself + "Price", value, valueForCompare));
                        }
                        continue;
                    }
                    if (df.type.Equals("Description"))
                    {
                        query.Add(Restrictions.Like(notself + "Description", df.value, MatchMode.Anywhere));
                        continue;
                    }
                    if (df.type.Equals("MonthAmount"))
                    {
                        Int32 value = Int32.Parse(df.value);
                        if (string.IsNullOrEmpty(df.valueForCompare))
                        {
                            switch (df.comparison)
                            {
                                case "lt":
                                    query.Add(Restrictions.Lt(notself + "MonthAmount", value));
                                    break;
                                case "gt":
                                    query.Add(Restrictions.Gt(notself + "MonthAmount", value));
                                    break;
                                default:
                                    query.Add(Restrictions.Eq(notself + "MonthAmount", value));
                                    break;
                            }
                        }

                        else
                        {
                            Int32 valueForCompare = Int32.Parse(df.valueForCompare);
                            query.Add(Restrictions.Between(notself + "MonthAmount", value, valueForCompare));
                        }
                        continue;
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }
                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                //2013-02-17 basilwang we need set comparison to lower
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.ToLower().Equals("desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(notself + indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(notself + indf.type));
                                }
                            }
                        }
                        continue;
                    }


                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }
        protected ICriteria SearchByFood(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByFood(query, termList);
        }
        protected ICriteria SearchByFood(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByFood(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByFood(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "food.";
                if (deepIndex == 1)
                {
                    parentSearch = "Food";
                }
                else
                {
                    parentSearch = parentSearch + ".Food";

                }
                alias = parentSearch;
                query.CreateAlias(alias, "food");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }
                    if (df.type.Equals("Food"))
                    {
                        query.Add(Expression.Eq(notself + "Id", df.value));
                        continue;
                    }
                    if (df.type.Equals("Restaurant"))
                    {
                            SearchByRestaurant(query, df.field, ref deepIndex, ref parentSearch);
                        continue;
                    }

                    if (df.type.Equals("Name"))
                    {
                        query.Add(Restrictions.Like(notself + "Name", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("Remarks"))
                    {
                        query.Add(Restrictions.Like(notself + "Remarks", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("IsDiscount"))
                    {
                        query.Add(Restrictions.Eq(notself + "IsDiscount", Boolean.Parse(df.value)));
                        continue;
                    }
                    if (df.type.Equals("IsEnabled"))
                    {
                        query.Add(Restrictions.Eq(notself + "IsEnabled", Boolean.Parse(df.value)));
                        continue;
                    }
                    if (df.type.Equals("IsLimited"))
                    {
                        query.Add(Restrictions.Eq(notself + "IsLimited", Boolean.Parse(df.value)));
                        continue;
                    }
                    if (df.type.Equals("Image"))
                    {
                        if (df.comparison.Equals("NotNull"))
                        {
                            query.Add(Restrictions.IsNotNull(notself + "Image"));
                            continue;
                        }
                        if (df.comparison.Equals("IsNull"))
                        {
                            query.Add(Restrictions.IsNull(notself + "Image"));
                            continue;
                        }
                    }

                    if (df.type.Equals("Price"))
                    {
                        Double value = Double.Parse(df.value);
                        if (string.IsNullOrEmpty(df.valueForCompare))
                        {
                            switch (df.comparison)
                            {
                                case "lt":
                                    query.Add(Restrictions.Lt(notself + "Price", value));
                                    break;
                                case "gt":
                                    query.Add(Restrictions.Gt(notself + "Price", value));
                                    break;
                                default:
                                    query.Add(Restrictions.Eq(notself + "Price", value));
                                    break;
                            }
                        }

                        else
                        {
                            Double valueForCompare = Double.Parse(df.valueForCompare);
                            query.Add(Restrictions.Between(notself + "Price", value, valueForCompare));
                        }
                        continue;
                    }
                    if (df.type.Equals("Description"))
                    {
                        query.Add(Restrictions.Like(notself + "Description", df.value, MatchMode.Anywhere));
                        continue;
                    }
                    if (df.type.Equals("MonthAmount"))
                    {
                        Int32 value = Int32.Parse(df.value);
                        if (string.IsNullOrEmpty(df.valueForCompare))
                        {
                            switch (df.comparison)
                            {
                                case "lt":
                                    query.Add(Restrictions.Lt(notself + "MonthAmount", value));
                                    break;
                                case "gt":
                                    query.Add(Restrictions.Gt(notself + "MonthAmount", value));
                                    break;
                                default:
                                    query.Add(Restrictions.Eq(notself + "MonthAmount", value));
                                    break;
                            }
                        }

                        else
                        {
                            Int32 valueForCompare = Int32.Parse(df.valueForCompare);
                            query.Add(Restrictions.Between(notself + "MonthAmount", value, valueForCompare));
                        }
                        continue;
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }
                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                //2013-02-17 basilwang we need set comparison to lower
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.ToLower().Equals("desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(notself + indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(notself + indf.type));
                                }
                            }
                        }
                        continue;
                    }


                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }
        protected ICriteria SearchByCommodityStatistic(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByCommodityStatistic(query, termList);
        }
        protected ICriteria SearchByCommodityStatistic(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByCommodityStatistic(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByCommodityStatistic(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "commodityStatistic.";
                if (deepIndex == 1)
                {
                    parentSearch = "CommodityStatistic";
                }
                else
                {
                    parentSearch = parentSearch + ".CommodityStatistic";

                }
                alias = parentSearch;
                query.CreateAlias(alias, "commodityStatistic");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }


                    if (df.type.Equals("Commodity"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByCommodity(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }


                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }
        protected ICriteria SearchByCommodity(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByCommodity(query, termList);
        }
        protected ICriteria SearchByCommodity(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByCommodity(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByCommodity(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "commodity.";
                if (deepIndex == 1)
                {
                    parentSearch = "Commodity";
                }
                else
                {
                    parentSearch = parentSearch + ".Commodity";

                }
                alias = parentSearch;
                query.CreateAlias(alias, "commodity");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }
                    if (df.type.Equals("Commodity"))
                    {
                        query.Add(Expression.Eq(notself + "Id", df.value));
                        continue;
                    }
                    if (df.type.Equals("Shop"))
                    {
                        SearchByShop(query, df.field, ref deepIndex, ref parentSearch);
                        continue;
                    }

                    if (df.type.Equals("Name"))
                    {
                        query.Add(Restrictions.Like(notself + "Name", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("Remarks"))
                    {
                        query.Add(Restrictions.Like(notself + "Remarks", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("IsDiscount"))
                    {
                        query.Add(Restrictions.Eq(notself + "IsDiscount", Boolean.Parse(df.value)));
                        continue;
                    }
                    if (df.type.Equals("IsEnabled"))
                    {
                        query.Add(Restrictions.Eq(notself + "IsEnabled", Boolean.Parse(df.value)));
                        continue;
                    }
                    if (df.type.Equals("IsLimited"))
                    {
                        query.Add(Restrictions.Eq(notself + "IsLimited", Boolean.Parse(df.value)));
                        continue;
                    }
                    if (df.type.Equals("Image"))
                    {
                        if (df.comparison.Equals("NotNull"))
                        {
                            query.Add(Restrictions.IsNotNull(notself + "Image"));
                            continue;
                        }
                        if (df.comparison.Equals("IsNull"))
                        {
                            query.Add(Restrictions.IsNull(notself + "Image"));
                            continue;
                        }
                    }

                    if (df.type.Equals("Price"))
                    {
                        Double value = Double.Parse(df.value);
                        if (string.IsNullOrEmpty(df.valueForCompare))
                        {
                            switch (df.comparison)
                            {
                                case "lt":
                                    query.Add(Restrictions.Lt(notself + "Price", value));
                                    break;
                                case "gt":
                                    query.Add(Restrictions.Gt(notself + "Price", value));
                                    break;
                                default:
                                    query.Add(Restrictions.Eq(notself + "Price", value));
                                    break;
                            }
                        }

                        else
                        {
                            Double valueForCompare = Double.Parse(df.valueForCompare);
                            query.Add(Restrictions.Between(notself + "Price", value, valueForCompare));
                        }
                        continue;
                    }
                    if (df.type.Equals("Description"))
                    {
                        query.Add(Restrictions.Like(notself + "Description", df.value, MatchMode.Anywhere));
                        continue;
                    }
                    if (df.type.Equals("MonthAmount"))
                    {
                        Int32 value = Int32.Parse(df.value);
                        if (string.IsNullOrEmpty(df.valueForCompare))
                        {
                            switch (df.comparison)
                            {
                                case "lt":
                                    query.Add(Restrictions.Lt(notself + "MonthAmount", value));
                                    break;
                                case "gt":
                                    query.Add(Restrictions.Gt(notself + "MonthAmount", value));
                                    break;
                                default:
                                    query.Add(Restrictions.Eq(notself + "MonthAmount", value));
                                    break;
                            }
                        }

                        else
                        {
                            Int32 valueForCompare = Int32.Parse(df.valueForCompare);
                            query.Add(Restrictions.Between(notself + "MonthAmount", value, valueForCompare));
                        }
                        continue;
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }
                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                //2013-02-17 basilwang we need set comparison to lower
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.ToLower().Equals("desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(notself + indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(notself + indf.type));
                                }
                            }
                        }
                        continue;
                    }


                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }
        protected ICriteria SearchBySystemRole(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchBySystemRole(query, termList);
        }
        protected ICriteria SearchBySystemRole(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchBySystemRole(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchBySystemRole(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "systemRole.";
                if (deepIndex == 1)
                {
                    parentSearch = "SystemRole";
                }
                else
                {
                    parentSearch = parentSearch + ".SystemRole";

                }
                alias = parentSearch;
                query.CreateAlias(alias, "systemRole");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }
                   
                    if (df.type.Equals("Name"))
                    {
                        query.Add(Restrictions.Like(notself + "Name", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("Remarks"))
                    {
                        query.Add(Restrictions.Like(notself + "Remarks", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("Description"))
                    {
                        query.Add(Restrictions.Like(notself + "Description", df.value, MatchMode.Anywhere));
                        continue;
                    }
                
                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }

        protected ICriteria SearchByAddress(ICriteria query, List<DataFilter> termList, bool isSelf, List<SystemUser> systemUserList)
        {
            ISystemUserRepository iSystemUserRepository = UnityHelper.UnityToT<ISystemUserRepository>();
            string notself = null;
            if (!isSelf)
            {
                query.CreateAlias("Address", "address");
                notself = "address.";
            }

            if (systemUserList != null && systemUserList.Count != 0)
            {
                query.Add(Restrictions.In(notself + "SystemUser", systemUserList));
            }
            if (termList != null && termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {

                    if (df.type.Equals("SystemUser"))
                    {
                        if (!string.IsNullOrEmpty(df.value))
                        {
                            query.Add(Restrictions.Eq(notself + "SystemUser", iSystemUserRepository.Get(df.value)));
                        }

                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchBySystemUser(query, df.field, false);
                        }
                        continue;
                    }

                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                    }

                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                //2013-02-17 basilwang we need set comparison to lower
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.ToLower().Equals("desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(notself + indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(notself + indf.type));
                                }
                            }
                        }
                        continue;
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            return query;
        }

        protected ICriteria SearchByMyFavorite(ICriteria query, List<DataFilter> termList, bool isSelf, List<SystemUser> systemUserList)
        {
            ISystemUserRepository iSystemUserRepository = UnityHelper.UnityToT<ISystemUserRepository>();
            string notself = null;
            if (!isSelf)
            {
                query.CreateAlias("MyFavorit", "myFavorit");
                notself = "myFavorit.";
            }

            if (systemUserList != null && systemUserList.Count != 0)
            {
                query.Add(Restrictions.In(notself + "SystemUser", systemUserList));
            }
            if (termList != null && termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {

                    if (df.type.Equals("SystemUser"))
                    {
                        if (!string.IsNullOrEmpty(df.value))
                        {
                            query.Add(Restrictions.Eq(notself + "SystemUser", iSystemUserRepository.Get(df.value)));
                        }

                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchBySystemUser(query, df.field, false);
                        }
                        continue;
                    }

                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                    }

                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                //2013-02-17 basilwang we need set comparison to lower
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.ToLower().Equals("desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(notself + indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(notself + indf.type));
                                }
                            }
                        }
                        continue;
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            return query;
        }


        protected ICriteria SearchByMessage(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByMessage(query, termList);
        }
        protected ICriteria SearchByMessage(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByMessage(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByMessage(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;
            string oldParentSearch = parentSearch;

            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "message.";
                if (deepIndex == 1)
                {
                    parentSearch = "Message";
                }
                else
                {
                    parentSearch = parentSearch + ".Message";
                }
                alias = parentSearch;
                query.CreateAlias(alias, "message");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }
                   

                    if (df.type.Equals("ThreadIndex"))
                    {
                        query.Add(Restrictions.Like(notself + "ThreadIndex", df.value, MatchMode.Anywhere));
                        continue;
                    }
                   
                    if (df.type.Equals("LoginUser"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByLoginUser(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }
                    if (df.type.Equals("Merchant"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByMerchant(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }

        protected ICriteria SearchByFeedBack(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByFeedBack(query, termList);
        }
        protected ICriteria SearchByFeedBack(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByFeedBack(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByFeedBack(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;
            string oldParentSearch = parentSearch;

            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "feedBack.";
                if (deepIndex == 1)
                {
                    parentSearch = "ParentFeedBack";
                }
                else
                {
                    parentSearch = parentSearch + ".FeedBack";
                }
                alias = parentSearch;
                query.CreateAlias(alias, "feedBack");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }


                    if (df.type.Equals("Contents"))
                    {
                        query.Add(Restrictions.Like(notself + "Contents", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    if (df.type.Equals("LoginUser"))
                    {
                        SearchByLoginUser(query, df.field, ref deepIndex, ref parentSearch);
                        continue;
                    }
                    if (df.type.Equals("ParentFeedBack"))
                    {
                        query.Add(Restrictions.IsNull(notself + "ParentFeedBack"));
                        continue;
                    }
                    if (df.type.Equals("ParentFeedBackForTwo"))
                    {
                       // query.Add(Restrictions.Eq(notself + "ParentFeedBack", df.value));
                        SearchByFeedBack(query, df.field, ref deepIndex, ref parentSearch);
                        continue;
                    }
                    if (df.type.Equals("ParentFeedBackId"))
                    {
                        query.Add(Restrictions.Eq(notself + "Id",df.value));
                        continue;
                    }
                    if (df.type.Equals("Type"))
                    {
                        query.Add(Expression.Eq(notself + "Type", df.value));
                        continue;
                    }                   

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }

      
        //protected ICriteria SearchByCommodity(ICriteria query, List<DataFilter> termList, bool isSelf, List<Shop> shopList)
        //{
        //    IShopRepository iShopRepository = UnityHelper.UnityToT<IShopRepository>();
        //    string notself = null;
        //    if (!isSelf)
        //    {
        //        query.CreateAlias("Commodity", "commodity");
        //        notself = "commodity.";
        //    }

        //    if (shopList != null && shopList.Count != 0)
        //    {
        //        query.Add(Restrictions.In(notself + "Shop", shopList));
        //    }
        //    if (termList != null && termList.Count != 0)
        //    {

        //        foreach (DataFilter df in termList)
        //        {

        //            if (df.type.Equals("Shop"))
        //            {
        //                if (!string.IsNullOrEmpty(df.value))
        //                {
        //                    query.Add(Restrictions.Eq(notself + "Shop", iShopRepository.Get(df.value)));
        //                }

        //                if (df.field != null && df.field.Count != 0)
        //                {
        //                    SearchByRestaurant(query, df.field, false);
        //                }
        //                continue;
        //            }

        //            if (df.type.Equals("Order"))
        //            {
        //                if (df.field != null && df.field.Count != 0)
        //                {
        //                    //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
        //                    foreach (DataFilter indf in df.field)
        //                    {
        //                        //2013-02-17 basilwang we need set comparison to lower
        //                        if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.ToLower().Equals("desc"))
        //                        {
        //                            query.AddOrder(NHibernate.Criterion.Order.Desc(notself + indf.type));
        //                        }
        //                        else
        //                        {
        //                            query.AddOrder(NHibernate.Criterion.Order.Asc(notself + indf.type));
        //                        }
        //                    }
        //                }
        //                continue;
        //            }

        //            if (df.type.Equals("Name"))
        //            {
        //                query.Add(Restrictions.Like(notself + "Name", df.value, MatchMode.Anywhere));
        //                continue;
        //            }
                   
        //            if (df.type.Equals("GoodsType"))
        //            {
        //                if (isSelf)
        //                {
        //                    query.CreateAlias("MerchantGoodsType", "merchantGoodsType").Add(Restrictions.Eq("merchantGoodsType.Id", df.value));//不支持嵌套
        //                }
        //                continue;
        //            }
                   
        //            if (df.type.Equals("IsDiscount"))
        //            {
        //                query.Add(Restrictions.Eq(notself + "IsDiscount", Boolean.Parse(df.value)));
        //                continue;
        //            }
        //            if (df.type.Equals("IsEnabled"))
        //            {
        //                query.Add(Restrictions.Eq(notself + "IsEnabled", Boolean.Parse(df.value)));
        //                continue;
        //            }
        //            if (df.type.Equals("IsLimited"))
        //            {
        //                query.Add(Restrictions.Eq(notself + "IsLimited", Boolean.Parse(df.value)));
        //                continue;
        //            }


        //            if (df.type.Equals("IsDelete"))
        //            {
        //                query.Add(Expression.Eq(notself + "IsDelete", false));
        //            }
        //            if (df.type.Equals("Image"))
        //            {
        //                if (df.comparison.Equals("NotNull"))
        //                {
        //                    query.Add(Restrictions.IsNotNull(notself + "Image"));
        //                    continue;
        //                }
        //                if (df.comparison.Equals("IsNull"))
        //                {
        //                    query.Add(Restrictions.IsNull(notself + "Image"));
        //                    continue;
        //                }
        //            }

        //            if (df.type.Equals("Price"))
        //            {
        //                Double value = Double.Parse(df.value);
        //                if (string.IsNullOrEmpty(df.valueForCompare))
        //                {
        //                    switch (df.comparison)
        //                    {
        //                        case "lt":
        //                            query.Add(Restrictions.Lt(notself + "Price", value));
        //                            break;
        //                        case "gt":
        //                            query.Add(Restrictions.Gt(notself + "Price", value));
        //                            break;
        //                        default:
        //                            query.Add(Restrictions.Eq(notself + "Price", value));
        //                            break;
        //                    }
        //                }

        //                else
        //                {
        //                    Double valueForCompare = Double.Parse(df.valueForCompare);
        //                    query.Add(Restrictions.Between(notself + "Price", value, valueForCompare));
        //                }
        //                continue;
        //            }
        //            if (df.type.Equals("MonthAmount"))
        //            {
        //                Int32 value = Int32.Parse(df.value);
        //                if (string.IsNullOrEmpty(df.valueForCompare))
        //                {
        //                    switch (df.comparison)
        //                    {
        //                        case "lt":
        //                            query.Add(Restrictions.Lt(notself + "MonthAmount", value));
        //                            break;
        //                        case "gt":
        //                            query.Add(Restrictions.Gt(notself + "MonthAmount", value));
        //                            break;
        //                        default:
        //                            query.Add(Restrictions.Eq(notself + "MonthAmount", value));
        //                            break;
        //                    }
        //                }

        //                else
        //                {
        //                    Int32 valueForCompare = Int32.Parse(df.valueForCompare);
        //                    query.Add(Restrictions.Between(notself + "MonthAmount", value, valueForCompare));
        //                }
        //                continue;
        //            }

        //            //时间
        //            if (df.type.Equals("CreateTime"))
        //            {
        //                SearchByCreateTime(query, df, notself);
        //                continue;
        //            }

        //        }
        //    }
        //    return query;
        //}

       

        protected ICriteria SearchBySchool(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            string notself = null;
            if (!isSelf)
            {
                query.CreateAlias("School", "school");
                notself = "school.";
            }
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }

                    if (df.type.Equals("Name"))
                    {
                        query.Add(Restrictions.Like(notself + "Name", df.value, MatchMode.Anywhere));
                        continue;
                    }                  
                    if (df.type.Equals("ShortName"))
                    {
                        query.Add(Restrictions.Like(notself + "ShortName", df.value, MatchMode.Anywhere));
                        continue;
                    }
                    if (df.type.Equals("CityName"))
                    {
                        query.Add(Restrictions.Like(notself + "CityName", df.value, MatchMode.Anywhere));
                        continue;
                    }

                   
                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            return query;
        }
        protected ICriteria SearchByActivity(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            string notself = null;
            if (!isSelf)
            {
                query.CreateAlias("Activity", "activity");
                notself = "activity.";
            }
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }

                    if (df.type.Equals("Name"))
                    {
                        query.Add(Restrictions.Like(notself + "Name", df.value, MatchMode.Anywhere));
                        continue;
                    }
                    if (df.type.Equals("Matters"))
                    {
                        query.Add(Restrictions.Like(notself + "Matters", df.value, MatchMode.Anywhere));
                        continue;
                    }
                   
                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            return query;
        }
        protected ICriteria SearchByPropID(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            string notself = null;
            if (!isSelf)
            {
                query.CreateAlias("PropID", "propID");
                notself = "propID.";
            }
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }

                    if (df.type.Equals("PropIDName"))
                    {
                        query.Add(Restrictions.Like(notself + "PropIDName", df.value, MatchMode.Anywhere));
                        continue;
                    }
                    if (df.type.Equals("Id"))
                    {
                        query.Add(Restrictions.Like(notself + "Id", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    ////时间
                    //if (df.type.Equals("CreateTime"))
                    //{
                    //    SearchByCreateTime(query, df, notself);
                    //    continue;
                    //}

                }
            }
            return query;
        }
        protected ICriteria SearchByPropValue(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            string notself = null;
            if (!isSelf)
            {
                query.CreateAlias("PropValue", "propValue");
                notself = "propValue.";
            }
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }

                    if (df.type.Equals("PropValueName"))
                    {
                        query.Add(Restrictions.Like(notself + "PropValueName", df.value, MatchMode.Anywhere));
                        continue;
                    }
                    if (df.type.Equals("Id"))
                    {
                        query.Add(Restrictions.Like(notself + "Id", df.value, MatchMode.Anywhere));
                        continue;
                    }

                    //嵌套PropID查询
                    if (df.type.Equals("PropID"))
                    {
                        SearchByPropID(query, termList, false);
                        continue;
                    }

                }
            }
            return query;
        }
        protected ICriteria SearchByRestaurantStatistic(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByRestaurantStatistic(query, termList);
        }
        protected ICriteria SearchByRestaurantStatistic(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByRestaurantStatistic(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByRestaurantStatistic(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "restaurantStatistic.";
                if (deepIndex == 1)
                {
                    parentSearch = "RestaurantStatistic";

                }
                else
                {
                    parentSearch = parentSearch + ".RestaurantStatistic";

                }
                alias = parentSearch;
                query.CreateAlias(alias, "restaurantStatistic");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }

                    if (df.type.Equals("Restaurant"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByRestaurant(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }


                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }
        protected ICriteria SearchByShopStatistic(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByShopStatistic(query, termList);
        }
        protected ICriteria SearchByShopStatistic(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByShopStatistic(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByShopStatistic(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "shopStatistic.";
                if (deepIndex == 1)
                {
                    parentSearch = "ShopStatistic";

                }
                else
                {
                    parentSearch = parentSearch + ".ShopStatistic";

                }
                alias = parentSearch;
                query.CreateAlias(alias, "shopStatistic");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }

                    if (df.type.Equals("Shop"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByShop(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }


                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }
        protected ICriteria SearchByRentStatistic(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            return SearchByRentStatistic(query, termList);
        }
        protected ICriteria SearchByRentStatistic(ICriteria query, List<DataFilter> termList)
        {
            int deepIndex = 0;
            string parentSearch = string.Empty;
            return SearchByRentStatistic(query, termList, ref deepIndex, ref parentSearch);
        }
        protected ICriteria SearchByRentStatistic(ICriteria query, List<DataFilter> termList, ref int deepIndex, ref string parentSearch)
        {
            string notself = null;

            string oldParentSearch = parentSearch;
            string alias = string.Empty;
            if (deepIndex > 0)
            {
                notself = "rentStatistic.";
                if (deepIndex == 1)
                {
                    parentSearch = "RentStatistic";

                }
                else
                {
                    parentSearch = parentSearch + ".RentStatistic";

                }
                alias = parentSearch;
                query.CreateAlias(alias, "rentStatistic");
            }
            deepIndex++;
            if (termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {
                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
                        continue;
                    }

                    if (df.type.Equals("Rent"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByRent(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }


                    if (df.type.Equals("Order"))
                    {
                        if (df.field != null && df.field.Count != 0)
                        {
                            //query.AddOrder(NHibernate.Criterion.Order.Desc("FoodType"))
                            foreach (DataFilter indf in df.field)
                            {
                                if (!string.IsNullOrEmpty(indf.comparison) && indf.comparison.Equals("Desc"))
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Desc(indf.type));
                                }
                                else
                                {
                                    query.AddOrder(NHibernate.Criterion.Order.Asc(indf.type));
                                }
                                continue;
                            }
                        }
                    }

                    //时间
                    if (df.type.Equals("CreateTime"))
                    {
                        SearchByCreateTime(query, df, notself);
                        continue;
                    }

                }
            }
            deepIndex--;
            parentSearch = oldParentSearch;
            return query;
        }
        protected void SearchByCreateTime(ICriteria query, DataFilter df, string notself)
        {
            DateTime value = DateTime.Parse(df.value);
            if (string.IsNullOrEmpty(df.valueForCompare))
            {
                switch (df.comparison)
                {
                    case "lt":
                        query.Add(Restrictions.Lt(notself + "CreateTime", value));
                        break;
                    case "gt":
                        query.Add(Restrictions.Gt(notself + "CreateTime", value));
                        break;
                    default:
                        query.Add(Restrictions.Eq(notself + "CreateTime", value));
                        break;

                }
            }
            else
            {
                DateTime valueForCompare = DateTime.Parse(df.valueForCompare);
                query.Add(Restrictions.Between(notself + "CreateTime", value, valueForCompare));
            }
        }
        protected void SearchByTimestamp(ICriteria query, DataFilter df, string notself)
        {
            DateTime value = DateTime.Parse(df.value);
            if (string.IsNullOrEmpty(df.valueForCompare))
            {
                switch (df.comparison)
                {
                    case "lt":
                        query.Add(Restrictions.Lt(notself + "Timestamp", value));
                        break;
                    case "gt":
                        query.Add(Restrictions.Gt(notself + "Timestamp", value));
                        break;
                    default:
                        query.Add(Restrictions.Eq(notself + "Timestamp", value));
                        break;

                }
            }
            else
            {
                DateTime valueForCompare = DateTime.Parse(df.valueForCompare);
                query.Add(Restrictions.Between(notself + "Timestamp", value, valueForCompare));
            }
        }
    }

}

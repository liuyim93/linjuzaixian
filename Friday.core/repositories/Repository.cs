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

                foreach(DataFilter df in termList)
                {
                  if (df.type.Equals("FromLoginUser"))
                  {
                      parentSearch = "FromLoginUser";
                      df.type = "LoginName";
                      ailisstring = "fLoginUser";
                      notself = "fLoginUser.";
                  }
                  if (df.type.Equals("ToLoginUser"))
                  {
                      parentSearch = "ToLoginUser";
                      df.type = "LoginName";
                      ailisstring = "tLoginUser";
                      notself = "tLoginUser.";
                  }
                }

                alias = parentSearch;
                query.CreateAlias(alias, ailisstring);
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

                    if (df.type.Equals("UserType"))
                    {
                        try
                        {
                            UserTypeEnum Type = (UserTypeEnum)Enum.Parse(typeof(UserTypeEnum), df.value, true);
                            query.Add(Restrictions.Eq(notself + "UserType", Type));
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
                    parentSearch = "LoginUserOfMerchants";   //Restaurant 的一个属性  Restaurant.LoginUserOfMerchants  HasMany
                }
                else
                {
                    parentSearch = parentSearch + ".LoginUserOfMerchants";
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
                        query.Add(Expression.Eq(notself + "IsAnonymous", false));
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

        protected ICriteria SearchByOrderOfFood(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            IMyFoodOrderRepository iMyFoodOrderRepository = UnityHelper.UnityToT<IMyFoodOrderRepository>();
            string notself = null;
            if (!isSelf)
            {
                query.CreateAlias("OrderOfFood", "orderOfFood");
                notself = "orderOfFood.";
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

                    if (df.type.Equals("MyFoodOrder"))
                    {
                        if (!string.IsNullOrEmpty(df.value))
                        {
                            query.Add(Restrictions.Eq(notself + "MyFoodOrder", iMyFoodOrderRepository.Get(df.value)));
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
                           // SearchByRestaurant(query, df.field, false);
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
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByRent(query, df.field, false);
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
                    parentSearch = "restaurant";
                }
                else
                {
                    parentSearch = parentSearch + ".restaurant";
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
                    parentSearch = "Shop";
                }
                else
                {
                    parentSearch = parentSearch + ".Shop";
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
                }
                else
                {
                    parentSearch = parentSearch + ".Rent";
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
        protected ICriteria SearchByFood(ICriteria query, List<DataFilter> termList, bool isSelf, List<Restaurant> restaurantList)
        {
            IRestaurantRepository iRestaurantRepository = UnityHelper.UnityToT<IRestaurantRepository>();
            string notself = null;
            if (!isSelf)
            {
                query.CreateAlias("Food", "food");
                notself = "food.";
            }

            if (restaurantList != null && restaurantList.Count != 0)
            {
                query.Add(Restrictions.In(notself + "Restaurant", restaurantList));
            }
            if (termList != null && termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {

                    if (df.type.Equals("Restaurant"))
                    {
                        if (!string.IsNullOrEmpty(df.value))
                        {
                            query.Add(Restrictions.Eq(notself + "Restaurant", iRestaurantRepository.Get(df.value)));
                        }

                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByRestaurant(query, df.field, false);
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

                    if (df.type.Equals("Name"))
                    {
                        query.Add(Restrictions.Like(notself + "Name", df.value, MatchMode.Anywhere));
                        continue;
                    }
                    //if (df.type.Equals("FoodType"))
                    //{
                    //    if (isSelf)
                    //    {
                    //        query.CreateAlias("FoodType", "foodType").Add(Restrictions.Eq("foodType.FoodType", df.value));//不支持嵌套
                    //    }
                    //    continue;
                    //}

                    if (df.type.Equals("GoodsType"))
                    {
                        if (isSelf)
                        {
                            query.CreateAlias("MerchantGoodsType", "merchantGoodsType").Add(Restrictions.Eq("merchantGoodsType.Id", df.value));//不支持嵌套
                        }
                        continue;
                    }
                    
                    if (df.type.Equals("MerchantGoodsType_id"))
                    {
                        query.Add(Expression.Eq(notself + "MerchantGoodsType_id", df.value));
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


                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
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

                }
            }
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
                   
                    if (df.type.Equals("FromLoginUser"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByLoginUser(query, df.field, ref deepIndex, ref parentSearch);
                        }
                        continue;
                    }
                    if (df.type.Equals("ToLoginUser"))
                    {
                        //根据loginUser的属性进行嵌套筛选
                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByLoginUser(query, df.field, ref deepIndex, ref parentSearch);
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


      
        protected ICriteria SearchByCommodity(ICriteria query, List<DataFilter> termList, bool isSelf, List<Shop> shopList)
        {
            IShopRepository iShopRepository = UnityHelper.UnityToT<IShopRepository>();
            string notself = null;
            if (!isSelf)
            {
                query.CreateAlias("Commodity", "commodity");
                notself = "commodity.";
            }

            if (shopList != null && shopList.Count != 0)
            {
                query.Add(Restrictions.In(notself + "Shop", shopList));
            }
            if (termList != null && termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {

                    if (df.type.Equals("Shop"))
                    {
                        if (!string.IsNullOrEmpty(df.value))
                        {
                            query.Add(Restrictions.Eq(notself + "Shop", iShopRepository.Get(df.value)));
                        }

                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByRestaurant(query, df.field, false);
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

                    if (df.type.Equals("Name"))
                    {
                        query.Add(Restrictions.Like(notself + "Name", df.value, MatchMode.Anywhere));
                        continue;
                    }
                    //if (df.type.Equals("FoodType"))
                    //{
                    //    if (isSelf)
                    //    {
                    //        query.CreateAlias("FoodType", "foodType").Add(Restrictions.Eq("foodType.FoodType", df.value));//不支持嵌套
                    //    }
                    //    continue;
                    //}

                    if (df.type.Equals("GoodsType"))
                    {
                        if (isSelf)
                        {
                            query.CreateAlias("MerchantGoodsType", "merchantGoodsType").Add(Restrictions.Eq("merchantGoodsType.Id", df.value));//不支持嵌套
                        }
                        continue;
                    }

                    if (df.type.Equals("MerchantGoodsType_id"))
                    {
                        query.Add(Expression.Eq(notself + "MerchantGoodsType_id", df.value));
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


                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
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

                }
            }
            return query;
        }

      
        protected ICriteria SearchByHouse(ICriteria query, List<DataFilter> termList, bool isSelf, List<Rent> rentList)
        {
            IRentRepository iRentRepository = UnityHelper.UnityToT<IRentRepository>();
            string notself = null;
            if (!isSelf)
            {
                query.CreateAlias("House", "house");
                notself = "house.";
            }

            if (rentList != null && rentList.Count != 0)
            {
                query.Add(Restrictions.In(notself + "Rent", rentList));
            }
            if (termList != null && termList.Count != 0)
            {

                foreach (DataFilter df in termList)
                {

                    if (df.type.Equals("Rent"))
                    {
                        if (!string.IsNullOrEmpty(df.value))
                        {
                            query.Add(Restrictions.Eq(notself + "Rent", iRentRepository.Get(df.value)));
                        }

                        if (df.field != null && df.field.Count != 0)
                        {
                            SearchByRestaurant(query, df.field, false);
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

                    if (df.type.Equals("Name"))
                    {
                        query.Add(Restrictions.Like(notself + "Name", df.value, MatchMode.Anywhere));
                        continue;
                    }
                    //if (df.type.Equals("FoodType"))
                    //{
                    //    if (isSelf)
                    //    {
                    //        query.CreateAlias("FoodType", "foodType").Add(Restrictions.Eq("foodType.FoodType", df.value));//不支持嵌套
                    //    }
                    //    continue;
                    //}

                    if (df.type.Equals("GoodsType"))
                    {
                        if (isSelf)
                        {
                            query.CreateAlias("MerchantGoodsType", "merchantGoodsType").Add(Restrictions.Eq("merchantGoodsType.Id", df.value));//不支持嵌套
                        }
                        continue;
                    }

                    if (df.type.Equals("MerchantGoodsType_id"))
                    {
                        query.Add(Expression.Eq(notself + "MerchantGoodsType_id", df.value));
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


                    if (df.type.Equals("IsDelete"))
                    {
                        query.Add(Expression.Eq(notself + "IsDelete", false));
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

                }
            }
            return query;
        }
       

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
    }

}

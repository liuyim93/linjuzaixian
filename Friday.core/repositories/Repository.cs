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
            total = Session.CreateCriteria<T>().Add(Expression.Eq("IsDelete", false)).SetProjection(Projections.RowCountInt64()).UniqueResult<long>();

            return query.List<T>();

        }
        protected ICriteria SearchByRestaurant(ICriteria query, List<DataFilter> termList, bool isSelf)
        {
            string notself = null;
            if (!isSelf)
            {
                query.CreateAlias("Restaurant", "restaurant");
                notself = "restaurant.";
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
                    if (df.type.Equals("FoodType"))
                    {
                        if (isSelf)
                        {
                            query.CreateAlias("FoodType", "foodType").Add(Restrictions.Eq("foodType.FoodType", df.value));//不支持嵌套
                        }
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

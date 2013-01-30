using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class Restaurant:Merchant
    {
        public Restaurant()
        {
            Foods = new Iesi.Collections.Generic.HashedSet<Food>();

        }


        public virtual int SendTime//配送时限
        {
            set;

            get;

        }

        public virtual double SendPrice
        {
            set;

            get;
        }


        public virtual float Cost
        {
            get;

            set;
        }


        public virtual string MorningBeginHour
        {
            get;

            set;

        }
        public virtual string MorningEndHour
        {
            get;

            set;

        }
        public virtual string AfternoonBeginHour
        {
            get;

            set;

        }

        public virtual string AfternoonEndHour
        {
            get;

            set;

        }
        public virtual string NightStartHour
        {

            set;
            get;
        }

        public virtual string NightEndHour
        {

            set;

            get;
        }

        //2012-12-28 basilwang populate ActivityList here
        public virtual List<ShopActivity> ShopActivityList
        {
            get
            {
                string[] activities = this.Activity.Split(',');
                List<ShopActivity> activityList = new List<ShopActivity>();
                for (int i = 0; i < activities.Length; i++)
                {
                    switch (activities[i])
                    {
                        case "xindian":
                            activityList.Add(new ShopActivity() { Class = "restaurant-icons new", Title = "新店开张，欢迎光临" });
                            break;
                        case "huanbao":
                            activityList.Add(new ShopActivity() { Class = "restaurant-icons huanbao", Title = "该餐厅使用环保餐盒" });
                            break;
                        case "fapiao":
                            activityList.Add(new ShopActivity() { Class = "restaurant-icons invoice", Title = "该餐厅支持开发票，开票订单金额最低20元起，请在下单时填写好发票抬头" });
                            break;
                        case "dijiaquan":
                            activityList.Add(new ShopActivity() { Class = "restaurant-icons quan", Title = "该餐厅可使用纸质抵价券，不与其他优惠同时使用" });
                            break;
                        case "chaopei":
                            activityList.Add(new ShopActivity() { Class = "restaurant-icons chaoshipeifu", Title = "该餐厅参加超时赔付活动，超1小时，打9折。超过两小时免费。下雨天除外" });
                            break;
                        case "jiuzhe":
                            activityList.Add(new ShopActivity() { Class = "restaurant-icons nine-discount", Title = "该餐厅网上下单，9折优惠，不与其他优惠同时使用" });
                            break;
                        case "peifei":
                            string titile = new StringBuilder().Append("该餐厅订餐需支付配送费").Append(this.Cost).Append("元").ToString();
                            activityList.Add(new ShopActivity() { Class = "restaurant-icons deliver-fee", Title = titile });
                            break;

                    }
                }
                return activityList;

            }
        }
        //Shop 1:N Food
        public virtual Iesi.Collections.Generic.ISet<Food> Foods
        {
            get;

            set;
        }

        //public virtual Iesi.Collections.Generic.ISet<MyFoodOrder> MyFoodOrders
        //{
        //    get;

        //    set;
        //}

    }
}

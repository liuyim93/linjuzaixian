using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.EnumType;
using friday.core.components;
using System.Linq;

namespace Friday.Test2
{
    [TestFixture]
    public class Test_RestaurantMultiSearch
    {
        [Test]
        public void Test()
        {
            string shopName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string loginName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string shopName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string loginName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            IRestaurantRepository iRestaurantRepository = UnityHelper.UnityToT<IRestaurantRepository>();
            IList<Restaurant> iRestaurants = new List<Restaurant>();
            ILoginUserOfMerchantRepository iLoginUserOfMerchantRepository = UnityHelper.UnityToT<ILoginUserOfMerchantRepository>();
            ILoginUserRepository iLoginUserRepository = UnityHelper.UnityToT<ILoginUserRepository>();

            Restaurant rest1 = new Restaurant()
            {
               Activity = "jiuzhe",
               Address = "山东财经大学燕山",
               AfternoonBeginHour = "18:20",
               AfternoonEndHour = "19:30",
               Bulletins = "元宵节大促销",
               Cost = 2,
               Description = "本店元宵节大促销!!!!",
               Distance = "100",
               Email = "222@qq.com",
               Logo = "image/21222.jpg",
               Name = shopName,
               Owener = loginName,
               ShortName = "tianwaicun",
               Tel = "18799999992",
               SendTime = 30,
               Rate = 0.8,
               SendPrice = 10,
             

            };
            iRestaurantRepository.SaveOrUpdate(rest1);

           LoginUser lu1 = new LoginUser();
           lu1.LoginName = loginName;
           lu1.Password = loginName;
           lu1.UserType = UserTypeEnum.餐馆;
           iLoginUserRepository.SaveOrUpdate(lu1);


           LoginUserOfMerchant lum = new LoginUserOfMerchant();
           lum.Merchant = rest1;
           lum.LoginUser = lu1;
           iLoginUserOfMerchantRepository.SaveOrUpdate(lum);

           ////餐馆1的店小二   2个
           //for (int i = 0; i < 2; i++) 
           //{          
           //    LoginUser xiaoErLoginUser = new LoginUser()
           //   {
           //    IsAdmin = false,
           //    LoginName = i+"号小二" + rest1.Name,
           //    Password = i+"haoxiaoer" + rest1.Tel,
           //    UserType = UserTypeEnum.餐馆店小二,
           //   };
           //  iLoginUserRepository.SaveOrUpdate(xiaoErLoginUser);
 
           //  LoginUserOfMerchant xiaoerlum = new LoginUserOfMerchant();
           //  xiaoerlum.Merchant = rest1;
           //  xiaoerlum.LoginUser = xiaoErLoginUser;
           //  iLoginUserOfMerchantRepository.SaveOrUpdate(xiaoerlum);
           // }


           Restaurant rest2 = new Restaurant()
           {
               Activity = "85折",
               Address = "中国海洋大学",
               AfternoonBeginHour = "8:20",
               AfternoonEndHour = "9:30",
               Bulletins = "暂停营业",
               Cost = 2,
               Description = "本店正在装修，暂停营业一星期",
               Distance = "200",
               Email = "pang@126.com",
               Logo = "image/haiyang.jpg",
               Name = shopName2,
               Owener = loginName2,
               ShortName = "yinzuo",
               Tel = "152785138650",
               SendTime = 30,
               Rate = 0.8,
               SendPrice = 10,


           };
           iRestaurantRepository.SaveOrUpdate(rest2);

           LoginUser lu2 = new LoginUser();
           lu2.LoginName = loginName2;
           lu2.Password = loginName2;
           lu2.UserType = UserTypeEnum.餐馆;
           iLoginUserRepository.SaveOrUpdate(lu2);


           LoginUserOfMerchant lum2 = new LoginUserOfMerchant();
           lum2.Merchant = rest2;
           lum2.LoginUser = lu2;
           iLoginUserOfMerchantRepository.SaveOrUpdate(lum2);

           ////餐馆2的店小二   2个
           //for (int i = 0; i < 2; i++)
           //{
           //    LoginUser xiaoErLoginUser2 = new LoginUser()
           //    {
           //        IsAdmin = false,
           //        LoginName = i + "号" + rest2.Name,
           //        Password = i + "haoxiaoer" + rest2.Tel,
           //        UserType = UserTypeEnum.餐馆店小二,
           //    };
           //    iLoginUserRepository.SaveOrUpdate(xiaoErLoginUser2);

           //    LoginUserOfMerchant xiaoerlum2 = new LoginUserOfMerchant();
           //    xiaoerlum2.Merchant = rest2;
           //    xiaoerlum2.LoginUser = xiaoErLoginUser2;
           //    iLoginUserOfMerchantRepository.SaveOrUpdate(xiaoerlum2);
           //}
           List<DataFilter> filterList = new List<DataFilter>();
           List<DataFilter> loginUserOfMechentList = new List<DataFilter>();
           List<DataFilter> loginUserList = new List<DataFilter>();
           loginUserList.Add(new DataFilter()
           {
               type = "LoginName",
               value = loginName

           });
           loginUserList.Add(new DataFilter()
           {
               type = "UserType",
               value = "餐馆"

           });
           loginUserOfMechentList.Add(new DataFilter()
           {
               type = "LoginUser",
               field = loginUserList

           });

           filterList.Add(new DataFilter()
           {
               type = "LoginUserOfMechant",
               field = loginUserOfMechentList
           });

           Restaurant r = iRestaurantRepository.Search(filterList).FirstOrDefault();
          
           Assert.IsTrue(r.Name==shopName,string.Format("餐馆名字实际结果：{0}与期望结果{1}不一致",r.Name,shopName));
        }

     
    }
}

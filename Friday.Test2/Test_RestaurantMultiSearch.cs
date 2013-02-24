using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.EnumType;

namespace Friday.Test2
{
    [TestFixture]
    public class Test_RestaurantMultiSearch
    {
        [Test]
        public void Test()
        {
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
               Name = "天外村酒楼",
               Owener = "刘德华",
               ShortName = "tianwaicun",
               Tel = "18799999992",
               SendTime = 30,
               Rate = 0.8,
               SendPrice = 10,
             

            };
            iRestaurantRepository.SaveOrUpdate(rest1);

           LoginUser lu1 = new LoginUser();
           lu1.LoginName = "LogLDH" + rest1.Owener;
           lu1.Password = "LPass" + rest1.Tel;
           lu1.UserType = UserTypeEnum.餐馆;
           iLoginUserRepository.SaveOrUpdate(lu1);


           LoginUserOfMerchant lum = new LoginUserOfMerchant();
           lum.Merchant = rest1;
           lum.LoginUser = lu1;
           iLoginUserOfMerchantRepository.SaveOrUpdate(lum);

           //餐馆1的店小二   2个
           for (int i = 0; i < 2; i++) 
           {          
               LoginUser xiaoErLoginUser = new LoginUser()
              {
               IsAdmin = false,
               LoginName = i+"号小二" + rest1.Name,
               Password = i+"haoxiaoer" + rest1.Tel,
               UserType = UserTypeEnum.餐馆店小二,
              };
             iLoginUserRepository.SaveOrUpdate(xiaoErLoginUser);
 
             LoginUserOfMerchant xiaoerlum = new LoginUserOfMerchant();
             xiaoerlum.Merchant = rest1;
             xiaoerlum.LoginUser = xiaoErLoginUser;
             iLoginUserOfMerchantRepository.SaveOrUpdate(xiaoerlum);
            }


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
               Name = "银座中豪大酒店",
               Owener = "任贤齐",
               ShortName = "yinzuo",
               Tel = "152785138650",
               SendTime = 30,
               Rate = 0.8,
               SendPrice = 10,


           };
           iRestaurantRepository.SaveOrUpdate(rest2);

           LoginUser lu2 = new LoginUser();
           lu2.LoginName = "LognRxq" + rest2.Owener;
           lu2.Password = "LPass" + rest2.Tel;
           lu2.UserType = UserTypeEnum.餐馆;
           iLoginUserRepository.SaveOrUpdate(lu2);


           LoginUserOfMerchant lum2 = new LoginUserOfMerchant();
           lum2.Merchant = rest2;
           lum2.LoginUser = lu2;
           iLoginUserOfMerchantRepository.SaveOrUpdate(lum2);

           //餐馆2的店小二   2个
           for (int i = 0; i < 2; i++)
           {
               LoginUser xiaoErLoginUser2 = new LoginUser()
               {
                   IsAdmin = false,
                   LoginName = i + "号" + rest2.Name,
                   Password = i + "haoxiaoer" + rest2.Tel,
                   UserType = UserTypeEnum.餐馆店小二,
               };
               iLoginUserRepository.SaveOrUpdate(xiaoErLoginUser2);

               LoginUserOfMerchant xiaoerlum2 = new LoginUserOfMerchant();
               xiaoerlum2.Merchant = rest2;
               xiaoerlum2.LoginUser = xiaoErLoginUser2;
               iLoginUserOfMerchantRepository.SaveOrUpdate(xiaoerlum2);
           }
        }

     
    }
}

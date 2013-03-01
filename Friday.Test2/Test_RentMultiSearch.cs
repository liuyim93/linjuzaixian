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
    public class Test_RentMultiSearch
    {
        [Test]
        public void Test()
        {
            string rentName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string loginName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string rentName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string loginName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            IRentRepository iRentRepository = UnityHelper.UnityToT<IRentRepository>();
            IList<Rent> iRents = new List<Rent>();
            ILoginUserOfMerchantRepository iLoginUserOfMerchantRepository = UnityHelper.UnityToT<ILoginUserOfMerchantRepository>();
            ILoginUserRepository iLoginUserRepository = UnityHelper.UnityToT<ILoginUserRepository>();

            Rent rest1 = new Rent()
            {
               Activity = "jiuzhe",
               Address = "山东财经大学燕山",
               Bulletins = "元宵节大促销",
               Description = "本店元宵节大促销!!!!",
               Distance = "100",
               Email = "222@qq.com",
               Logo = "image/21222.jpg",
               Name = rentName,
               Owener = loginName,
               ShortName = "tianwaicun",
               Tel = "18799999992",
               Rate = 0.8,
             

            };
            iRentRepository.SaveOrUpdate(rest1);

           LoginUser lu1 = new LoginUser();
           lu1.LoginName = loginName;
           lu1.Password = loginName;
           //lu1.UserType = UserTypeEnum.租房;
           iLoginUserRepository.SaveOrUpdate(lu1);


           LoginUserOfMerchant lum = new LoginUserOfMerchant();
           lum.Merchant = rest1;
           lum.LoginUser = lu1;
           iLoginUserOfMerchantRepository.SaveOrUpdate(lum);

         

           Rent rest2 = new Rent()
           {
               Activity = "85折",
               Address = "中国海洋大学",
               Bulletins = "暂停营业",
               Description = "本店正在装修，暂停营业一星期",
               Distance = "200",
               Email = "pang@126.com",
               Logo = "image/haiyang.jpg",
               Name = rentName2,
               Owener = loginName2,
               ShortName = "yinzuo",
               Tel = "152785138650",
               Rate = 0.8,


           };
           iRentRepository.SaveOrUpdate(rest2);

           LoginUser lu2 = new LoginUser();
           lu2.LoginName = loginName2;
           lu2.Password = loginName2;
           //lu2.UserType = UserTypeEnum.租房;
           iLoginUserRepository.SaveOrUpdate(lu2);


           LoginUserOfMerchant lum2 = new LoginUserOfMerchant();
           lum2.Merchant = rest2;
           lum2.LoginUser = lu2;
           iLoginUserOfMerchantRepository.SaveOrUpdate(lum2);

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
               value = "租房"

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

           Rent r = iRentRepository.Search(filterList).FirstOrDefault();

           Assert.IsTrue(r.Name == rest1.Name, string.Format("租房名字实际结果：{0}与期望结果{1}不一致", r.Name, rest1.Name));
        }

     
    }
}

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
    public class Test_MessageMultiSearch
    {
        [Test]
        public void Test()
        {
            string messageName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string loginName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string messageName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string loginName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string restName1 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string restName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            IMessageRepository iMessageRepository = UnityHelper.UnityToT<IMessageRepository>();
            IList<Message> iMessages = new List<Message>();
           IRepository<MessageContent> iMessageContentRepository = UnityHelper.UnityToT<IRepository<MessageContent>>();
            ILoginUserRepository iLoginUserRepository = UnityHelper.UnityToT<ILoginUserRepository>();
            IRepository<Restaurant> iRestaurantRepository = UnityHelper.UnityToT<IRepository<Restaurant>>();

            LoginUser lu1 = new LoginUser();
            lu1.LoginName = loginName;
            lu1.Password = loginName;
            iLoginUserRepository.SaveOrUpdate(lu1);           

            LoginUser lu2 = new LoginUser();
            lu2.LoginName = loginName2;
            lu2.Password = loginName2;
            iLoginUserRepository.SaveOrUpdate(lu2);

            Restaurant rst1 = new Restaurant();
            rst1.Name = restName1;
            iRestaurantRepository.SaveOrUpdate(rst1);

            Restaurant rst2 = new Restaurant();
            rst2.Name = restName2;
            iRestaurantRepository.SaveOrUpdate(rst2);
            
            MessageContent Mescnt = new MessageContent();
            Mescnt.Content = "大润发促销活动马上结束";
            iMessageContentRepository.SaveOrUpdate(Mescnt);

            Message mess1 = new Message()
            {
                Direction=0,
                LoginUser=lu1,
                Merchant=rst1,
                MessageContent=Mescnt                          

            };
            iMessageRepository.SaveOrUpdate(mess1);

          


           Message rest2 = new Message()
           {
                Merchant=rst2,
                 LoginUser=lu2,
                 Direction=1,
               MessageContent = Mescnt 

           };
           iMessageRepository.SaveOrUpdate(rest2);





           List<DataFilter> filterList = new List<DataFilter>();
           List<DataFilter> loginUserList = new List<DataFilter>();
           List<DataFilter> merchantList = new List<DataFilter>();

           loginUserList.Add(new DataFilter()
           {
               type = "LoginName",
               value = loginName

           });
           filterList.Add(new DataFilter()
           {
               type = "LoginUser",
               field = loginUserList
           });
           merchantList.Add(new DataFilter()
           {
               type = "Name",
               value = restName1

           });
           filterList.Add(new DataFilter()
           {
               type = "Merchant",
               field = merchantList
           });



           Message r = iMessageRepository.Search(filterList).FirstOrDefault();

           Assert.IsTrue(r.LoginUser.LoginName == loginName, string.Format("Mess1发送者名字实际结果：{0}与期望结果{1}不一致", r.LoginUser.LoginName, loginName));
        
        }

     
    }
}

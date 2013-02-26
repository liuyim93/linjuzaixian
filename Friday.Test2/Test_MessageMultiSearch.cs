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
            IMessageRepository iMessageRepository = UnityHelper.UnityToT<IMessageRepository>();
            IList<Message> iMessages = new List<Message>();
           IRepository<MessageContent> iMessageContentRepository = UnityHelper.UnityToT<IRepository<MessageContent>>();
            ILoginUserRepository iLoginUserRepository = UnityHelper.UnityToT<ILoginUserRepository>();


            LoginUser lu1 = new LoginUser();
            lu1.LoginName = loginName;
            lu1.Password = loginName;
            lu1.UserType = UserTypeEnum.顾客;
            iLoginUserRepository.SaveOrUpdate(lu1);

            LoginUser lu2 = new LoginUser();
            lu2.LoginName = loginName2;
            lu2.Password = loginName2;
            lu2.UserType = UserTypeEnum.顾客;
            iLoginUserRepository.SaveOrUpdate(lu2);

            MessageContent Mescnt = new MessageContent();
            Mescnt.Content = "大润发促销活动马上结束";
            iMessageContentRepository.SaveOrUpdate(Mescnt);

            Message mess1 = new Message()
            {
                FromLoginUser=lu1,
                ToLoginUser=lu2,
                MessageContent=Mescnt                          

            };
            iMessageRepository.SaveOrUpdate(mess1);

          


           Message rest2 = new Message()
           {
               FromLoginUser = lu2,
               ToLoginUser = lu1,
               MessageContent = Mescnt 

           };
           iMessageRepository.SaveOrUpdate(rest2);






           List<DataFilter> filterList = new List<DataFilter>();
           List<DataFilter> fromloginUserList = new List<DataFilter>();
           List<DataFilter> tologinUserList = new List<DataFilter>();


           fromloginUserList.Add(new DataFilter()
           {
               type = "FromLoginUser",
               value =loginName

           });
           filterList.Add(new DataFilter()
           {
               type = "FromLoginUser",
               field = fromloginUserList
           });

           tologinUserList.Add(new DataFilter()
           {
               type = "ToLoginUser",
               value =  loginName2 

           });
           filterList.Add(new DataFilter()
           {
               type = "ToLoginUser",
               field = tologinUserList
           });

           Message r = iMessageRepository.Search(filterList).FirstOrDefault();

           Assert.IsTrue(r.FromLoginUser.LoginName == lu1.LoginName, string.Format("Mess1发送者名字实际结果：{0}与期望结果{1}不一致", r.FromLoginUser.LoginName, lu1.LoginName));
        }

     
    }
}

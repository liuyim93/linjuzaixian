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
    public class Test_FeedBackSearch
    {
        [Test]
        public void Test()
        {
            IFeedBackRepository iFeedBackRepository = UnityHelper.UnityToT<IFeedBackRepository>();
            IRepository<SystemUser> iSystemUserRepository = UnityHelper.UnityToT<IRepository<SystemUser>>();
            IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>(); 
            IList<FeedBack> iFeedBacks = new List<FeedBack>();

             string sysName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string loginName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string sysName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string loginName2 = Guid.NewGuid().ToString().GetHashCode().ToString();

            SystemUser su = new SystemUser()
            {
                Tel = "13966666666",
                Description = "erhuan30",
                Email = "ocam30@163.com",
                EntityIndex = 30,
                Name = sysName,
                IsAnonymous = false

            };

            LoginUser lu = new LoginUser()
            {
                LoginName = loginName,
                Password = "book001",
                IsAdmin = false,
                UserType = UserTypeEnum.顾客,
                SystemUser = su
            };

            su.LoginUser = lu;
            iLoginUserRepository.SaveOrUpdate(lu);

            SystemUser su2 = new SystemUser()
            {
                Tel = "13966666666",
                Description = "erhuan30",
                Email = "ocam30@163.com",
                EntityIndex = 30,
                Name = sysName2,
                IsAnonymous = false

            };

            LoginUser lu2 = new LoginUser()
            {
                LoginName = loginName2,
                Password = "book001",
                IsAdmin = false,
                UserType = UserTypeEnum.顾客,
                SystemUser = su2
            };

            su2.LoginUser = lu2;
            iLoginUserRepository.SaveOrUpdate(lu2);

            FeedBack fb1 = new FeedBack()
            {
                 Type="1",
                 Contents="送货速度很慢啊！！！！！！",
                 LoginUser=lu
                  

            };
            iFeedBackRepository.SaveOrUpdate(fb1);

            FeedBack fb2 = new FeedBack()
            {
                Type = "2",
                Contents = "冰箱有问题。。。",
                LoginUser = lu2
            };
            iFeedBackRepository.SaveOrUpdate(fb2);

            FeedBack fb3 = new FeedBack()
            {
                Type = "3",
                Contents = "有优惠活动吗？",
                LoginUser = lu
                
               
            };         

            FeedBack fb4 = new FeedBack()
            {
                Type = "3",
                Contents = "没有有优惠活动",
                ParentFeedBack=fb3,
                LoginUser = lu2
            };
            iFeedBackRepository.SaveOrUpdate(fb3);

            fb3.ChildFeedBacks.Add(fb4);
            iFeedBackRepository.SaveOrUpdate(fb3);





            List<DataFilter> filterList = new List<DataFilter>();
            List<DataFilter> loginUserList = new List<DataFilter>();
            List<DataFilter> systemUserList = new List<DataFilter>();
            
            filterList.Add(new DataFilter()
            {
                type = "ParentFeedBack",
                value = null

            });
            
            ////验证 LoginName的2表查询
            //loginUserList.Add(new DataFilter()
            //{
            //    type = "LoginName",
            //    value = loginName2

            //});
            //filterList.Add(new DataFilter()
            //{
            //    type = "LoginUser",
            //    field = loginUserList

            //});

            //FeedBack fb = iFeedBackRepository.Search(filterList).FirstOrDefault();

            //Assert.IsTrue(fb.LoginUser.LoginName == loginName2, string.Format("Mess1发送者名字实际结果：{0}与期望结果{1}不一致", fb.LoginUser.LoginName, loginName2));

            //验证Name的3表查询

            systemUserList.Add(new DataFilter()
            {
                type = "Name",
                value = sysName

            });
            loginUserList.Add(new DataFilter()
            {
                type = "SystemUser",
                field = systemUserList

            });
            filterList.Add(new DataFilter()
            {
                type = "LoginUser",
                field = loginUserList

            });


            FeedBack fbk = iFeedBackRepository.Search(filterList).FirstOrDefault();

            Assert.IsTrue(fbk.LoginUser.SystemUser.Name == sysName, string.Format("Mess1发送者名字实际结果：{0}与期望结果{1}不一致", fbk.LoginUser.SystemUser.Name, sysName));

        }

     
    }
}

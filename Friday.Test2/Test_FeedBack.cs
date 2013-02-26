﻿using System;
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
    public class Test_FeedBack
    {
        [Test]
        public void Test()
        {
            IRepository<FeedBack> iFeedBackRepository = UnityHelper.UnityToT<IRepository<FeedBack>>();
            IRepository<SystemUser> iSystemUserRepository = UnityHelper.UnityToT<IRepository<SystemUser>>();
            IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>(); 
            IList<FeedBack> iFeedBacks = new List<FeedBack>();

            SystemUser su = new SystemUser()
            {
                Tel = "13966666666",
                Description = "erhuan30",
                Email = "ocam30@163.com",
                EntityIndex = 30,
                Name = "张国立",
                IsAnonymous = false

            };

            LoginUser lu = new LoginUser()
            {
                LoginName = "张国立",
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
                Name = "孙红雷",
                IsAnonymous = false

            };

            LoginUser lu2 = new LoginUser()
            {
                LoginName = "孙红雷",
                Password = "book001",
                IsAdmin = false,
                UserType = UserTypeEnum.顾客,
                SystemUser = su
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








            FeedBack fb = iFeedBackRepository.Search(filterList).FirstOrDefault();

            Assert.IsTrue(r.FromLoginUser.LoginName == lu1.LoginName, string.Format("Mess1发送者名字实际结果：{0}与期望结果{1}不一致", r.FromLoginUser.LoginName, lu1.LoginName));
      

        }

     
    }
}

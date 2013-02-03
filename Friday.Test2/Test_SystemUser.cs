using System;
using System.Collections.Generic;
using System.Text;
using Gallio.Framework;
using NUnit.Framework;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.EnumType;

namespace Friday.Test2
{
    [TestFixture]
    public class Test_SystemUser
    {
        [Test]
        public void Test()
        {
            IRepository<SystemUser> iSystemUserRepository = UnityHelper.UnityToT<IRepository<SystemUser>>();
            IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>(); 
            IList<SystemUser> iSystemUsers = new List<SystemUser>();

            SystemUser s1 = new SystemUser()
            {
                 Tel="13988888888", Description="erhuan10", Email="ocam10@163.com", EntityIndex=10, Name="zhang",IsAnonymous =false

            };
            iSystemUsers.Add(s1);
            SystemUser s2 = new SystemUser()
            {
                Tel = "13977777777", Description = "erhuan20",Email = "ocam20@163.com",EntityIndex = 20,Name = "wang",IsAnonymous =false
            };
            iSystemUsers.Add(s2);
            SystemUser s3 = new SystemUser()
            {
                Tel = "13966666666",Description = "erhuan30",Email = "ocam30@163.com",EntityIndex = 30,Name = "pang",IsAnonymous =false

            };
            iSystemUsers.Add(s3);
            foreach (SystemUser a in iSystemUsers)
            {
                iSystemUserRepository.SaveOrUpdate(a);
            }

            LoginUser lu1 = new LoginUser()
            {
                LoginName = "book001",
                Password = "book001",
                IsAdmin = false,
                UserType = UserType.顾客,
                SystemUser = s1
            };
            iLoginUserRepository.SaveOrUpdate(lu1);

            LoginUser lu2 = new LoginUser()
            {
                LoginName = "book002",
                Password = "book002",
                IsAdmin = false,
                UserType = UserType.顾客,
                SystemUser = s2
            };
            iLoginUserRepository.SaveOrUpdate(lu2);

            LoginUser lu3 = new LoginUser()
            {
                LoginName = "book003",
                Password = "book003",
                IsAdmin = false,
                UserType = UserType.顾客,
                SystemUser = s3
            };
            iLoginUserRepository.SaveOrUpdate(lu3);
        }

    }
}

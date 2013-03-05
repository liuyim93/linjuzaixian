using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NUnit.Framework;
using friday.core.services;
using friday.core;
using System.Transactions;
using friday.core.repositories;
using friday.core.domain;
using friday.core.components;

namespace Friday.Test2
{
    [TestFixture]
    public class Test_Permission
    {
        private TransactionScope scope;
        [SetUp]
        public void SetUp()
        {
            scope = new TransactionScope();
        }

        [TearDown]
        public void TearDown()
        {
            scope.Dispose();
        }
        [Test]
        public void Test_SystemFunctionObject_Permission()
        {
            ISystemFunctionObjectService iSystemFunctionObjectService = UnityHelper.UnityToT<ISystemFunctionObjectService>();
            iSystemFunctionObjectService.Generate();
            string xiaoerid = Guid.NewGuid().ToString();
            string xiaoername = xiaoerid.GetHashCode().ToString();
            LoginUser loginUser = new LoginUser(xiaoerid)
            {
                IsAdmin = false,
                LoginName = xiaoername,
                Password = xiaoername,
            };
            IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>();
            iLoginUserRepository.SaveOrUpdate(loginUser);
            string roleid = Guid.NewGuid().ToString();
            string rolename = roleid.GetHashCode().ToString();
            SystemRole systemRole = new SystemRole(roleid)
            {
                Name = rolename
            };

            IRepository<SystemRole> iSystemRoleRepository = UnityHelper.UnityToT<IRepository<SystemRole>>();
            iSystemRoleRepository.SaveOrUpdate(systemRole);

            UserInRole userInRole = new UserInRole()
            {
                LoginUser = loginUser,
                SystemRole = systemRole
            };
            IRepository<UserInRole> iUserInRoleRepository = UnityHelper.UnityToT<IRepository<UserInRole>>();
            iUserInRoleRepository.SaveOrUpdate(userInRole);

            ISystemFunctionObjectRepository iSystemFunctionObjectRepository = UnityHelper.UnityToT<ISystemFunctionObjectRepository>();
            var parentid = iSystemFunctionObjectRepository.GetChildrenFromParentID(null).FirstOrDefault().Id;
            var systemFunctionObject = iSystemFunctionObjectRepository.GetChildrenFromParentID(parentid).FirstOrDefault();
            ISystemFunctionObjectInRoleRepository iSystemFunctionObjectInRoleRepository = UnityHelper.UnityToT<ISystemFunctionObjectInRoleRepository>();
            //2013-02-26 basilwang may need set enabled editable deletable based on SystemFunctionObject
            SystemFunctionObjectInRole systemFunctionObjectInRole = new SystemFunctionObjectInRole()
            {
                SystemRole = systemRole,
                SystemFunctionObject = systemFunctionObject,
                Enabled = true,
                Editable = true,
                Deletable = false,
            };
            //string function=systemFunctionObject.FunctionObjectName;
            string tagName = systemFunctionObject.PermissonTag;
            iSystemFunctionObjectInRoleRepository.SaveOrUpdate(systemFunctionObjectInRole);
            IPermissionManager iPermissionManager = UnityHelper.UnityToT<IPermissionManager>();
            iPermissionManager.RefreshRolePermission();
            iPermissionManager.RefreshUserInRole();
            Assert.IsTrue(iPermissionManager.HasRight(tagName, xiaoerid), "用户" + xiaoername + "应该有" + tagName + "的enable权限");
            Assert.IsTrue(iPermissionManager.HasRight(tagName, xiaoerid, PermissionTag.Edit), "用户" + xiaoername + "应该有" + tagName + "的edit权限");
            Assert.IsFalse(iPermissionManager.HasRight(tagName, xiaoerid, PermissionTag.Delete), "用户" + xiaoername + "应该没有" + tagName + "的delete权限");
        }

    }
}

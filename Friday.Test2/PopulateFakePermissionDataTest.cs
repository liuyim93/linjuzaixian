using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using friday.core;
using friday.core.domain;
using NHibernate;
using friday.core.services;
using friday.core.components;
using friday.core.repositories;
using friday.core.EnumType;
namespace Friday.Test2
{

   [TestFixture]
    public class PopulateFakePermissionDataTest
    {
       private List<SystemUser> systemUserList = new List<SystemUser>();
       private List<LoginUser> loginUserList = new List<LoginUser>();
       private List<SystemRole> systemRoleList = new List<SystemRole>();
     
       private readonly int SYSTEM_ROLE_COUNT = 20;
       private readonly int RANDOM_SYSTEM_ROLE_SEED = 30;

       [SetUp]
        public void init()
        {

            add_Random_SystemRoles();

            ISystemFunctionObjectService iSystemFunctionObjectService = UnityHelper.UnityToT<ISystemFunctionObjectService>();
            iSystemFunctionObjectService.Generate();

           
        }
       private void add_Random_SystemRoles()
       {
           IRepository<SystemRole> iSystemRoleRepository = UnityHelper.UnityToT<IRepository<SystemRole>>();
           for (int i = 0; i < SYSTEM_ROLE_COUNT; i++)
           {
               SystemRole systemRole = new SystemRole()
               {
                   Name = "role" + get_random_number_with_fixed_width(5)
               };


               iSystemRoleRepository.SaveOrUpdate(systemRole);
           }

       }
       private String get_random_number_with_fixed_width(int width)
       {
           int x = new Random().Next(Convert.ToInt32(String.Empty.PadRight(width, '9')));
           return x.ToString().PadLeft(width, '0');

       }
       [Test]
       public void Test_Permission()
       {
           string xiaoerid = Guid.NewGuid().ToString();
           string xiaoername = xiaoerid.GetHashCode().ToString();
           LoginUser loginUser = new LoginUser(xiaoerid)
           {
               IsAdmin = false,
               LoginName = xiaoername,
               Password =  xiaoername,
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
               Role = systemRole
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
               Role = systemRole,
               SystemFunctionObject = systemFunctionObject,
               Enabled=true,
               Editable=true,
               Deletable=false, 
           };
           //string function=systemFunctionObject.FunctionObjectName;
           string tagName = systemFunctionObject.PermissonTag;
           iSystemFunctionObjectInRoleRepository.SaveOrUpdate(systemFunctionObjectInRole);
           IPermissionManager iPermissionManager = UnityHelper.UnityToT<IPermissionManager>();
           iPermissionManager.RefreshRolePermission();
           iPermissionManager.RefreshUserInRole();
           Assert.IsTrue(iPermissionManager.HasRight(new FunctionTag(){
               TagName = tagName
           }, xiaoerid), "用户" + xiaoername + "应该有" + tagName + "的enable权限");
           Assert.IsTrue(iPermissionManager.HasRight(new FunctionTag()
           {
               TagName = tagName
           }, xiaoerid, PermissionTag.Edit), "用户" + xiaoername + "应该有" + tagName + "的edit权限");
           Assert.IsFalse(iPermissionManager.HasRight(new FunctionTag()
           {
               TagName = tagName
           }, xiaoerid, PermissionTag.Delete), "用户" + xiaoername + "应该没有" + tagName + "的delete权限"); 
       }

    }
}

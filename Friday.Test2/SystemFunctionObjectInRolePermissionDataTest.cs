using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using friday.core.domain;
using friday.core;
using NUnit.Framework;
using friday.core.services;
using friday.core.repositories;
using friday.core.components;

namespace Friday.Test2
{
    [TestClass]
    public class SystemFunctionObjectInRolePermissionDataTest
    {  
        //每个角色拥有的特点权限的功能点,需要根据实际情况维护
        private IList<SystemFunctionObject> adminMenuCheckList = new List<SystemFunctionObject>();
        private IList<SystemFunctionObject> customerMenuCheckList = new List<SystemFunctionObject>();
        private IList<SystemFunctionObject> shopOwnerMenuCheckList = new List<SystemFunctionObject>();
        private IList<SystemFunctionObject> restaruantOwnerMenuCheckList = new List<SystemFunctionObject>();
        private IList<SystemFunctionObject> rentOwnerMenuCheckList = new List<SystemFunctionObject>();
        private IList<SystemFunctionObject> shopMemberMenuCheckList = new List<SystemFunctionObject>();
        private IList<SystemFunctionObject> restaurantMemberMenuCheckList = new List<SystemFunctionObject>();
        private IList<SystemFunctionObject> rentMemberMenuCheckList = new List<SystemFunctionObject>();
       
        private List<SystemRole> systemRoleList = new List<SystemRole>();

        [SetUp]
        public void init()
        {
            //添加角色
            add_Random_SystemRoles();
            //初始化功能键
            ISystemFunctionObjectService iSystemFunctionObjectService = UnityHelper.UnityToT<ISystemFunctionObjectService>();
            iSystemFunctionObjectService.Generate();
            //添加关联
            add_ObjectInRole();
        }

        //添加角色
        private void add_Random_SystemRoles()
        {
            IRepository<SystemRole> iSystemRoleRepository = UnityHelper.UnityToT<IRepository<SystemRole>>();

            SystemRole admin = new SystemRole()
            {
                Name = "管理员",
            };
            iSystemRoleRepository.SaveOrUpdate(admin);

            SystemRole customer = new SystemRole()
            {
                Name = "顾客",
            };
            iSystemRoleRepository.SaveOrUpdate(customer);

            SystemRole shopOwner = new SystemRole()
            {
                Name = "商店店主",
            };
            iSystemRoleRepository.SaveOrUpdate(shopOwner);

            SystemRole restaruantOwner = new SystemRole()
            {
                Name = "餐馆店主",
            };
            iSystemRoleRepository.SaveOrUpdate(restaruantOwner);

            SystemRole rentOwner = new SystemRole()
            {
                Name = "租房店主",
            };
            iSystemRoleRepository.SaveOrUpdate(rentOwner);

            SystemRole shopMember = new SystemRole()
            {
                Name = "商店店小二",
            };
            iSystemRoleRepository.SaveOrUpdate(shopMember);

            SystemRole restaurantMember = new SystemRole()
            {
                Name = "餐馆店小二",
            };
            iSystemRoleRepository.SaveOrUpdate(restaurantMember);

            SystemRole rentMember = new SystemRole()
            {
                Name = "租房店小二",
            };
            iSystemRoleRepository.SaveOrUpdate(rentMember);
        }


        //角色和功能点的关联
        private void add_ObjectInRole()
        {
            IRepository<SystemFunctionObjectInRole> iSystemFunctionObjectInRoleRepository = UnityHelper.UnityToT<IRepository<SystemFunctionObjectInRole>>();
            IRepository<SystemFunctionObject> iSystemFunctionObjectRepository = UnityHelper.UnityToT<IRepository<SystemFunctionObject>>();

            //添加管理员控制的所有功能键对象
            adminMenuCheckList = iSystemFunctionObjectRepository.GetAll();

             List<DataFilter> customerFilterList = new List<DataFilter>();
               customerFilterList.Add(new DataFilter()
                {
                    type = "FunctionObjectName",
                    value="基本信息"
                });
               customerFilterList.Add(new DataFilter()
                {
                    type = "FunctionObjectName",
                    value="顾客账号维护"
                });

            //添加客户的功能键列表
            customerMenuCheckList = iSystemFunctionObjectRepository.Search(filterList);



            foreach (SystemRole sr in systemRoleList)
            {
                switch (sr.Name)
                {
                    case "管理员":
                        {
                            foreach (SystemFunctionObject adminsfb in adminMenuCheckList)
                            {
                                SystemFunctionObjectInRole adminSFunctionInRole = new SystemFunctionObjectInRole();
                                adminSFunctionInRole.Role = sr;
                                adminSFunctionInRole.SystemFunctionObject = adminsfb;
                                adminSFunctionInRole.Deletable = adminsfb.DeletePermissionAvailable;
                                adminSFunctionInRole.Editable = adminsfb.EditPermissionAvailable;
                                adminSFunctionInRole.Enabled = adminsfb.FunctionAvailable;
                                iSystemFunctionObjectInRoleRepository.SaveOrUpdate(adminSFunctionInRole);
                            }
                            break;
                        }
                    case "顾客":
                        {
                            foreach (SystemFunctionObject customersfb in customerMenuCheckList)
                            {
                                SystemFunctionObjectInRole customerSFunctionInRole = new SystemFunctionObjectInRole();
                                customerSFunctionInRole.Role = sr;
                                customerSFunctionInRole.SystemFunctionObject = customersfb;
                                customerSFunctionInRole.Deletable = customersfb.DeletePermissionAvailable;
                                customerSFunctionInRole.Editable = customersfb.EditPermissionAvailable;
                                customerSFunctionInRole.Enabled = customersfb.FunctionAvailable;
                                iSystemFunctionObjectInRoleRepository.SaveOrUpdate(customerSFunctionInRole);
                            }
                            break;
                        }
                    //case "商店":
                    //    {
                    //        foreach (SystemMenu sm in shopOwnerMenuCheckList)
                    //        {
                    //            RoleInMenu roleInMenu = new RoleInMenu();
                    //            roleInMenu.Menu = sm;
                    //            roleInMenu.Role = sr;
                    //            iRoleInMenuRepository.SaveOrUpdate(roleInMenu);
                    //        }
                    //        break;
                    //    }
                    //case "餐馆":
                    //    {
                    //        foreach (SystemMenu sm in restaruantOwnerMenuCheckList)
                    //        {
                    //            RoleInMenu roleInMenu = new RoleInMenu();
                    //            roleInMenu.Menu = sm;
                    //            roleInMenu.Role = sr;
                    //            iRoleInMenuRepository.SaveOrUpdate(roleInMenu);
                    //        }
                    //        break;
                    //    }
                    //case "租房":
                    //    {
                    //        foreach (SystemMenu sm in rentOwnerMenuCheckList)
                    //        {
                    //            RoleInMenu roleInMenu = new RoleInMenu();
                    //            roleInMenu.Menu = sm;
                    //            roleInMenu.Role = sr;
                    //            iRoleInMenuRepository.SaveOrUpdate(roleInMenu);
                    //        }
                    //        break;
                    //    }
                    //case "商铺店小二":
                    //    {
                    //        foreach (SystemMenu sm in shopMemberMenuCheckList)
                    //        {
                    //            RoleInMenu roleInMenu = new RoleInMenu();
                    //            roleInMenu.Menu = sm;
                    //            roleInMenu.Role = sr;
                    //            iRoleInMenuRepository.SaveOrUpdate(roleInMenu);
                    //        }
                    //        break;
                    //    }
                    //case "餐馆店小二":
                    //    {
                    //        foreach (SystemMenu sm in restaurantMemberMenuCheckList)
                    //        {
                    //            RoleInMenu roleInMenu = new RoleInMenu();
                    //            roleInMenu.Menu = sm;
                    //            roleInMenu.Role = sr;
                    //            iRoleInMenuRepository.SaveOrUpdate(roleInMenu);
                    //        }
                    //        break;
                    //    }
                    //case "租房店小二":
                    //    {
                    //        foreach (SystemMenu sm in rentMemberMenuCheckList)
                    //        {
                    //            RoleInMenu roleInMenu = new RoleInMenu();
                    //            roleInMenu.Menu = sm;
                    //            roleInMenu.Role = sr;
                    //            iRoleInMenuRepository.SaveOrUpdate(roleInMenu);
                    //        }
                    //        break;
                    //    }
                }
            }
        }
    }
}

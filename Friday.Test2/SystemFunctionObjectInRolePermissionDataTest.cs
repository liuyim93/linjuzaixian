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
        ISystemRoleRepository iSystemRoleRepository = UnityHelper.UnityToT<ISystemRoleRepository>();

        private IList<SystemRole> systemRoleList = new List<SystemRole>();

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
            ISystemFunctionObjectRepository iSystemFunctionObjectRepository = UnityHelper.UnityToT<ISystemFunctionObjectRepository>();

            systemRoleList = iSystemRoleRepository.GetAll();

            IList<SystemFunctionObject> customerList = new List<SystemFunctionObject>();
            //添加管理员控制的所有功能键对象
            adminMenuCheckList = iSystemFunctionObjectRepository.GetAll();

            string[] customerArr = { "基本信息", "顾客账号维护" };
            foreach (var i in customerArr) 
            {            
            List<DataFilter> customerFilterList = new List<DataFilter>();
            //对于Customer 取值 FunctionObjectName： 基本信息 or 顾客账号维护          
            customerFilterList.Add(new DataFilter()
             {
                 type = "FunctionObjectName",
                 value = i
             });   
            //添加客户的功能键列表
            customerMenuCheckList = iSystemFunctionObjectRepository.Search(customerFilterList);
              foreach (var j in customerMenuCheckList) 
               {
                   customerList.Add(j);
                }                
            }

            IList<SystemFunctionObject> shopOwnerList = new List<SystemFunctionObject>();
            string[] shopArr = { "基本信息", "商店管理", "商店维护", "商品维护", "商品订单维护", "商品订单明细维护" };
            foreach (var i in shopArr)
            {
                List<DataFilter> shopFilterList = new List<DataFilter>();
                shopFilterList.Add(new DataFilter()
                {
                    type = "FunctionObjectName",
                    value = i
                });
                shopOwnerMenuCheckList = iSystemFunctionObjectRepository.Search(shopFilterList);
                foreach (var j in shopOwnerMenuCheckList)
                {
                    shopOwnerList.Add(j);
                }
            }

            IList<SystemFunctionObject> shopEmpList = new List<SystemFunctionObject>();
            string[] shopEmpArr = { "基本信息", "商店管理", "商品维护", "商品订单维护", "商品订单明细维护" };
            foreach (var i in shopArr)
            {
                List<DataFilter> shopEmpFilterList = new List<DataFilter>();
                shopEmpFilterList.Add(new DataFilter()
                {
                    type = "FunctionObjectName",
                    value = i
                });
                shopMemberMenuCheckList = iSystemFunctionObjectRepository.Search(shopEmpFilterList);
                foreach (var j in shopMemberMenuCheckList)
                {
                    shopEmpList.Add(j);
                }
            }

            IList<SystemFunctionObject> restaurantList = new List<SystemFunctionObject>();
            string[] restaurantArr = { "基本信息", "餐馆管理", "餐馆维护", "菜品维护", "食品订单维护", "食品订单明细维护" };
            foreach (var i in restaurantArr)
            {
                List<DataFilter> restaurantFilterList = new List<DataFilter>();
                restaurantFilterList.Add(new DataFilter()
                {
                    type = "FunctionObjectName",
                    value = i
                });
                restaruantOwnerMenuCheckList = iSystemFunctionObjectRepository.Search(restaurantFilterList);
                foreach (var j in restaruantOwnerMenuCheckList)
                {
                    restaurantList.Add(j);
                }
            }

            IList<SystemFunctionObject> restaurantEmpList = new List<SystemFunctionObject>();
            string[] restaurantEmpArr = { "基本信息", "餐馆维护", "菜品维护", "食品订单维护", "食品订单明细维护" };
            foreach (var i in restaurantEmpArr)
            {
                List<DataFilter> restaurantEmpFilterList = new List<DataFilter>();
                restaurantEmpFilterList.Add(new DataFilter()
                {
                    type = "FunctionObjectName",
                    value = i
                });
                restaurantMemberMenuCheckList = iSystemFunctionObjectRepository.Search(restaurantEmpFilterList);
                foreach (var j in restaurantMemberMenuCheckList)
                {
                    restaurantEmpList.Add(j);
                }
            }

            IList<SystemFunctionObject> rentList = new List<SystemFunctionObject>();
            string[] rentArr = { "基本信息", "租房管理", "租房维护", "房屋维护", "租房订单维护", "租房订单明细维护" };
            foreach (var i in rentArr)
            {
                List<DataFilter> rentFilterList = new List<DataFilter>();
                rentFilterList.Add(new DataFilter()
                {
                    type = "FunctionObjectName",
                    value = i
                });
                rentOwnerMenuCheckList = iSystemFunctionObjectRepository.Search(rentFilterList);
                foreach (var j in rentOwnerMenuCheckList)
                {
                    rentList.Add(j);
                }
            }

            IList<SystemFunctionObject> rentEmpList = new List<SystemFunctionObject>();
            string[] rentEmpArr = { "基本信息", "租房管理", "房屋维护", "租房订单维护", "租房订单明细维护" };
            foreach (var i in rentEmpArr)
            {
                List<DataFilter> rentEmpFilterList = new List<DataFilter>();
                rentEmpFilterList.Add(new DataFilter()
                {
                    type = "FunctionObjectName",
                    value = i
                });
                rentMemberMenuCheckList = iSystemFunctionObjectRepository.Search(rentEmpFilterList);
                foreach (var j in rentMemberMenuCheckList)
                {
                    rentEmpList.Add(j);
                }
            }

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
                            foreach (SystemFunctionObject customersfb in customerList)
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
                    case "商店":
                        {
                            foreach (SystemFunctionObject shopsfb in shopOwnerList)
                            {
                                SystemFunctionObjectInRole shopSFunctionInRole = new SystemFunctionObjectInRole();
                                shopSFunctionInRole.Role = sr;
                                shopSFunctionInRole.SystemFunctionObject = shopsfb;
                                shopSFunctionInRole.Deletable = shopsfb.DeletePermissionAvailable;
                                shopSFunctionInRole.Editable = shopsfb.EditPermissionAvailable;
                                shopSFunctionInRole.Enabled = shopsfb.FunctionAvailable;
                                iSystemFunctionObjectInRoleRepository.SaveOrUpdate(shopSFunctionInRole);
                            }
                            break;
                        }
                    case "餐馆":
                        {
                            foreach (SystemFunctionObject restaurantsfb in restaurantList)
                            {
                                SystemFunctionObjectInRole restaurantSFunctionInRole = new SystemFunctionObjectInRole();
                                restaurantSFunctionInRole.Role = sr;
                                restaurantSFunctionInRole.SystemFunctionObject = restaurantsfb;
                                restaurantSFunctionInRole.Deletable = restaurantsfb.DeletePermissionAvailable;
                                restaurantSFunctionInRole.Editable = restaurantsfb.EditPermissionAvailable;
                                restaurantSFunctionInRole.Enabled = restaurantsfb.FunctionAvailable;
                                iSystemFunctionObjectInRoleRepository.SaveOrUpdate(restaurantSFunctionInRole);
                            }
                            break;
                        }
                    case "租房":
                        {
                            foreach (SystemFunctionObject rentsfb in rentList)
                            {
                                SystemFunctionObjectInRole rentSFunctionInRole = new SystemFunctionObjectInRole();
                                rentSFunctionInRole.Role = sr;
                                rentSFunctionInRole.SystemFunctionObject = rentsfb;
                                rentSFunctionInRole.Deletable = rentsfb.DeletePermissionAvailable;
                                rentSFunctionInRole.Editable = rentsfb.EditPermissionAvailable;
                                rentSFunctionInRole.Enabled = rentsfb.FunctionAvailable;
                                iSystemFunctionObjectInRoleRepository.SaveOrUpdate(rentSFunctionInRole);
                            }
                            break;
                        }
                    case "商铺店小二":
                        {
                            foreach (SystemFunctionObject shopEmpsfb in shopEmpList)
                            {
                                SystemFunctionObjectInRole shopEmpSFunctionInRole = new SystemFunctionObjectInRole();
                                shopEmpSFunctionInRole.Role = sr;
                                shopEmpSFunctionInRole.SystemFunctionObject = shopEmpsfb;
                                shopEmpSFunctionInRole.Deletable = shopEmpsfb.DeletePermissionAvailable;
                                shopEmpSFunctionInRole.Editable = shopEmpsfb.EditPermissionAvailable;
                                shopEmpSFunctionInRole.Enabled = shopEmpsfb.FunctionAvailable;
                                iSystemFunctionObjectInRoleRepository.SaveOrUpdate(shopEmpSFunctionInRole);
                            }
                            break;
                        }
                    case "餐馆店小二":
                        {
                            foreach (SystemFunctionObject restaurantEmpsfb in restaurantEmpList)
                            {
                                SystemFunctionObjectInRole restaurantEmpSFunctionInRole = new SystemFunctionObjectInRole();
                                restaurantEmpSFunctionInRole.Role = sr;
                                restaurantEmpSFunctionInRole.SystemFunctionObject = restaurantEmpsfb;
                                restaurantEmpSFunctionInRole.Deletable = restaurantEmpsfb.DeletePermissionAvailable;
                                restaurantEmpSFunctionInRole.Editable = restaurantEmpsfb.EditPermissionAvailable;
                                restaurantEmpSFunctionInRole.Enabled = restaurantEmpsfb.FunctionAvailable;
                                iSystemFunctionObjectInRoleRepository.SaveOrUpdate(restaurantEmpSFunctionInRole);
                            }
                            break;
                        }
                    case "租房店小二":
                        {
                            foreach (SystemFunctionObject rentEmpsfb in rentEmpList)
                            {
                                SystemFunctionObjectInRole rentEmpSFunctionInRole = new SystemFunctionObjectInRole();
                                rentEmpSFunctionInRole.Role = sr;
                                rentEmpSFunctionInRole.SystemFunctionObject = rentEmpsfb;
                                rentEmpSFunctionInRole.Deletable = rentEmpsfb.DeletePermissionAvailable;
                                rentEmpSFunctionInRole.Editable = rentEmpsfb.EditPermissionAvailable;
                                rentEmpSFunctionInRole.Enabled = rentEmpsfb.FunctionAvailable;
                                iSystemFunctionObjectInRoleRepository.SaveOrUpdate(rentEmpSFunctionInRole);
                            }
                            break;
                        }
                }
            }
        }
    }
}

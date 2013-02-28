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

namespace Friday.Test2
{
    [TestClass]
    public class RoleInMenuPermissionDataTest
    {
        //每个角色拥有的菜单权限,需要根据实际情况维护
        private List<SystemMenu> adminMenuCheckList = new List<SystemMenu>();
        private List<SystemMenu> customerMenuCheckList = new List<SystemMenu>();
        private List<SystemMenu> shopOwnerMenuCheckList = new List<SystemMenu>();
        private List<SystemMenu> restaruantOwnerMenuCheckList = new List<SystemMenu>();
        private List<SystemMenu> rentOwnerMenuCheckList = new List<SystemMenu>();
        private List<SystemMenu> shopMemberMenuCheckList = new List<SystemMenu>();
        private List<SystemMenu> restaurantMemberMenuCheckList = new List<SystemMenu>();
        private List<SystemMenu> rentMemberMenuCheckList = new List<SystemMenu>();

        private List<SystemRole> systemRoleList = new List<SystemRole>();

        [SetUp]
        public void init()
        {
            //添加角色和admin账号
            add_Random_SystemRoles();
            //添加菜单
            add_Random_SystemMenus();
            //添加关联
            add_Random_RoleInMenus();
            
        }

        //添加角色
        private void add_Random_SystemRoles()
        {
            IRepository<SystemRole> iSystemRoleRepository = UnityHelper.UnityToT<IRepository<SystemRole>>();
            IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>();
            IRepository<UserInRole> iUserInRoleRepository = UnityHelper.UnityToT<IRepository<UserInRole>>();

            SystemRole admin = new SystemRole()
            {
                Name = "管理员",
            };
            iSystemRoleRepository.SaveOrUpdate(admin);

            //添加管理员admin
            LoginUser adminLoginUser = new LoginUser()
            {
                LoginName = "admin",
                Password = "admin",
                IsAdmin = true
            };
            iLoginUserRepository.SaveOrUpdate(adminLoginUser);

            UserInRole userInRole = new UserInRole()
            {
                LoginUser = adminLoginUser,
                SystemRole = admin
            };
            iUserInRoleRepository.SaveOrUpdate(userInRole);

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

        //添加菜单
        private void add_Random_SystemMenus()
        {
            IRepository<SystemMenu> iSystemMenuRepository = UnityHelper.UnityToT<IRepository<SystemMenu>>();

            //餐馆模块
            SystemMenu restaurantModel = new SystemMenu()
            {
                Name = "餐馆模块",
                Leaf = false,
                ParentID = null,
                TLevel = 0,
                ColIndex = 1

            };
            iSystemMenuRepository.SaveOrUpdate(restaurantModel);
            adminMenuCheckList.Add(restaurantModel);

            SystemMenu restaurantMange = new SystemMenu()
            {
                Name = "餐馆管理",
                Leaf = true,
                ParentID = restaurantModel.Id,
                MenuRoute = "restaurant/pRestaurantList.aspx",
                TLevel = 1,
                ColIndex = 1
            };
            iSystemMenuRepository.SaveOrUpdate(restaurantMange);
            adminMenuCheckList.Add(restaurantMange);

            SystemMenu foodOrderDetail = new SystemMenu()
            {
                Name = "订单明细管理",
                Leaf = true,
                ParentID = restaurantModel.Id,
                MenuRoute = "myFoodOrder/pMyFoodOrderList.aspx",
                TLevel = 1,
                ColIndex = 2
            };
            iSystemMenuRepository.SaveOrUpdate(foodOrderDetail);
            adminMenuCheckList.Add(foodOrderDetail);

            SystemMenu foodOrder = new SystemMenu()
            {
                Name = "食品订单管理",
                Leaf = true,
                ParentID = restaurantModel.Id,
                MenuRoute = "myFoodOrder/pMyFoodOrderList.aspx",
                TLevel = 1,
                ColIndex = 3
            };
            iSystemMenuRepository.SaveOrUpdate(foodOrder);
            adminMenuCheckList.Add(foodOrder);

            SystemMenu food = new SystemMenu()
            {
                Name = "菜品管理",
                Leaf = true,
                ParentID = restaurantModel.Id,
                MenuRoute = "restaurant/pRestaurantList.aspx",
                TLevel = 1,
                ColIndex = 4
            };
            iSystemMenuRepository.SaveOrUpdate(food);
            adminMenuCheckList.Add(food);

            //基本信息模块
            SystemMenu baseInfo = new SystemMenu()
            {
                Name = "基本信息模块",
                Leaf = false,
                ParentID = null,
                TLevel = 0,
                ColIndex = 2

            };
            iSystemMenuRepository.SaveOrUpdate(baseInfo);
            adminMenuCheckList.Add(baseInfo);

            SystemMenu activity = new SystemMenu()
            {
                Name = "商家活动管理",
                Leaf = true,
                ParentID = baseInfo.Id,
                MenuRoute = "activity/pActivityList.aspx",
                TLevel = 1,
                ColIndex = 1
            };
            iSystemMenuRepository.SaveOrUpdate(activity);
            adminMenuCheckList.Add(activity);

            SystemMenu globalGoodsType = new SystemMenu()
            {
                Name = "公共商品类型管理",
                Leaf = true,
                ParentID = baseInfo.Id,
                MenuRoute = "globalGoodsType/pGlobalGoodsTypeList.aspx",
                TLevel = 1,
                ColIndex = 2
            };
            iSystemMenuRepository.SaveOrUpdate(globalGoodsType);
            adminMenuCheckList.Add(globalGoodsType);

            SystemMenu merchantGoodsType = new SystemMenu()
            {
                Name = "自定义商品类型",
                Leaf = true,
                ParentID = baseInfo.Id,
                MenuRoute = "merchantGoodsType/pMerchantGoodsTypeList.aspx",
                TLevel = 1,
                ColIndex = 3
            };
            iSystemMenuRepository.SaveOrUpdate(merchantGoodsType);
            adminMenuCheckList.Add(merchantGoodsType);

            SystemMenu roleMenu = new SystemMenu()
            {
                Name = "菜单管理",
                Leaf = true,
                ParentID = baseInfo.Id,
                MenuRoute = "roleMenu/pMenuButtonList.aspx",
                TLevel = 1,
                ColIndex = 4
            };
            iSystemMenuRepository.SaveOrUpdate(roleMenu);
            adminMenuCheckList.Add(roleMenu);

            SystemMenu systemUser = new SystemMenu()
            {
                Name = "顾客账号管理",
                Leaf = true,
                ParentID = baseInfo.Id,
                MenuRoute = "systemUser/pSystemUserList.aspx",
                TLevel = 1,
                ColIndex = 5
            };
            iSystemMenuRepository.SaveOrUpdate(systemUser);
            adminMenuCheckList.Add(systemUser);

            SystemMenu merchantMember = new SystemMenu()
            {
                Name = "员工管理",
                Leaf = true,
                ParentID = baseInfo.Id,
                MenuRoute = "loginUser/pLoginUserList.aspx",
                TLevel = 1,
                ColIndex = 6
            };
            iSystemMenuRepository.SaveOrUpdate(merchantMember);
            adminMenuCheckList.Add(merchantMember);

            SystemMenu loginUser = new SystemMenu()
            {
                Name = "商家账号管理",
                Leaf = true,
                ParentID = baseInfo.Id,
                MenuRoute = "loginUser/pLoginUserList.aspx",
                TLevel = 1,
                ColIndex = 7
            };
            iSystemMenuRepository.SaveOrUpdate(loginUser);
            adminMenuCheckList.Add(loginUser);

            SystemMenu systemRole = new SystemMenu()
            {
                Name = "角色权限管理",
                Leaf = true,
                ParentID = baseInfo.Id,
                MenuRoute = "systemRole/pSystemRoleList.aspx",
                TLevel = 1,
                ColIndex = 8
            };
            iSystemMenuRepository.SaveOrUpdate(systemRole);
            adminMenuCheckList.Add(systemRole);

            SystemMenu merchantCategory = new SystemMenu()
            {
                Name = "商铺经营类型管理",
                Leaf = true,
                ParentID = baseInfo.Id,
                MenuRoute = "merchantCategory/pMerchantCategoryList.aspx",
                TLevel = 1,
                ColIndex = 9
            };
            iSystemMenuRepository.SaveOrUpdate(merchantCategory);
            adminMenuCheckList.Add(merchantCategory);

            SystemMenu school = new SystemMenu()
            {
                Name = "学校信息管理",
                Leaf = true,
                ParentID = baseInfo.Id,
                MenuRoute = "school/pSchoolList.aspx",
                TLevel = 1,
                ColIndex = 10
            };
            iSystemMenuRepository.SaveOrUpdate(school);
            adminMenuCheckList.Add(school);

            //消息模块
            SystemMenu messageModel = new SystemMenu()
            {
                Name = "消息模块",
                Leaf = false,
                ParentID = null,
                TLevel = 0,
                ColIndex = 3

            };
            iSystemMenuRepository.SaveOrUpdate(messageModel);
            adminMenuCheckList.Add(messageModel);

            SystemMenu message = new SystemMenu()
            {
                Name = "消息管理",
                Leaf = true,
                ParentID = messageModel.Id,
                MenuRoute = "message/pMessageList.aspx",
                TLevel = 1,
                ColIndex = 1
            };
            iSystemMenuRepository.SaveOrUpdate(message);
            adminMenuCheckList.Add(message);

            //反馈模块
            SystemMenu feedBackModel = new SystemMenu()
            {
                Name = "反馈模块",
                Leaf = false,
                ParentID = null,
                TLevel = 0,
                ColIndex = 4

            };
            iSystemMenuRepository.SaveOrUpdate(feedBackModel);
            adminMenuCheckList.Add(feedBackModel);

            SystemMenu feedBack = new SystemMenu()
            {
                Name = "反馈管理",
                Leaf = true,
                ParentID = feedBackModel.Id,
                MenuRoute = "feedBack/pFeedBackList.aspx",
                TLevel = 1,
                ColIndex = 1
            };
            iSystemMenuRepository.SaveOrUpdate(feedBack);
            adminMenuCheckList.Add(feedBack);

            SystemMenu feedBackReply = new SystemMenu()
            {
                Name = "反馈回复",
                Leaf = true,
                ParentID = feedBackModel.Id,
                MenuRoute = "feedBack/pFeedBackList.aspx",
                TLevel = 1,
                ColIndex = 2
            };
            iSystemMenuRepository.SaveOrUpdate(feedBackReply);
            adminMenuCheckList.Add(feedBackReply);

            //租房模块
            SystemMenu rentModel = new SystemMenu()
            {
                Name = "租房模块",
                Leaf = false,
                ParentID = null,
                TLevel = 0,
                ColIndex = 5

            };
            iSystemMenuRepository.SaveOrUpdate(rentModel);
            adminMenuCheckList.Add(rentModel);

            SystemMenu rentMange = new SystemMenu()
            {
                Name = "租房管理",
                Leaf = true,
                ParentID = rentModel.Id,
                MenuRoute = "rent/pRentList.aspx",
                TLevel = 1,
                ColIndex = 1
            };
            iSystemMenuRepository.SaveOrUpdate(rentMange);
            adminMenuCheckList.Add(rentMange);

            SystemMenu houseOrderDetail = new SystemMenu()
            {
                Name = "订单明细管理",
                Leaf = true,
                ParentID = rentModel.Id,
                MenuRoute = "myHouseOrder/pMyHouseOrderList.aspx",
                TLevel = 1,
                ColIndex = 2
            };
            iSystemMenuRepository.SaveOrUpdate(houseOrderDetail);
            adminMenuCheckList.Add(houseOrderDetail);

            SystemMenu houseOrder = new SystemMenu()
            {
                Name = "租房订单管理",
                Leaf = true,
                ParentID = rentModel.Id,
                MenuRoute = "myHouseOrder/pMyHouseOrderList.aspx",
                TLevel = 1,
                ColIndex = 3
            };
            iSystemMenuRepository.SaveOrUpdate(houseOrder);
            adminMenuCheckList.Add(houseOrder);

            SystemMenu house = new SystemMenu()
            {
                Name = "房屋管理",
                Leaf = true,
                ParentID = rentModel.Id,
                MenuRoute = "rent/pRentList.aspx",
                TLevel = 1,
                ColIndex = 4
            };
            iSystemMenuRepository.SaveOrUpdate(house);
            adminMenuCheckList.Add(house);

            //商店模块
            SystemMenu shopModel = new SystemMenu()
            {
                Name = "商店模块",
                Leaf = false,
                ParentID = null,
                TLevel = 0,
                ColIndex = 6

            };
            iSystemMenuRepository.SaveOrUpdate(shopModel);
            adminMenuCheckList.Add(restaurantMange);

            SystemMenu shopMange = new SystemMenu()
            {
                Name = "商店管理",
                Leaf = true,
                ParentID = shopModel.Id,
                MenuRoute = "shop/pShopList.aspx",
                TLevel = 1,
                ColIndex = 1
            };
            iSystemMenuRepository.SaveOrUpdate(shopMange);
            adminMenuCheckList.Add(shopMange);

            SystemMenu commodityOrderDetail = new SystemMenu()
            {
                Name = "订单明细管理",
                Leaf = true,
                ParentID = shopModel.Id,
                MenuRoute = "myCommodityOrder/pMyCommodityOrderList.aspx",
                TLevel = 1,
                ColIndex = 2
            };
            iSystemMenuRepository.SaveOrUpdate(commodityOrderDetail);
            adminMenuCheckList.Add(commodityOrderDetail);

            SystemMenu commodityOrder = new SystemMenu()
            {
                Name = "商品订单管理",
                Leaf = true,
                ParentID = shopModel.Id,
                MenuRoute = "myCommodityOrder/pMyCommodityOrderList.aspx",
                TLevel = 1,
                ColIndex = 3
            };
            iSystemMenuRepository.SaveOrUpdate(commodityOrder);
            adminMenuCheckList.Add(commodityOrder);

            SystemMenu commodity = new SystemMenu()
            {
                Name = "商品管理",
                Leaf = true,
                ParentID = shopModel.Id,
                MenuRoute = "shop/pShopList.aspx",
                TLevel = 1,
                ColIndex = 4
            };
            iSystemMenuRepository.SaveOrUpdate(commodity);
            adminMenuCheckList.Add(commodity);

            //统计模块
            SystemMenu statisticModel = new SystemMenu()
            {
                Name = "统计模块",
                Leaf = false,
                ParentID = null,
                TLevel = 0,
                ColIndex = 7

            };
            iSystemMenuRepository.SaveOrUpdate(statisticModel);
            adminMenuCheckList.Add(statisticModel);

            SystemMenu inputData = new SystemMenu()
            {
                Name = "数据导入",
                Leaf = true,
                ParentID = statisticModel.Id,
                MenuRoute = "rent/pRentList.aspx",
                TLevel = 1,
                ColIndex = 1
            };
            iSystemMenuRepository.SaveOrUpdate(inputData);
            adminMenuCheckList.Add(inputData);

            SystemMenu dealBusiness = new SystemMenu()
            {
                Name = "业务受理",
                Leaf = true,
                ParentID = statisticModel.Id,
                MenuRoute = "rent/pRentList.aspx",
                TLevel = 1,
                ColIndex = 2
            };
            iSystemMenuRepository.SaveOrUpdate(dealBusiness);
            adminMenuCheckList.Add(dealBusiness);

            //日志模块
            SystemMenu logModel = new SystemMenu()
            {
                Name = "日志模块",
                Leaf = false,
                ParentID = null,
                TLevel = 0,
                ColIndex = 8

            };
            iSystemMenuRepository.SaveOrUpdate(logModel);
            adminMenuCheckList.Add(logModel);

            SystemMenu logManage = new SystemMenu()
            {
                Name = "日志管理",
                Leaf = true,
                ParentID = logModel.Id,
                MenuRoute = "log/pLogList.aspx",
                TLevel = 1,
                ColIndex = 1
            };
            iSystemMenuRepository.SaveOrUpdate(logManage);
            adminMenuCheckList.Add(logManage);
        }

        //角色和权限关联
        private void add_Random_RoleInMenus()
        {
            IRepository<RoleInMenu> iRoleInMenuRepository = UnityHelper.UnityToT<IRepository<RoleInMenu>>();
            IRepository<SystemRole> iSystemRoleRepository = UnityHelper.UnityToT<IRepository<SystemRole>>();
            IList<SystemRole> systemRoleList = iSystemRoleRepository.GetAll();

            foreach (SystemRole sr in systemRoleList)
            {
                switch (sr.Name)
                {
                    case "管理员":
                        {
                            foreach (SystemMenu sm in adminMenuCheckList)
                            {
                                RoleInMenu roleInMenu = new RoleInMenu();
                                roleInMenu.SystemMenu = sm;
                                roleInMenu.SystemRole = sr;
                                iRoleInMenuRepository.SaveOrUpdate(roleInMenu);
                            }
                            break;
                        }
                    case "顾客":
                        {
                            foreach (SystemMenu sm in customerMenuCheckList)
                            {
                                RoleInMenu roleInMenu = new RoleInMenu();
                                roleInMenu.SystemMenu = sm;
                                roleInMenu.SystemRole = sr;
                                iRoleInMenuRepository.SaveOrUpdate(roleInMenu);
                            }
                            break;
                        }
                    case "商店":
                        {
                            foreach (SystemMenu sm in shopOwnerMenuCheckList)
                            {
                                RoleInMenu roleInMenu = new RoleInMenu();
                                roleInMenu.SystemMenu = sm;
                                roleInMenu.SystemRole = sr;
                                iRoleInMenuRepository.SaveOrUpdate(roleInMenu);
                            }
                            break;
                        }
                    case "餐馆":
                        {
                            foreach (SystemMenu sm in restaruantOwnerMenuCheckList)
                            {
                                RoleInMenu roleInMenu = new RoleInMenu();
                                roleInMenu.SystemMenu = sm;
                                roleInMenu.SystemRole = sr;
                                iRoleInMenuRepository.SaveOrUpdate(roleInMenu);
                            }
                            break;
                        }
                    case "租房":
                        {
                            foreach (SystemMenu sm in rentOwnerMenuCheckList)
                            {
                                RoleInMenu roleInMenu = new RoleInMenu();
                                roleInMenu.SystemMenu = sm;
                                roleInMenu.SystemRole = sr;
                                iRoleInMenuRepository.SaveOrUpdate(roleInMenu);
                            }
                            break;
                        }
                    case "商铺店小二":
                        {
                            foreach (SystemMenu sm in shopMemberMenuCheckList)
                            {
                                RoleInMenu roleInMenu = new RoleInMenu();
                                roleInMenu.SystemMenu = sm;
                                roleInMenu.SystemRole = sr;
                                iRoleInMenuRepository.SaveOrUpdate(roleInMenu);
                            }
                            break;
                        }
                    case "餐馆店小二":
                        {
                            foreach (SystemMenu sm in restaurantMemberMenuCheckList)
                            {
                                RoleInMenu roleInMenu = new RoleInMenu();
                                roleInMenu.SystemMenu = sm;
                                roleInMenu.SystemRole = sr;
                                iRoleInMenuRepository.SaveOrUpdate(roleInMenu);
                            }
                            break;
                        }
                    case "租房店小二":
                        {
                            foreach (SystemMenu sm in rentMemberMenuCheckList)
                            {
                                RoleInMenu roleInMenu = new RoleInMenu();
                                roleInMenu.SystemMenu = sm;
                                roleInMenu.SystemRole = sr;
                                iRoleInMenuRepository.SaveOrUpdate(roleInMenu);
                            }
                            break;
                        }
                }
            }
        }
    }
}

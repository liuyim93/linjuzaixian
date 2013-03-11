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
    [TestFixture]
    public class PopulateRealPermissionDataTest
    {
        //每个角色拥有的菜单权限,需要根据实际情况维护
        private IList<SystemMenu> adminMenuCheckList = new List<SystemMenu>();
        private IList<SystemMenu> customerMenuCheckList = new List<SystemMenu>();
        private IList<SystemMenu> shopOwnerMenuCheckList = new List<SystemMenu>();
        private IList<SystemMenu> restaruantOwnerMenuCheckList = new List<SystemMenu>();
        private IList<SystemMenu> rentOwnerMenuCheckList = new List<SystemMenu>();
        private IList<SystemMenu> shopMemberMenuCheckList = new List<SystemMenu>();
        private IList<SystemMenu> restaurantMemberMenuCheckList = new List<SystemMenu>();
        private IList<SystemMenu> rentMemberMenuCheckList = new List<SystemMenu>();

        //每个角色拥有的特点权限的功能点,需要根据实际情况维护
        private IList<SystemFunctionObject> adminSFOCheckList = new List<SystemFunctionObject>();
        private IList<SystemFunctionObject> customerSFOCheckList = new List<SystemFunctionObject>();
        private IList<SystemFunctionObject> shopOwnerSFOCheckList = new List<SystemFunctionObject>();
        private IList<SystemFunctionObject> restaruantOwnerSFOCheckList = new List<SystemFunctionObject>();
        private IList<SystemFunctionObject> rentOwnerSFOCheckList = new List<SystemFunctionObject>();
        private IList<SystemFunctionObject> shopMemberSFOCheckList = new List<SystemFunctionObject>();
        private IList<SystemFunctionObject> restaurantMemberSFOCheckList = new List<SystemFunctionObject>();
        private IList<SystemFunctionObject> rentMemberSFOCheckList = new List<SystemFunctionObject>();
        ISystemRoleRepository iSystemRoleRepository = UnityHelper.UnityToT<ISystemRoleRepository>();

        private IList<SystemRole> systemRoleList = new List<SystemRole>();

        //private List<SystemRole> systemRoleList = new List<SystemRole>();

        [SetUp]
        public void init()
        {
            //添加角色和admin账号
            add_Random_SystemRoles();
            //添加菜单
            add_Random_SystemMenus();
            //添加关联
            add_Random_RoleInMenus();

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

            SystemMenu restaurantEditMange = new SystemMenu()
            {
                Name = "餐馆编辑管理",
                Leaf = true,
                ParentID = restaurantModel.Id,
                MenuRoute = "restaurant/pEditRestaurant.aspx",
                TLevel = 1,
                ColIndex = 5
            };
            iSystemMenuRepository.SaveOrUpdate(restaurantEditMange);

            SystemMenu valuingOfMyFoodOrder = new SystemMenu()
            {
                Name = "餐馆订单评价管理",
                Leaf = true,
                ParentID = restaurantModel.Id,
                MenuRoute = "valuingOfMyFoodOrder/pValuingOfMyFoodOrderList.aspx",
                TLevel = 1,
                ColIndex = 6
            };
            iSystemMenuRepository.SaveOrUpdate(valuingOfMyFoodOrder);
            adminMenuCheckList.Add(valuingOfMyFoodOrder);

            SystemMenu valuingItemOfMyFoodOrder = new SystemMenu()
            {
                Name = "食品评价项管理",
                Leaf = true,
                ParentID = restaurantModel.Id,
                MenuRoute = "valuingItemOfMyFoodOrder/pValuingItemOfMyFoodOrderList.aspx",
                TLevel = 1,
                ColIndex = 7
            };
            iSystemMenuRepository.SaveOrUpdate(valuingItemOfMyFoodOrder);
            adminMenuCheckList.Add(valuingItemOfMyFoodOrder);

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

            //SystemMenu valuingComments = new SystemMenu()
            //{
            //    Name = "评论回复管理",
            //    Leaf = true,
            //    ParentID = baseInfo.Id,
            //    MenuRoute = "valuingComments/pValuingCommentsList.aspx",
            //    TLevel = 1,
            //    ColIndex = 11
            //};
            //iSystemMenuRepository.SaveOrUpdate(valuingComments);
            //adminMenuCheckList.Add(valuingComments);

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

            SystemMenu rentEditManage = new SystemMenu()
            {
                Name = "租房编辑管理",
                Leaf = true,
                ParentID = rentModel.Id,
                MenuRoute = "rent/pRentList.aspx",
                TLevel = 1,
                ColIndex = 5
            };
            iSystemMenuRepository.SaveOrUpdate(rentEditManage);

            SystemMenu valuingOfMyHouseOrder = new SystemMenu()
            {
                Name = "租房订单评价管理",
                Leaf = true,
                ParentID = rentModel.Id,
                MenuRoute = "valuingOfMyHouseOrder/pValuingOfMyHouseOrderList.aspx",
                TLevel = 1,
                ColIndex = 6
            };
            iSystemMenuRepository.SaveOrUpdate(valuingOfMyHouseOrder);
            adminMenuCheckList.Add(valuingOfMyHouseOrder);

            SystemMenu valuingItemOfMyHouseOrder = new SystemMenu()
            {
                Name = "房屋评价项管理",
                Leaf = true,
                ParentID = rentModel.Id,
                MenuRoute = "valuingItemOfMyHouseOrder/pValuingItemOfMyHouseOrderList.aspx",
                TLevel = 1,
                ColIndex = 7
            };
            iSystemMenuRepository.SaveOrUpdate(valuingItemOfMyHouseOrder);
            adminMenuCheckList.Add(valuingItemOfMyHouseOrder);

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
            adminMenuCheckList.Add(shopModel);

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

            SystemMenu shopEditMange = new SystemMenu()
            {
                Name = "商店编辑管理",
                Leaf = true,
                ParentID = shopModel.Id,
                MenuRoute = "shop/pShopList.aspx",
                TLevel = 1,
                ColIndex = 5
            };
            iSystemMenuRepository.SaveOrUpdate(shopEditMange);

            SystemMenu valuingOfMyCommodityOrder = new SystemMenu()
            {
                Name = "商店订单评价管理",
                Leaf = true,
                ParentID = shopModel.Id,
                MenuRoute = "valuingOfMyCommodityOrder/pValuingOfMyCommodityOrderList.aspx",
                TLevel = 1,
                ColIndex = 6
            };
            iSystemMenuRepository.SaveOrUpdate(valuingOfMyCommodityOrder);
            adminMenuCheckList.Add(valuingOfMyCommodityOrder);

            SystemMenu valuingItemOfMyCommodityOrder = new SystemMenu()
            {
                Name = "商品评价项管理",
                Leaf = true,
                ParentID = shopModel.Id,
                MenuRoute = "valuingItemOfMyCommodityOrder/pValuingItemOfMyCommodityOrderList.aspx",
                TLevel = 1,
                ColIndex = 7
            };
            iSystemMenuRepository.SaveOrUpdate(valuingItemOfMyCommodityOrder);
            adminMenuCheckList.Add(valuingItemOfMyCommodityOrder);


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

            SystemMenu restaurantStatistic = new SystemMenu()
            {
                Name = "餐馆统计",
                Leaf = true,
                ParentID = statisticModel.Id,
                MenuRoute = "restaurantStatistic/pRestaurantStatisticList.aspx",
                TLevel = 1,
                ColIndex = 3
            };
            iSystemMenuRepository.SaveOrUpdate(restaurantStatistic);
            adminMenuCheckList.Add(restaurantStatistic);

            SystemMenu foodStatistic = new SystemMenu()
            {
                Name = "食品统计",
                Leaf = true,
                ParentID = statisticModel.Id,
                MenuRoute = "foodStatistic/pFoodStatisticList.aspx",
                TLevel = 1,
                ColIndex = 4
            };
            iSystemMenuRepository.SaveOrUpdate(foodStatistic);
            adminMenuCheckList.Add(foodStatistic);

            SystemMenu rentStatistic = new SystemMenu()
            {
                Name = "租房统计",
                Leaf = true,
                ParentID = statisticModel.Id,
                MenuRoute = "rentStatistic/pRentStatisticList.aspx",
                TLevel = 1,
                ColIndex = 5
            };
            iSystemMenuRepository.SaveOrUpdate(rentStatistic);
            adminMenuCheckList.Add(rentStatistic);

            SystemMenu houseStatistic = new SystemMenu()
            {
                Name = "房屋统计",
                Leaf = true,
                ParentID = statisticModel.Id,
                MenuRoute = "houseStatistic/pHouseStatisticList.aspx",
                TLevel = 1,
                ColIndex = 6
            };
            iSystemMenuRepository.SaveOrUpdate(houseStatistic);
            adminMenuCheckList.Add(houseStatistic);

            SystemMenu shopStatistic = new SystemMenu()
            {
                Name = "商店统计",
                Leaf = true,
                ParentID = statisticModel.Id,
                MenuRoute = "shopStatistic/pShopStatisticList.aspx",
                TLevel = 1,
                ColIndex = 7
            };
            iSystemMenuRepository.SaveOrUpdate(shopStatistic);
            adminMenuCheckList.Add(shopStatistic);

            SystemMenu commodityStatistic = new SystemMenu()
            {
                Name = "商品统计",
                Leaf = true,
                ParentID = statisticModel.Id,
                MenuRoute = "commodityStatistic/pCommodityStatisticList.aspx",
                TLevel = 1,
                ColIndex = 8
            };
            iSystemMenuRepository.SaveOrUpdate(commodityStatistic);
            adminMenuCheckList.Add(commodityStatistic);
        

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

        //角色和功能点的关联
        private void add_ObjectInRole()
        {
            IRepository<SystemFunctionObjectInRole> iSystemFunctionObjectInRoleRepository = UnityHelper.UnityToT<IRepository<SystemFunctionObjectInRole>>();
            ISystemFunctionObjectRepository iSystemFunctionObjectRepository = UnityHelper.UnityToT<ISystemFunctionObjectRepository>();

            systemRoleList = iSystemRoleRepository.GetAll();

            IList<SystemFunctionObject> customerList = new List<SystemFunctionObject>();
            //添加管理员控制的所有功能键对象
            adminSFOCheckList = iSystemFunctionObjectRepository.GetAll();

            string[] customerArr = { "基本信息模块", "顾客账号维护" };
            foreach (var i in customerArr)
            {
                List<DataFilter> customerFilterList = new List<DataFilter>();
                //对于Customer 取值 FunctionObjectName： 基本信息模块 or 顾客账号维护          
                customerFilterList.Add(new DataFilter()
                {
                    type = "FunctionObjectName",
                    value = i
                });
                //添加客户的功能键列表
                customerSFOCheckList = iSystemFunctionObjectRepository.Search(customerFilterList);
                foreach (var j in customerSFOCheckList)
                {
                    customerList.Add(j);
                }
            }

            IList<SystemFunctionObject> shopOwnerList = new List<SystemFunctionObject>();
            string[] shopArr = { "基本信息模块", "商店模块", "商店维护", "商品维护", "商品订单维护", "商品订单明细维护", "商家账号维护" };
            foreach (var i in shopArr)
            {
                List<DataFilter> shopFilterList = new List<DataFilter>();
                shopFilterList.Add(new DataFilter()
                {
                    type = "FunctionObjectName",
                    value = i
                });
                shopOwnerSFOCheckList = iSystemFunctionObjectRepository.Search(shopFilterList);
                foreach (var j in shopOwnerSFOCheckList)
                {
                    shopOwnerList.Add(j);
                }
            }

            IList<SystemFunctionObject> shopEmpList = new List<SystemFunctionObject>();
            string[] shopEmpArr = { "基本信息模块", "商店模块", "商品维护", "商品订单维护", "商品订单明细维护" };
            foreach (var i in shopArr)
            {
                List<DataFilter> shopEmpFilterList = new List<DataFilter>();
                shopEmpFilterList.Add(new DataFilter()
                {
                    type = "FunctionObjectName",
                    value = i
                });
                shopMemberSFOCheckList = iSystemFunctionObjectRepository.Search(shopEmpFilterList);
                foreach (var j in shopMemberSFOCheckList)
                {
                    shopEmpList.Add(j);
                }
            }

            IList<SystemFunctionObject> restaurantList = new List<SystemFunctionObject>();
            string[] restaurantArr = { "基本信息模块", "餐馆模块", "餐馆维护", "菜品维护", "食品订单维护", "食品订单明细维护" };
            foreach (var i in restaurantArr)
            {
                List<DataFilter> restaurantFilterList = new List<DataFilter>();
                restaurantFilterList.Add(new DataFilter()
                {
                    type = "FunctionObjectName",
                    value = i
                });
                restaruantOwnerSFOCheckList = iSystemFunctionObjectRepository.Search(restaurantFilterList);
                foreach (var j in restaruantOwnerSFOCheckList)
                {
                    restaurantList.Add(j);
                }
            }

            IList<SystemFunctionObject> restaurantEmpList = new List<SystemFunctionObject>();
            string[] restaurantEmpArr = { "基本信息模块", "餐馆模块", "菜品维护", "食品订单维护", "食品订单明细维护" };
            foreach (var i in restaurantEmpArr)
            {
                List<DataFilter> restaurantEmpFilterList = new List<DataFilter>();
                restaurantEmpFilterList.Add(new DataFilter()
                {
                    type = "FunctionObjectName",
                    value = i
                });
                restaurantMemberSFOCheckList = iSystemFunctionObjectRepository.Search(restaurantEmpFilterList);
                foreach (var j in restaurantMemberSFOCheckList)
                {
                    restaurantEmpList.Add(j);
                }
            }

            IList<SystemFunctionObject> rentList = new List<SystemFunctionObject>();
            string[] rentArr = { "基本信息模块", "租房模块", "租房维护", "房屋维护", "租房订单维护", "租房订单明细维护" };
            foreach (var i in rentArr)
            {
                List<DataFilter> rentFilterList = new List<DataFilter>();
                rentFilterList.Add(new DataFilter()
                {
                    type = "FunctionObjectName",
                    value = i
                });
                rentOwnerSFOCheckList = iSystemFunctionObjectRepository.Search(rentFilterList);
                foreach (var j in rentOwnerSFOCheckList)
                {
                    rentList.Add(j);
                }
            }

            IList<SystemFunctionObject> rentEmpList = new List<SystemFunctionObject>();
            string[] rentEmpArr = { "基本信息模块", "租房模块", "房屋维护", "租房订单维护", "租房订单明细维护" };
            foreach (var i in rentEmpArr)
            {
                List<DataFilter> rentEmpFilterList = new List<DataFilter>();
                rentEmpFilterList.Add(new DataFilter()
                {
                    type = "FunctionObjectName",
                    value = i
                });
                rentMemberSFOCheckList = iSystemFunctionObjectRepository.Search(rentEmpFilterList);
                foreach (var j in rentMemberSFOCheckList)
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
                            foreach (SystemFunctionObject adminsfb in adminSFOCheckList)
                            {
                                SystemFunctionObjectInRole adminSFunctionInRole = new SystemFunctionObjectInRole();
                                adminSFunctionInRole.SystemRole = sr;
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
                                customerSFunctionInRole.SystemRole = sr;
                                customerSFunctionInRole.SystemFunctionObject = customersfb;
                                customerSFunctionInRole.Deletable = customersfb.DeletePermissionAvailable;
                                customerSFunctionInRole.Editable = customersfb.EditPermissionAvailable;
                                customerSFunctionInRole.Enabled = customersfb.FunctionAvailable;
                                iSystemFunctionObjectInRoleRepository.SaveOrUpdate(customerSFunctionInRole);
                            }
                            break;
                        }
                    case "商店店主":
                        {
                            foreach (SystemFunctionObject shopsfb in shopOwnerList)
                            {
                                SystemFunctionObjectInRole shopSFunctionInRole = new SystemFunctionObjectInRole();
                                shopSFunctionInRole.SystemRole = sr;
                                shopSFunctionInRole.SystemFunctionObject = shopsfb;
                                shopSFunctionInRole.Deletable = shopsfb.DeletePermissionAvailable;
                                shopSFunctionInRole.Editable = shopsfb.EditPermissionAvailable;
                                shopSFunctionInRole.Enabled = shopsfb.FunctionAvailable;
                                iSystemFunctionObjectInRoleRepository.SaveOrUpdate(shopSFunctionInRole);
                            }
                            break;
                        }
                    case "餐馆店主":
                        {
                            foreach (SystemFunctionObject restaurantsfb in restaurantList)
                            {
                                SystemFunctionObjectInRole restaurantSFunctionInRole = new SystemFunctionObjectInRole();
                                restaurantSFunctionInRole.SystemRole = sr;
                                restaurantSFunctionInRole.SystemFunctionObject = restaurantsfb;
                                restaurantSFunctionInRole.Deletable = restaurantsfb.DeletePermissionAvailable;
                                restaurantSFunctionInRole.Editable = restaurantsfb.EditPermissionAvailable;
                                restaurantSFunctionInRole.Enabled = restaurantsfb.FunctionAvailable;
                                iSystemFunctionObjectInRoleRepository.SaveOrUpdate(restaurantSFunctionInRole);
                            }
                            break;
                        }
                    case "租房店主":
                        {
                            foreach (SystemFunctionObject rentsfb in rentList)
                            {
                                SystemFunctionObjectInRole rentSFunctionInRole = new SystemFunctionObjectInRole();
                                rentSFunctionInRole.SystemRole = sr;
                                rentSFunctionInRole.SystemFunctionObject = rentsfb;
                                rentSFunctionInRole.Deletable = rentsfb.DeletePermissionAvailable;
                                rentSFunctionInRole.Editable = rentsfb.EditPermissionAvailable;
                                rentSFunctionInRole.Enabled = rentsfb.FunctionAvailable;
                                iSystemFunctionObjectInRoleRepository.SaveOrUpdate(rentSFunctionInRole);
                            }
                            break;
                        }
                    case "商店店小二":
                        {
                            foreach (SystemFunctionObject shopEmpsfb in shopEmpList)
                            {
                                SystemFunctionObjectInRole shopEmpSFunctionInRole = new SystemFunctionObjectInRole();
                                shopEmpSFunctionInRole.SystemRole = sr;
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
                                restaurantEmpSFunctionInRole.SystemRole = sr;
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
                                rentEmpSFunctionInRole.SystemRole = sr;
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

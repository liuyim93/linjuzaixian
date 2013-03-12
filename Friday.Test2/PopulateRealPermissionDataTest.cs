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
using friday.core.EnumType;

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
            //添加商店分类
            add_MerchantCategory();
            //添加商铺的相关信息
            add_RestaurantInfo();
            add_RentInfo();
            add_ShopInfo();  
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
            restaruantOwnerMenuCheckList.Add(restaurantModel);
            restaurantMemberMenuCheckList.Add(restaurantModel);
           
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
            restaruantOwnerMenuCheckList.Add(restaurantMange);

            SystemMenu foodOrderDetail = new SystemMenu()
            {
                Name = "订单明细管理",
                Leaf = true,
                ParentID = restaurantModel.Id,
                MenuRoute = "orderOfFood/pOrderOfFoodList.aspx",
                TLevel = 1,
                ColIndex = 2
            };
            iSystemMenuRepository.SaveOrUpdate(foodOrderDetail);
            adminMenuCheckList.Add(foodOrderDetail);
            restaruantOwnerMenuCheckList.Add(foodOrderDetail);
            restaurantMemberMenuCheckList.Add(foodOrderDetail);
         

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
            restaruantOwnerMenuCheckList.Add(foodOrder);
            restaurantMemberMenuCheckList.Add(foodOrder);
          

            SystemMenu food = new SystemMenu()
            {
                Name = "菜品管理",
                Leaf = true,
                ParentID = restaurantModel.Id,
                MenuRoute = "food/pFoodList.aspx",
                TLevel = 1,
                ColIndex = 4
            };
            iSystemMenuRepository.SaveOrUpdate(food);
            adminMenuCheckList.Add(food);
            restaruantOwnerMenuCheckList.Add(food);
            restaurantMemberMenuCheckList.Add(food);

            SystemMenu restaurantEditMange = new SystemMenu()
            {
                Name = "餐馆编辑",
                Leaf = true,
                ParentID = restaurantModel.Id,
                MenuRoute = "restaurant/pEditRestaurant.aspx",
                TLevel = 1,
                ColIndex = 5
            };
            iSystemMenuRepository.SaveOrUpdate(restaurantEditMange);
            restaruantOwnerMenuCheckList.Add(restaurantEditMange);

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
            restaruantOwnerMenuCheckList.Add(baseInfo);
            customerMenuCheckList.Add(baseInfo);

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
            restaruantOwnerMenuCheckList.Add(merchantGoodsType);

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
            customerMenuCheckList.Add(systemUser);

            SystemMenu merchantMember = new SystemMenu()
            {
                Name = "员工管理",
                Leaf = true,
                ParentID = baseInfo.Id,
                MenuRoute = "merchantEmployee/pMerchantEmployeeList.aspx",
                TLevel = 1,
                ColIndex = 6
            };
            iSystemMenuRepository.SaveOrUpdate(merchantMember);
            adminMenuCheckList.Add(merchantMember);
            restaruantOwnerMenuCheckList.Add(merchantMember);

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
            restaruantOwnerMenuCheckList.Add(loginUser);

            SystemMenu logUser = new SystemMenu()
            {
                Name = "商家账号编辑",
                Leaf = true,
                ParentID = baseInfo.Id,
                MenuRoute = "loginUser/pEditLoginUser.aspx",
                TLevel = 1,
                ColIndex = 8
            };
            iSystemMenuRepository.SaveOrUpdate(logUser);
            adminMenuCheckList.Add(logUser);
            restaruantOwnerMenuCheckList.Add(logUser);

            SystemMenu systemRole = new SystemMenu()
            {
                Name = "角色权限管理",
                Leaf = true,
                ParentID = baseInfo.Id,
                MenuRoute = "systemRole/pSystemRoleList.aspx",
                TLevel = 1,
                ColIndex = 9
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
                ColIndex = 10
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
                ColIndex = 11
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
            //    ColIndex = 12
            //};
            //iSystemMenuRepository.SaveOrUpdate(valuingComments);
            //adminMenuCheckList.Add(valuingComments);
            restaruantOwnerMenuCheckList.Add(valuingComments);
            customerMenuCheckList.Add(valuingComments);


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
            restaruantOwnerMenuCheckList.Add(messageModel);
            customerMenuCheckList.Add(messageModel);

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
            restaruantOwnerMenuCheckList.Add(message);
            customerMenuCheckList.Add(message);

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
            restaruantOwnerMenuCheckList.Add(feedBackModel);
            customerMenuCheckList.Add(feedBackModel);

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
            restaruantOwnerMenuCheckList.Add(feedBack);
            customerMenuCheckList.Add(feedBack);

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
            restaruantOwnerMenuCheckList.Add(feedBackReply);
            customerMenuCheckList.Add(feedBackReply);

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

            SystemMenu rentEdit = new SystemMenu()
            {
                Name = "租房编辑",
                Leaf = true,
                ParentID = rentModel.Id,
                MenuRoute = "rent/pEditRent.aspx",
                TLevel = 1,
                ColIndex = 2
            };
            iSystemMenuRepository.SaveOrUpdate(rentEdit);
            adminMenuCheckList.Add(rentEdit);

            SystemMenu houseOrderDetail = new SystemMenu()
            {
                Name = "租房订单明细管理",
                Leaf = true,
                ParentID = rentModel.Id,
                MenuRoute = "orderOfHouse/pOrderOfHouseList.aspx",
                TLevel = 1,
                ColIndex = 3
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
                ColIndex = 4
            };
            iSystemMenuRepository.SaveOrUpdate(houseOrder);
            adminMenuCheckList.Add(houseOrder);

            SystemMenu house = new SystemMenu()
            {
                Name = "房屋管理",
                Leaf = true,
                ParentID = rentModel.Id,
                MenuRoute = "house/pHouseList.aspx",
                TLevel = 1,
                ColIndex = 5
            };
            iSystemMenuRepository.SaveOrUpdate(house);
            adminMenuCheckList.Add(house);

            //SystemMenu rentEditManage = new SystemMenu()
            //{
            //    Name = "租房编辑管理",
            //    Leaf = true,
            //    ParentID = rentModel.Id,
            //    MenuRoute = "rent/pRentList.aspx",
            //    TLevel = 1,
            //    ColIndex = 6
            //};
            //iSystemMenuRepository.SaveOrUpdate(rentEditManage);

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

            SystemMenu shopEditMange = new SystemMenu()
            {
                Name = "商店编辑管理",
                Leaf = true,
                ParentID = shopModel.Id,
                MenuRoute = "shop/pEditShop.aspx",
                TLevel = 1,
                ColIndex = 2
            };
            iSystemMenuRepository.SaveOrUpdate(shopEditMange);

            SystemMenu commodity = new SystemMenu()
            {
                Name = "商品管理",
                Leaf = true,
                ParentID = shopModel.Id,
                MenuRoute = "commodity/pCommodityList.aspx",
                TLevel = 1,
                ColIndex = 3
            };
            iSystemMenuRepository.SaveOrUpdate(commodity);
            adminMenuCheckList.Add(commodity);


            SystemMenu commodityOrderDetail = new SystemMenu()
            {
                Name = "订单明细管理",
                Leaf = true,
                ParentID = shopModel.Id,
                MenuRoute = "orderOfCommodity/pOrderOfCommodityList.aspx",
                TLevel = 1,
                ColIndex = 4
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
                ColIndex = 5
            };
            iSystemMenuRepository.SaveOrUpdate(commodityOrder);
            adminMenuCheckList.Add(commodityOrder);
           

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
                    case "商店店主":
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
                    case "餐馆店主":
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
                    case "租房店主":
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
                    case "商店店小二":
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

            string[] customerArr = { "基本信息模块", "顾客账号维护", "评论回复管理", "消息模块", "消息维护", "反馈模块", "反馈维护", "反馈管理", "餐馆模块","食品订单维护权限" };
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
            string[] restaurantArr = { "基本信息模块", "餐馆模块", "餐馆维护", "菜品维护", "食品订单维护", "食品订单明细维护", "员工维护", "自定义商品类型维护","商家账号维护","评论回复管理","消息模块","消息维护" ,"反馈模块","反馈维护","反馈管理"};
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
        //商店商品目录添加
        private void add_MerchantCategory()
         {
             IMerchantCategoryService iMerchantCategoryService = UnityHelper.UnityToT<IMerchantCategoryService>();
             string[] restCatg = {"中餐","西餐","清真","自助餐","火锅","鲁菜","川菜","粤菜","闽菜","苏菜","湘菜","徽菜" };
            foreach(var i in restCatg)
            {
                MerchantCategory restMC = new MerchantCategory()
                {
                    MerchantCategoryName = i,
                    MerchantType = MerchantTypeEnum.餐馆
                };
                iMerchantCategoryService.Save(restMC);            
            }
            string[] rentCatg = { "学区房", "海景房", "洋房", "独栋别墅", "复式楼房", "筒子楼", "集体宿舍"};
            foreach (var i in rentCatg)
            {
                MerchantCategory restMC = new MerchantCategory()
                {
                    MerchantCategoryName = i,
                    MerchantType = MerchantTypeEnum.租房
                };
                iMerchantCategoryService.Save(restMC);
            }

            string[] shopCatg = { "烟酒", "炒货", "果木", "熟食", "家电", "家具", "蔬菜","家纺","图书影音","电子产品","综合购物中心" };
            foreach (var i in shopCatg)
            {
                MerchantCategory shopMC = new MerchantCategory()
                {
                    MerchantCategoryName = i,
                    MerchantType = MerchantTypeEnum.百货
                };
                iMerchantCategoryService.Save(shopMC);
            }

         }
        //添加 商铺、自定义商品类型、Admin、Xiaoer、Order、OrderDetail；顾客、地址、Order等信息
        public void add_RestaurantInfo()
        {
            IMerchantCategoryRepository iMerchantCategoryRepository = UnityHelper.UnityToT<IMerchantCategoryRepository>();
            IUserInRoleRepository iUserInRoleRepository = UnityHelper.UnityToT<IUserInRoleRepository>();

            Restaurant restaurant1 = new Restaurant()
            {
                Activity = "五一大促销",
                Address = "山东财经大学燕山",
                AfternoonBeginHour = "18:20",
                AfternoonEndHour = "19:30",
                Bulletins = "9折优惠",
                Cost = 2,
                Description = "just come",
                Distance = "100",
                Email = "222@qq.com",
                Logo = "image/21222.jpg",
                Name = "翠峰苑连锁火锅城",
                Owener = "刘德华",
                ShortName = "翠峰苑",   
                Tel = "18799999992",
                SendTime = 30,
                Rate = 0.8,
                SendPrice = 10,
                ShopStatus = ShopStatusEnum.营业时间,
                MerchantCategory = iMerchantCategoryRepository.SearchByMerchantCategoryName("鲁菜"),
                MerchantType = MerchantTypeEnum.餐馆
            };
            MerchantGoodsType restaurantFoodTye_1 = new MerchantGoodsType() { Merchant = restaurant1, GoodsType = "汉堡" };
            MerchantGoodsType restaurantFoodTye_2 = new MerchantGoodsType() { Merchant = restaurant1, GoodsType = "小吃" };
            restaurant1.MerchantGoodsTypes.Add(restaurantFoodTye_1);
            restaurant1.MerchantGoodsTypes.Add(restaurantFoodTye_2);
            new RestaurantRepository().SaveOrUpdate(restaurant1);

            IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>();
            ILoginUserOfMerchantRepository iLoginUserOfMerchantRepository = UnityHelper.UnityToT<ILoginUserOfMerchantRepository>();

            LoginUser lu1 = new LoginUser();
            lu1.LoginName = "restcuifengyuan";
            lu1.Password = "000000";
            iLoginUserRepository.SaveOrUpdate(lu1);
            
            LoginUserOfMerchant lum = new LoginUserOfMerchant();
            lum.Merchant = restaurant1;
            lum.LoginUser = lu1;
            iLoginUserOfMerchantRepository.SaveOrUpdate(lum);

            UserInRole uir = new UserInRole();
            uir.LoginUser = lu1;
            uir.SystemRole = iSystemRoleRepository.GetRoleByName("餐馆店主");
            iUserInRoleRepository.SaveOrUpdate(uir);

            LoginUser lu1_1 = new LoginUser();
            lu1_1.LoginName = "restcuifengyuanxiaoer";
            lu1_1.Password = "111111";
            iLoginUserRepository.SaveOrUpdate(lu1_1);

            LoginUserOfMerchant lum1_1 = new LoginUserOfMerchant();
            lum1_1.Merchant = restaurant1;
            lum1_1.LoginUser = lu1_1;
            iLoginUserOfMerchantRepository.SaveOrUpdate(lum1_1);

            UserInRole uir1_1 = new UserInRole();
            uir1_1.LoginUser = lu1_1;
            uir1_1.SystemRole = iSystemRoleRepository.GetRoleByName("餐馆店小二");
            iUserInRoleRepository.SaveOrUpdate(uir1_1);

                Food food_1 = new Food()
                {
                    Name = "鸡腿堡",
                    Price = 10,
                    Image = "image/1212.jpg",
                    IsDiscount = false,
                    InventoryCount = 100,
                    MerchantGoodsType = restaurantFoodTye_1,
                    Restaurant = restaurant1,

                };
                restaurant1.Foods.Add(food_1);

                Food food_2 = new Food()
                {
                    Name = "薯条",
                    Price = 15,
                    Image = "image/121.png",
                    IsDiscount = true,
                    InventoryCount = 200,
                    DiscountInventoryCount = 100,
                    MerchantGoodsType = restaurantFoodTye_2,
                    DiscountPrice = 10,
                    Restaurant = restaurant1,
                    IsLimited = true,

                };
                restaurant1.Foods.Add(food_2);
            new RestaurantRepository().SaveOrUpdate(restaurant1);

            //添加顾客张国荣
            string systemuserid = Guid.NewGuid().ToString();
            string loginuserid = Guid.NewGuid().ToString();
            SystemUser s1 = new SystemUser(systemuserid)
            {
                Tel = "13988888888",
                Description = "erhuan10",
                Email = "ocam10@163.com",
                EntityIndex = 10,
                Name = "张国荣",                 
                IsAnonymous = false,
            };
            new SystemUserRepository().SaveOrUpdate(s1);          
            Address address = new Address()
            {
                AddressName = "山东财经大学9号宿舍楼",
                BackupTel = "187000000000",
                Email ="23423@163.com",
                Linkman = "john",
                QQ ="3333333333",
                Tel ="18668668686",
                Weixin ="5862414855",
                SystemUser=s1
            };
            //s1.Addresses.Add(address);
            new AddressRepository().SaveOrUpdate(address);
            Address address2 = new Address()
            {
                AddressName = "青岛大学9号宿舍楼",
                BackupTel = "18711111111111",
                Email = "23423@163.com",
                Linkman = "john",
                QQ = "66666666",
                Tel = "18668668686",
                Weixin = "5862414855",
                SystemUser=s1
            };
            //s1.Addresses.Add(address2);
            new AddressRepository().SaveOrUpdate(address2);

            LoginUser sysLoginUser = new LoginUser(loginuserid)
            {
                SystemUser = s1,
                IsAdmin = false,
                LoginName = "restzhangguorong",
                Password = "000000",
                 
            };
            //s1.LoginUser = sysLoginUser;
            new LoginUserRepository().SaveOrUpdate(sysLoginUser);

            UserInRole uir1 = new UserInRole();
            uir1.LoginUser = sysLoginUser;
            uir1.SystemRole = iSystemRoleRepository.GetRoleByName("顾客");
            iUserInRoleRepository.SaveOrUpdate(uir1);

            var add = s1.Addresses.FirstOrDefault();
            MyFoodOrder myFoodOrder = new MyFoodOrder()
            {
                Address = address.AddressName,
                Linkman = address.Linkman,
                SystemUser = s1,
                EntityIndex = 1,
                Tel = address.Tel,
                Restaurant = restaurant1,
                OrderNumber = DateTime.Now.ToString("yyyyMMddhhmmssfff"),  //2013-02-10 TODO basilwang need use id policy
                OrderStatus = MyOrderStatusEnum.成功,
                SendTime = "11:20",
                Description = "不要辣椒"
            };

                OrderOfFood orderOfFood_1 = new OrderOfFood()
               {
                   Amount = 2,
                   MyFoodOrder = myFoodOrder,
                   Price = food_1.Price,
                   Food = food_1,
                   EntityIndex = 1
               };
               myFoodOrder.OrderOfFoods.Add(orderOfFood_1);
           new MyFoodOrderRepository().SaveOrUpdate(myFoodOrder);


           Restaurant restaurant2 = new Restaurant()
           {
               Activity = "清仓大甩卖",
               Address = "青岛大学崂山校区",
               AfternoonBeginHour = "18:20",
               AfternoonEndHour = "19:30",
               Bulletins = "9折优惠",
               Cost = 2,
               Description = "just come",
               Distance = "100",
               Email = "222@qq.com",
               Logo = "image/21222.jpg",
               Name = "金汉斯自助餐连锁店",
               Owener = "张学友",
               ShortName = "金汉斯",
               Tel = "18799999992",
               SendTime = 30,
               Rate = 0.8,
               SendPrice = 10,
               ShopStatus = ShopStatusEnum.营业时间,
               MerchantCategory = iMerchantCategoryRepository.SearchByMerchantCategoryName("川菜"),
               MerchantType = MerchantTypeEnum.餐馆
           };
           MerchantGoodsType restaurantFoodTye_12 = new MerchantGoodsType() { Merchant = restaurant2, GoodsType = "蛋糕" };
           MerchantGoodsType restaurantFoodTye_22 = new MerchantGoodsType() { Merchant = restaurant2, GoodsType = "水果" };
           restaurant2.MerchantGoodsTypes.Add(restaurantFoodTye_12);
           restaurant2.MerchantGoodsTypes.Add(restaurantFoodTye_22);
           new RestaurantRepository().SaveOrUpdate(restaurant2);

           LoginUser lu2 = new LoginUser();
           lu2.LoginName = "restjinhansi";
           lu2.Password = "000000";
           iLoginUserRepository.SaveOrUpdate(lu2);

           LoginUserOfMerchant lum2 = new LoginUserOfMerchant();
           lum2.Merchant = restaurant2;
           lum2.LoginUser = lu2;
           iLoginUserOfMerchantRepository.SaveOrUpdate(lum2);

           UserInRole uir2 = new UserInRole();
           uir2.LoginUser = lu2;
           uir2.SystemRole = iSystemRoleRepository.GetRoleByName("餐馆店主");
           iUserInRoleRepository.SaveOrUpdate(uir2);

           LoginUser lu1_2 = new LoginUser();
           lu1_2.LoginName = "restxiaoerjinhansi";
           lu1_2.Password = "111111";
           iLoginUserRepository.SaveOrUpdate(lu1_2);

           LoginUserOfMerchant lum1_2 = new LoginUserOfMerchant();
           lum1_2.Merchant = restaurant2;
           lum1_2.LoginUser = lu1_2;
           iLoginUserOfMerchantRepository.SaveOrUpdate(lum1_2);

           UserInRole uir1_2 = new UserInRole();
           uir1_2.LoginUser = lu1_2;
           uir1_2.SystemRole = iSystemRoleRepository.GetRoleByName("餐馆店小二");
           iUserInRoleRepository.SaveOrUpdate(uir1_2);

           Food food_12 = new Food()
           {
               Name = "生日蛋糕",
               Price = 10,
               Image = "image/1212.jpg",
               IsDiscount = false,
               InventoryCount = 100,
               MerchantGoodsType = restaurantFoodTye_12,
               Restaurant = restaurant2,

           };
           restaurant1.Foods.Add(food_12);

           Food food_22 = new Food()
           {
               Name = "香蕉",
               Price = 15,
               Image = "image/121.png",
               IsDiscount = true,
               InventoryCount = 200,
               DiscountInventoryCount = 100,
               MerchantGoodsType = restaurantFoodTye_22,
               DiscountPrice = 10,
               Restaurant = restaurant2,
               IsLimited = true,

           };
           restaurant2.Foods.Add(food_22);
           new RestaurantRepository().SaveOrUpdate(restaurant2);

           //添加顾客张卫健
           SystemUser s2 = new SystemUser()
           {
               Tel = "13988888888",
               Description = "erhuan10",
               Email = "ocam10@163.com",
               EntityIndex = 10,
               Name = "张卫健",
               IsAnonymous = false,
           };
           new SystemUserRepository().SaveOrUpdate(s2);
           Address address12 = new Address()
           {
               AddressName = "青岛大学崂山校区1号宿舍楼",
               BackupTel = "187000000000",
               Email = "23423@163.com",
               Linkman = "john",
               QQ = "3333333333",
               Tel = "18668668686",
               Weixin = "5862414855",
               SystemUser = s2
           };
           //s1.Addresses.Add(address);
           new AddressRepository().SaveOrUpdate(address12);
           Address address22 = new Address()
           {
               AddressName = "中国海洋大学2号宿舍楼",
               BackupTel = "18711111111111",
               Email = "23423@163.com",
               Linkman = "john",
               QQ = "66666666",
               Tel = "18668668686",
               Weixin = "5862414855",
               SystemUser = s2
           };
           //s1.Addresses.Add(address2);
           new AddressRepository().SaveOrUpdate(address22);

           LoginUser sysLoginUser2 = new LoginUser()
           {
               SystemUser = s2,
               IsAdmin = false,
               LoginName = "restzhangweijian",
               Password = "000000",

           };
           //s1.LoginUser = sysLoginUser;
           new LoginUserRepository().SaveOrUpdate(sysLoginUser2);

           UserInRole uir12 = new UserInRole();
           uir12.LoginUser = sysLoginUser2;
           uir12.SystemRole = iSystemRoleRepository.GetRoleByName("顾客");
           iUserInRoleRepository.SaveOrUpdate(uir12);

           var add2 = s2.Addresses.FirstOrDefault();
           MyFoodOrder myFoodOrder2 = new MyFoodOrder()
           {
               Address = address22.AddressName,
               Linkman = address22.Linkman,
               SystemUser = s2,
               EntityIndex = 1,
               Tel = address22.Tel,
               Restaurant = restaurant2,
               OrderNumber = DateTime.Now.ToString("yyyyMMddhhmmssfff"),  //2013-02-10 TODO basilwang need use id policy
               OrderStatus = MyOrderStatusEnum.成功,
               SendTime = "11:20",
               Description = "不要辣椒"
           };

           OrderOfFood orderOfFood_12 = new OrderOfFood()
           {
               Amount = 2,
               MyFoodOrder = myFoodOrder2,
               Price = food_12.Price,
               Food = food_12,
               EntityIndex = 1
           };
           myFoodOrder2.OrderOfFoods.Add(orderOfFood_12);

           OrderOfFood orderOfFood_22 = new OrderOfFood()
           {
               Amount = 2,
               MyFoodOrder = myFoodOrder2,
               Price = food_22.Price,
               Food = food_22,
               EntityIndex = 1
           };
           myFoodOrder2.OrderOfFoods.Add(orderOfFood_12);
           new MyFoodOrderRepository().SaveOrUpdate(myFoodOrder2);        
        }
         public void add_RentInfo()
        {
            IMerchantCategoryRepository iMerchantCategoryRepository = UnityHelper.UnityToT<IMerchantCategoryRepository>();
            IUserInRoleRepository iUserInRoleRepository = UnityHelper.UnityToT<IUserInRoleRepository>();

            Rent rent1 = new Rent()
            {
                Activity = "五一大促销",
                Address = "二环东路7366号",
                Bulletins = "9折促销",
                Description = "just come",
                Distance = "100",
                Email = "7366@qq.com",
                Logo = "image/7366.jpg",
                Name = "济南安泰置业有限公司",
                Owener = "任贤齐",
                ShortName = "安泰",
                Tel = "18799999992",
                Rate = 0.8,
                ShopStatus = ShopStatusEnum.营业时间,
                MerchantCategory = iMerchantCategoryRepository.SearchByMerchantCategoryName("学区房"),
                MerchantType = MerchantTypeEnum.租房
            };
            MerchantGoodsType rentHouseTye_1 = new MerchantGoodsType() { Merchant = rent1, GoodsType = "高校学区房" };
            MerchantGoodsType rentHouseTye_2 = new MerchantGoodsType() { Merchant = rent1, GoodsType = "中学学区房" };
            rent1.MerchantGoodsTypes.Add(rentHouseTye_1);
            rent1.MerchantGoodsTypes.Add(rentHouseTye_2);
            new RentRepository().SaveOrUpdate(rent1);

            IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>();
            ILoginUserOfMerchantRepository iLoginUserOfMerchantRepository = UnityHelper.UnityToT<ILoginUserOfMerchantRepository>();

            LoginUser lu1 = new LoginUser();
            lu1.LoginName = "rentantai";
            lu1.Password = "000000";
            iLoginUserRepository.SaveOrUpdate(lu1);
            
            LoginUserOfMerchant lum = new LoginUserOfMerchant();
            lum.Merchant = rent1;
            lum.LoginUser = lu1;
            iLoginUserOfMerchantRepository.SaveOrUpdate(lum);

            UserInRole uir = new UserInRole();
            uir.LoginUser = lu1;
            uir.SystemRole = iSystemRoleRepository.GetRoleByName("租房店主");
            iUserInRoleRepository.SaveOrUpdate(uir);

            LoginUser lu1_1 = new LoginUser();
            lu1_1.LoginName = "rentantaixiaoer";
            lu1_1.Password = "111111";
            iLoginUserRepository.SaveOrUpdate(lu1_1);

            LoginUserOfMerchant lum1_1 = new LoginUserOfMerchant();
            lum1_1.Merchant = rent1;
            lum1_1.LoginUser = lu1_1;
            iLoginUserOfMerchantRepository.SaveOrUpdate(lum1_1);

            UserInRole uir1_1 = new UserInRole();
            uir1_1.LoginUser = lu1_1;
            uir1_1.SystemRole = iSystemRoleRepository.GetRoleByName("租房店小二");
            iUserInRoleRepository.SaveOrUpdate(uir1_1);

                House house_1 = new House()
                {
                    Name = "财大学区房",
                    Price = 10,
                    Image = "image/1212.jpg",
                    IsDiscount = false,
                    InventoryCount = 100,
                    MerchantGoodsType = rentHouseTye_1,
                    Rent = rent1,
                   TimeOfRentFrom=DateTime.Now,
                   TimeOfRentTO=DateTime.Now

                };
                rent1.Houses.Add(house_1);

                House house_2 = new House()
                {
                    Name = "甸柳一小学区房",
                    Price = 15,
                    Image = "image/121.png",
                    IsDiscount = true,
                    InventoryCount = 200,
                    DiscountInventoryCount = 100,
                    MerchantGoodsType = rentHouseTye_2,
                    DiscountPrice = 10,
                    Rent = rent1,
                    IsLimited = true,
                    TimeOfRentFrom = DateTime.Now,
                    TimeOfRentTO = DateTime.Now
                };
                rent1.Houses.Add(house_2);
            new RentRepository().SaveOrUpdate(rent1);

            //添加顾客李自成
            string systemuserid = Guid.NewGuid().ToString();
            string loginuserid = Guid.NewGuid().ToString();
            SystemUser s1 = new SystemUser(systemuserid)
            {
                Tel = "13988888888",
                Description = "erhuan10",
                Email = "ocam10@163.com",
                EntityIndex = 10,
                Name = "李自成",                 
                IsAnonymous = false,
            };
            new SystemUserRepository().SaveOrUpdate(s1);          
            Address address = new Address()
            {
                AddressName = "济南市历下区燕子山小区9#116",
                BackupTel = "187000000000",
                Email ="23423@163.com",
                Linkman = "john",
                QQ ="3333333333",
                Tel ="18668668686",
                Weixin ="5862414855",
                SystemUser=s1
            };
            //s1.Addresses.Add(address);
            new AddressRepository().SaveOrUpdate(address);
            Address address2 = new Address()
            {
                AddressName = "济南市市中区军安和平山庄9#116",
                BackupTel = "18711111111111",
                Email = "23423@163.com",
                Linkman = "john",
                QQ = "66666666",
                Tel = "18668668686",
                Weixin = "5862414855",
                SystemUser=s1
            };
            //s1.Addresses.Add(address2);
            new AddressRepository().SaveOrUpdate(address2);

            LoginUser sysLoginUser = new LoginUser(loginuserid)
            {
                SystemUser = s1,
                IsAdmin = false,
                LoginName = "rentlizicheng",
                Password = "000000",
                 
            };
            //s1.LoginUser = sysLoginUser;
            new LoginUserRepository().SaveOrUpdate(sysLoginUser);

            UserInRole uir1 = new UserInRole();
            uir1.LoginUser = sysLoginUser;
            uir1.SystemRole = iSystemRoleRepository.GetRoleByName("顾客");
            iUserInRoleRepository.SaveOrUpdate(uir1);

            var add = s1.Addresses.FirstOrDefault();
            MyHouseOrder myHouseOrder = new MyHouseOrder()
            {
                Address = address.AddressName,
                Linkman = address.Linkman,
                SystemUser = s1,
                EntityIndex = 1,
                Tel = address.Tel,
                Rent = rent1,
                OrderNumber = DateTime.Now.ToString("yyyyMMddhhmmssfff"),  //2013-02-10 TODO basilwang need use id policy
                OrderStatus = MyOrderStatusEnum.成功,
                SendTime = "11:20",
                Description = "价格不能超过3000"
            };

                OrderOfHouse orderOfHouse_1 = new OrderOfHouse()
               {
                   Amount = 2,
                   MyHouseOrder = myHouseOrder,
                   Price = house_1.Price,
                   House = house_1,
                   EntityIndex = 1
               };
               myHouseOrder.OrderOfHouses.Add(orderOfHouse_1);
           new MyHouseOrderRepository().SaveOrUpdate(myHouseOrder);


           Rent rent2 = new Rent()
           {
               Activity = "优质房源",
               Address = "济南市市中区舜耕路30号",
               Bulletins = "9折优惠",
               Description = "just come",
               Distance = "100",
               Email = "222@qq.com",
               Logo = "image/21222.jpg",
               Name = "济南润华置业公司",
               Owener = "杨千嬅",
               ShortName = "润华",
               Tel = "18799999992",
               Rate = 0.8,
               ShopStatus = ShopStatusEnum.营业时间,
               MerchantCategory = iMerchantCategoryRepository.SearchByMerchantCategoryName("海景房"),
               MerchantType = MerchantTypeEnum.租房
           };
           MerchantGoodsType rentHouseTye_12 = new MerchantGoodsType() { Merchant = rent2, GoodsType = "烟台海景房" };
           MerchantGoodsType rentHouseTye_22 = new MerchantGoodsType() { Merchant = rent2, GoodsType = "威海海景房" };
           rent2.MerchantGoodsTypes.Add(rentHouseTye_12);
           rent2.MerchantGoodsTypes.Add(rentHouseTye_22);
           new RentRepository().SaveOrUpdate(rent2);

           LoginUser lu2 = new LoginUser();
           lu2.LoginName = "rentrunhua";
           lu2.Password = "000000";
           iLoginUserRepository.SaveOrUpdate(lu2);

           LoginUserOfMerchant lum2 = new LoginUserOfMerchant();
           lum2.Merchant = rent2;
           lum2.LoginUser = lu2;
           iLoginUserOfMerchantRepository.SaveOrUpdate(lum2);

           UserInRole uir2 = new UserInRole();
           uir2.LoginUser = lu2;
           uir2.SystemRole = iSystemRoleRepository.GetRoleByName("租房店主");
           iUserInRoleRepository.SaveOrUpdate(uir2);

           LoginUser lu1_2 = new LoginUser();
           lu1_2.LoginName = "rentrunhuaxiaoer";
           lu1_2.Password = "111111";
           iLoginUserRepository.SaveOrUpdate(lu1_2);

           LoginUserOfMerchant lum1_2 = new LoginUserOfMerchant();
           lum1_2.Merchant = rent2;
           lum1_2.LoginUser = lu1_2;
           iLoginUserOfMerchantRepository.SaveOrUpdate(lum1_2);

           UserInRole uir1_2 = new UserInRole();
           uir1_2.LoginUser = lu1_2;
           uir1_2.SystemRole = iSystemRoleRepository.GetRoleByName("租房店小二");
           iUserInRoleRepository.SaveOrUpdate(uir1_2);

           House house_12 = new House()
           {
               Name = "烟大海景房",
               Price = 10,
               Image = "image/1212.jpg",
               IsDiscount = false,
               InventoryCount = 100,
               MerchantGoodsType = rentHouseTye_12,
               Rent = rent2,
               TimeOfRentFrom = DateTime.Now,
               TimeOfRentTO = DateTime.Now
           };
           rent1.Houses.Add(house_12);

           House house_22 = new House()
           {
               Name = "山大威海校区海景房",
               Price = 15,
               Image = "image/121.png",
               IsDiscount = true,
               InventoryCount = 200,
               DiscountInventoryCount = 100,
               MerchantGoodsType = rentHouseTye_22,
               DiscountPrice = 10,
               Rent = rent2,
               IsLimited = true,
               TimeOfRentFrom = DateTime.Now,
               TimeOfRentTO = DateTime.Now
           };
           rent2.Houses.Add(house_22);
           new RentRepository().SaveOrUpdate(rent2);

           //添加顾客王志文
           SystemUser s2 = new SystemUser()
           {
               Tel = "13988888888",
               Description = "erhuan10",
               Email = "ocam10@163.com",
               EntityIndex = 10,
               Name = "王志文",
               IsAnonymous = false,
           };
           new SystemUserRepository().SaveOrUpdate(s2);
           Address address12 = new Address()
           {
               AddressName = "北京市海淀区和平校区3220",
               BackupTel = "187000000000",
               Email = "23423@163.com",
               Linkman = "john",
               QQ = "3333333333",
               Tel = "18668668686",
               Weixin = "5862414855",
               SystemUser = s2
           };
           //s1.Addresses.Add(address);
           new AddressRepository().SaveOrUpdate(address12);
           Address address22 = new Address()
           {
               AddressName = "青岛市四方区贵和校区4112",
               BackupTel = "18711111111111",
               Email = "23423@163.com",
               Linkman = "john",
               QQ = "66666666",
               Tel = "18668668686",
               Weixin = "5862414855",
               SystemUser = s2
           };
           //s1.Addresses.Add(address2);
           new AddressRepository().SaveOrUpdate(address22);

           LoginUser sysLoginUser2 = new LoginUser()
           {
               SystemUser = s2,
               IsAdmin = false,
               LoginName = "rentwangzhiwen",
               Password = "000000",

           };
           //s1.LoginUser = sysLoginUser;
           new LoginUserRepository().SaveOrUpdate(sysLoginUser2);

           UserInRole uir12 = new UserInRole();
           uir12.LoginUser = sysLoginUser2;
           uir12.SystemRole = iSystemRoleRepository.GetRoleByName("顾客");
           iUserInRoleRepository.SaveOrUpdate(uir12);

           var add2 = s2.Addresses.FirstOrDefault();
           MyHouseOrder myHouseOrder2 = new MyHouseOrder()
           {
               Address = address22.AddressName,
               Linkman = address22.Linkman,
               SystemUser = s2,
               EntityIndex = 1,
               Tel = address22.Tel,
               Rent = rent2,
               OrderNumber = DateTime.Now.ToString("yyyyMMddhhmmssfff"),  //2013-02-10 TODO basilwang need use id policy
               OrderStatus = MyOrderStatusEnum.成功,
               SendTime = "11:20",
               Description = ""
           };

           OrderOfHouse orderOfHouse_12 = new OrderOfHouse()
           {
               Amount = 2,
               MyHouseOrder = myHouseOrder2,
               Price = house_12.Price,
               House = house_12,
               EntityIndex = 1
           };
           myHouseOrder2.OrderOfHouses.Add(orderOfHouse_12);

           OrderOfHouse orderOfHouse_22 = new OrderOfHouse()
           {
               Amount = 2,
               MyHouseOrder = myHouseOrder2,
               Price = house_22.Price,
               House = house_22,
               EntityIndex = 1
           };
           myHouseOrder2.OrderOfHouses.Add(orderOfHouse_12);
           new MyHouseOrderRepository().SaveOrUpdate(myHouseOrder2);
       
        }
        public void add_ShopInfo()
        {
        
         IMerchantCategoryRepository iMerchantCategoryRepository = UnityHelper.UnityToT<IMerchantCategoryRepository>();
            IUserInRoleRepository iUserInRoleRepository = UnityHelper.UnityToT<IUserInRoleRepository>();

            Shop shop1 = new Shop()
            {
                Activity = "五一大促销",
                Address = "山师东路66号",
                Bulletins = "9折促销",
                Description = "just come",
                Distance = "100",
                Email = "7366@qq.com",
                Logo = "image/7366.jpg",
                Name = "大润发购物中心",
                Owener = "王力宏",
                ShortName = "大润发",
                Tel = "18799999992",
                Rate = 0.8,
                ShopStatus = ShopStatusEnum.营业时间,
                MerchantCategory = iMerchantCategoryRepository.SearchByMerchantCategoryName("综合购物中心"),
                MerchantType = MerchantTypeEnum.百货
            };
            MerchantGoodsType shopCommodityTye_1 = new MerchantGoodsType() { Merchant = shop1, GoodsType = "专供酒水" };
            MerchantGoodsType shopCommodityTye_2 = new MerchantGoodsType() { Merchant = shop1, GoodsType = "特供蔬菜" };
            shop1.MerchantGoodsTypes.Add(shopCommodityTye_1);
            shop1.MerchantGoodsTypes.Add(shopCommodityTye_2);
            new ShopRepository().SaveOrUpdate(shop1);

            IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>();
            ILoginUserOfMerchantRepository iLoginUserOfMerchantRepository = UnityHelper.UnityToT<ILoginUserOfMerchantRepository>();

            LoginUser lu1 = new LoginUser();
            lu1.LoginName = "shopdarunfa";
            lu1.Password = "000000";
            iLoginUserRepository.SaveOrUpdate(lu1);
            
            LoginUserOfMerchant lum = new LoginUserOfMerchant();
            lum.Merchant = shop1;
            lum.LoginUser = lu1;
            iLoginUserOfMerchantRepository.SaveOrUpdate(lum);

            UserInRole uir = new UserInRole();
            uir.LoginUser = lu1;
            uir.SystemRole = iSystemRoleRepository.GetRoleByName("商店店主");
            iUserInRoleRepository.SaveOrUpdate(uir);

            LoginUser lu1_1 = new LoginUser();
            lu1_1.LoginName = "shopdarunfaxiaoer";
            lu1_1.Password = "111111";
            iLoginUserRepository.SaveOrUpdate(lu1_1);

            LoginUserOfMerchant lum1_1 = new LoginUserOfMerchant();
            lum1_1.Merchant = shop1;
            lum1_1.LoginUser = lu1_1;
            iLoginUserOfMerchantRepository.SaveOrUpdate(lum1_1);

            UserInRole uir1_1 = new UserInRole();
            uir1_1.LoginUser = lu1_1;
            uir1_1.SystemRole = iSystemRoleRepository.GetRoleByName("商店店小二");
            iUserInRoleRepository.SaveOrUpdate(uir1_1);

                Commodity commodity_1 = new Commodity()
                {
                    Name = "五粮液",
                    Price = 10,
                    Image = "image/1212.jpg",
                    IsDiscount = false,
                    InventoryCount = 100,
                    MerchantGoodsType = shopCommodityTye_1,
                    Shop= shop1,

                };
                shop1.Commodities.Add(commodity_1);

                Commodity commodity_2 = new Commodity()
                {
                    Name = "章丘大村",
                    Price = 15,
                    Image = "image/121.png",
                    IsDiscount = true,
                    InventoryCount = 200,
                    DiscountInventoryCount = 100,
                    MerchantGoodsType = shopCommodityTye_2,
                    DiscountPrice = 10,
                    Shop= shop1,
                    IsLimited = true,
                };
                shop1.Commodities.Add(commodity_2);
            new ShopRepository().SaveOrUpdate(shop1);

            //添加顾客成龙
            string systemuserid = Guid.NewGuid().ToString();
            string loginuserid = Guid.NewGuid().ToString();
            SystemUser s1 = new SystemUser(systemuserid)
            {
                Tel = "13988888888",
                Description = "erhuan10",
                Email = "ocam10@163.com",
                EntityIndex = 10,
                Name = "成龙",                 
                IsAnonymous = false,
            };
            new SystemUserRepository().SaveOrUpdate(s1);          
            Address address = new Address()
            {
                AddressName = "济南市市中区环山小区9#116",
                BackupTel = "187000000000",
                Email ="23423@163.com",
                Linkman = "john",
                QQ ="3333333333",
                Tel ="18668668686",
                Weixin ="5862414855",
                SystemUser=s1
            };
            //s1.Addresses.Add(address);
            new AddressRepository().SaveOrUpdate(address);
            Address address2 = new Address()
            {
                AddressName = "章丘市槐荫区和平山庄9#116",
                BackupTel = "18711111111111",
                Email = "23423@163.com",
                Linkman = "john",
                QQ = "66666666",
                Tel = "18668668686",
                Weixin = "5862414855",
                SystemUser=s1
            };
            //s1.Addresses.Add(address2);
            new AddressRepository().SaveOrUpdate(address2);

            LoginUser sysLoginUser = new LoginUser(loginuserid)
            {
                SystemUser = s1,
                IsAdmin = false,
                LoginName = "shopchenglong",
                Password = "000000",
                 
            };
            //s1.LoginUser = sysLoginUser;
            new LoginUserRepository().SaveOrUpdate(sysLoginUser);

            UserInRole uir1 = new UserInRole();
            uir1.LoginUser = sysLoginUser;
            uir1.SystemRole = iSystemRoleRepository.GetRoleByName("顾客");
            iUserInRoleRepository.SaveOrUpdate(uir1);

            var add = s1.Addresses.FirstOrDefault();
            MyCommodityOrder myCommodityOrder = new MyCommodityOrder()
            {
                Address = address.AddressName,
                Linkman = address.Linkman,
                SystemUser = s1,
                EntityIndex = 1,
                Tel = address.Tel,
                Shop= shop1,
                OrderNumber = DateTime.Now.ToString("yyyyMMddhhmmssfff"),  //2013-02-10 TODO basilwang need use id policy
                OrderStatus = MyOrderStatusEnum.成功,
                SendTime = "11:20",
                Description = "价格不能超过3000"
            };

                OrderOfCommodity orderOfCommodity_1 = new OrderOfCommodity()
               {
                   Amount = 2,
                   MyCommodityOrder = myCommodityOrder,
                   Price = commodity_1.Price,
                   Commodity = commodity_1,
                   EntityIndex = 1
               };
               myCommodityOrder.OrderOfCommodities.Add(orderOfCommodity_1);
           new MyCommodityOrderRepository().SaveOrUpdate(myCommodityOrder);


           Shop shop2 = new Shop()
           {
               Activity = "清仓甩卖",
               Address = "济南市历下区文化东路30号",
               Bulletins = "9折优惠",
               Description = "just come",
               Distance = "100",
               Email = "222@qq.com",
               Logo = "image/21222.jpg",
               Name = "银座连锁购物中心",
               Owener = "姜文",
               ShortName = "银座",
               Tel = "18799999992",
               Rate = 0.8,
               ShopStatus = ShopStatusEnum.营业时间,
               MerchantCategory = iMerchantCategoryRepository.SearchByMerchantCategoryName("综合购物中心"),
               MerchantType = MerchantTypeEnum.租房
           };
           MerchantGoodsType shopCommodityTye_12 = new MerchantGoodsType() { Merchant = shop2, GoodsType = "金制品" };
           MerchantGoodsType shopCommodityTye_22 = new MerchantGoodsType() { Merchant = shop2, GoodsType = "茶叶" };
           shop2.MerchantGoodsTypes.Add(shopCommodityTye_12);
           shop2.MerchantGoodsTypes.Add(shopCommodityTye_22);
           new ShopRepository().SaveOrUpdate(shop2);

           LoginUser lu2 = new LoginUser();
           lu2.LoginName = "shopyinzuo";
           lu2.Password = "000000";
           iLoginUserRepository.SaveOrUpdate(lu2);

           LoginUserOfMerchant lum2 = new LoginUserOfMerchant();
           lum2.Merchant = shop2;
           lum2.LoginUser = lu2;
           iLoginUserOfMerchantRepository.SaveOrUpdate(lum2);

           UserInRole uir2 = new UserInRole();
           uir2.LoginUser = lu2;
           uir2.SystemRole = iSystemRoleRepository.GetRoleByName("商店店主");
           iUserInRoleRepository.SaveOrUpdate(uir2);

           LoginUser lu1_2 = new LoginUser();
           lu1_2.LoginName = "shopyinzuoxiaoer";
           lu1_2.Password = "111111";
           iLoginUserRepository.SaveOrUpdate(lu1_2);

           LoginUserOfMerchant lum1_2 = new LoginUserOfMerchant();
           lum1_2.Merchant = shop2;
           lum1_2.LoginUser = lu1_2;
           iLoginUserOfMerchantRepository.SaveOrUpdate(lum1_2);

           UserInRole uir1_2 = new UserInRole();
           uir1_2.LoginUser = lu1_2;
           uir1_2.SystemRole = iSystemRoleRepository.GetRoleByName("商店店小二");
           iUserInRoleRepository.SaveOrUpdate(uir1_2);

           Commodity commodity_12 = new Commodity()
           {
               Name = "金戒指",
               Price = 10,
               Image = "image/1212.jpg",
               IsDiscount = false,
               InventoryCount = 100,
               MerchantGoodsType = shopCommodityTye_12,
               Shop= shop2,
           };
           shop1.Commodities.Add(commodity_12);

           Commodity commodity_22 = new Commodity()
           {
               Name = "铁观音",
               Price = 15,
               Image = "image/121.png",
               IsDiscount = true,
               InventoryCount = 200,
               DiscountInventoryCount = 100,
               MerchantGoodsType = shopCommodityTye_22,
               DiscountPrice = 10,
               Shop= shop2,
               IsLimited = true,
           };
           shop2.Commodities.Add(commodity_22);
           new ShopRepository().SaveOrUpdate(shop2);

           //添加顾客鲁豫
           SystemUser s2 = new SystemUser()
           {
               Tel = "13988888888",
               Description = "erhuan10",
               Email = "ocam10@163.com",
               EntityIndex = 10,
               Name = "鲁豫",
               IsAnonymous = false,
           };
           new SystemUserRepository().SaveOrUpdate(s2);
           Address address12 = new Address()
           {
               AddressName = "青岛市四方区和平小区3220",
               BackupTel = "187000000000",
               Email = "23423@163.com",
               Linkman = "john",
               QQ = "3333333333",
               Tel = "18668668686",
               Weixin = "5862414855",
               SystemUser = s2
           };
           //s1.Addresses.Add(address);
           new AddressRepository().SaveOrUpdate(address12);
           Address address22 = new Address()
           {
               AddressName = "青岛市市南区贵和小区4112",
               BackupTel = "18711111111111",
               Email = "23423@163.com",
               Linkman = "john",
               QQ = "66666666",
               Tel = "18668668686",
               Weixin = "5862414855",
               SystemUser = s2
           };
           //s1.Addresses.Add(address2);
           new AddressRepository().SaveOrUpdate(address22);

           LoginUser sysLoginUser2 = new LoginUser()
           {
               SystemUser = s2,
               IsAdmin = false,
               LoginName = "shopluyu",
               Password = "000000",

           };
           //s1.LoginUser = sysLoginUser;
           new LoginUserRepository().SaveOrUpdate(sysLoginUser2);

           UserInRole uir12 = new UserInRole();
           uir12.LoginUser = sysLoginUser2;
           uir12.SystemRole = iSystemRoleRepository.GetRoleByName("顾客");
           iUserInRoleRepository.SaveOrUpdate(uir12);

           var add2 = s2.Addresses.FirstOrDefault();
           MyCommodityOrder myCommodityOrder2 = new MyCommodityOrder()
           {
               Address = address22.AddressName,
               Linkman = address22.Linkman,
               SystemUser = s2,
               EntityIndex = 1,
               Tel = address22.Tel,
               Shop= shop2,
               OrderNumber = DateTime.Now.ToString("yyyyMMddhhmmssfff"),  //2013-02-10 TODO basilwang need use id policy
               OrderStatus = MyOrderStatusEnum.成功,
               SendTime = "11:20",
               Description = ""
           };

           OrderOfCommodity orderOfCommodity_12 = new OrderOfCommodity()
           {
               Amount = 2,
               MyCommodityOrder = myCommodityOrder2,
               Price = commodity_12.Price,
               Commodity = commodity_12,
               EntityIndex = 1
           };
           myCommodityOrder2.OrderOfCommodities.Add(orderOfCommodity_12);

           OrderOfCommodity orderOfCommodity_22 = new OrderOfCommodity()
           {
               Amount = 2,
               MyCommodityOrder = myCommodityOrder2,
               Price = commodity_22.Price,
               Commodity = commodity_22,
               EntityIndex = 1
           };
           myCommodityOrder2.OrderOfCommodities.Add(orderOfCommodity_12);
           new MyCommodityOrderRepository().SaveOrUpdate(myCommodityOrder2);
       
        }
    }
}


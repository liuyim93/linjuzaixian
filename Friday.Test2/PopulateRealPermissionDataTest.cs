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
        //private IList<SystemMenu> restaruantOwnerMenuCheckList = new List<SystemMenu>();
        //private IList<SystemMenu> rentOwnerMenuCheckList = new List<SystemMenu>();
        private IList<SystemMenu> shopMemberMenuCheckList = new List<SystemMenu>();
        //private IList<SystemMenu> restaurantMemberMenuCheckList = new List<SystemMenu>();
        //private IList<SystemMenu> rentMemberMenuCheckList = new List<SystemMenu>();

        //每个角色拥有的特点权限的功能点,需要根据实际情况维护
        private IList<SystemFunctionObject> adminSFOCheckList = new List<SystemFunctionObject>();
        private IList<SystemFunctionObject> customerSFOCheckList = new List<SystemFunctionObject>();
        private IList<SystemFunctionObject> shopOwnerSFOCheckList = new List<SystemFunctionObject>();
        //private IList<SystemFunctionObject> restaruantOwnerSFOCheckList = new List<SystemFunctionObject>();
        //private IList<SystemFunctionObject> rentOwnerSFOCheckList = new List<SystemFunctionObject>();
        private IList<SystemFunctionObject> shopMemberSFOCheckList = new List<SystemFunctionObject>();
        //private IList<SystemFunctionObject> restaurantMemberSFOCheckList = new List<SystemFunctionObject>();
        //private IList<SystemFunctionObject> rentMemberSFOCheckList = new List<SystemFunctionObject>();
        ISystemRoleRepository iSystemRoleRepository = UnityHelper.UnityToT<ISystemRoleRepository>();
        ISystemFunctionObjectRepository iSystemFunctionObjectRepository = UnityHelper.UnityToT<ISystemFunctionObjectRepository>();
        private LoginUser adminLoginUser;
        private IList<SystemRole> systemRoleList = new List<SystemRole>();
        //private List<SystemRole> systemRoleList = new List<SystemRole>();

        [SetUp]
        public void init()
        {
            //添加角色和admin账号
            add_Random_SystemRoles();
            add_Anonymous_SystemUsers();
            //添加菜单
            add_Random_SystemMenus();
            //添加关联
            add_Random_RoleInMenus();

            //初始化功能键
            ISystemFunctionObjectService iSystemFunctionObjectService = UnityHelper.UnityToT<ISystemFunctionObjectService>();
            iSystemFunctionObjectService.Generate();
            //添加关联
            add_ObjectInRole();
            //添加全局商品类型
            add_GlobalGoodsType();
            //添加商店分类
            add_MerchantCategory();
            //添加商铺的相关信息
            //add_RestaurantInfo();
            //add_RentInfo();
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

            //添加管理员admin  LoginUser
            adminLoginUser = new LoginUser()
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

            //SystemRole restaruantOwner = new SystemRole()
            //{
            //    Name = "餐馆店主",
            //};
            //iSystemRoleRepository.SaveOrUpdate(restaruantOwner);

            //SystemRole rentOwner = new SystemRole()
            //{
            //    Name = "租房店主",
            //};
            //iSystemRoleRepository.SaveOrUpdate(rentOwner);

            SystemRole shopMember = new SystemRole()
            {
                Name = "商店店小二",
            };
            iSystemRoleRepository.SaveOrUpdate(shopMember);

            //SystemRole restaurantMember = new SystemRole()
            //{
            //    Name = "餐馆店小二",
            //};
            //iSystemRoleRepository.SaveOrUpdate(restaurantMember);

            //SystemRole rentMember = new SystemRole()
            //{
            //    Name = "租房店小二",
            //};
            //iSystemRoleRepository.SaveOrUpdate(rentMember);
        }
        //添加匿名用户
        private void add_Anonymous_SystemUsers()
        {
            IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>();
          
            SystemUser sysu1 = new SystemUser()
            {
                 IsAnonymous=true,
                 Name="匿名用户sys1",                  
            };
            LoginUser lu1 = new LoginUser()
            {
                LoginName = "匿名用户1",
                Password = "111111",
                IsAdmin = false,
                SystemUser = sysu1
            };
            iLoginUserRepository.SaveOrUpdate(lu1);

            SystemUser sysu2 = new SystemUser()
            {
                IsAnonymous = true,
                Name = "匿名用户sys2",
            };
            LoginUser lu2 = new LoginUser()
            {
                LoginName = "匿名用户2",
                Password = "222222",
                IsAdmin = false,
                SystemUser = sysu2
            };
            iLoginUserRepository.SaveOrUpdate(lu2);
        }
        //添加菜单
        private void add_Random_SystemMenus()
        {
            IRepository<SystemMenu> iSystemMenuRepository = UnityHelper.UnityToT<IRepository<SystemMenu>>();

            ////餐馆模块
            //SystemMenu restaurantModel = new SystemMenu()
            //{
            //    Name = "餐馆模块",
            //    Leaf = false,
            //    ParentID = null,
            //    TLevel = 0,
            //    ColIndex = 1

            //};
            //iSystemMenuRepository.SaveOrUpdate(restaurantModel);
            //adminMenuCheckList.Add(restaurantModel);
            //restaruantOwnerMenuCheckList.Add(restaurantModel);
            //restaurantMemberMenuCheckList.Add(restaurantModel);
           
            //SystemMenu restaurantMange = new SystemMenu()
            //{
            //    Name = "餐馆管理",
            //    Leaf = true,
            //    ParentID = restaurantModel.Id,
            //    MenuRoute = "restaurant/pRestaurantList.aspx",
            //    TLevel = 1,
            //    ColIndex = 1
            //};
            //iSystemMenuRepository.SaveOrUpdate(restaurantMange);
            //adminMenuCheckList.Add(restaurantMange);
            //restaruantOwnerMenuCheckList.Add(restaurantMange);

            //SystemMenu foodOrderDetail = new SystemMenu()
            //{
            //    Name = "订单明细管理",
            //    Leaf = true,
            //    ParentID = restaurantModel.Id,
            //    MenuRoute = "orderOfFood/pOrderOfFoodList.aspx",
            //    TLevel = 1,
            //    ColIndex = 2
            //};
            //iSystemMenuRepository.SaveOrUpdate(foodOrderDetail);
            //adminMenuCheckList.Add(foodOrderDetail);
            //restaruantOwnerMenuCheckList.Add(foodOrderDetail);
            //restaurantMemberMenuCheckList.Add(foodOrderDetail);
         

            //SystemMenu foodOrder = new SystemMenu()
            //{
            //    Name = "食品订单管理",
            //    Leaf = true,
            //    ParentID = restaurantModel.Id,
            //    MenuRoute = "myFoodOrder/pMyFoodOrderList.aspx",
            //    TLevel = 1,
            //    ColIndex = 3
            //};
            //iSystemMenuRepository.SaveOrUpdate(foodOrder);
            //adminMenuCheckList.Add(foodOrder);
            //restaruantOwnerMenuCheckList.Add(foodOrder);
            //restaurantMemberMenuCheckList.Add(foodOrder);
          

            //SystemMenu food = new SystemMenu()
            //{
            //    Name = "菜品管理",
            //    Leaf = true,
            //    ParentID = restaurantModel.Id,
            //    MenuRoute = "food/pFoodList.aspx",
            //    TLevel = 1,
            //    ColIndex = 4
            //};
            //iSystemMenuRepository.SaveOrUpdate(food);
            //adminMenuCheckList.Add(food);
            //restaruantOwnerMenuCheckList.Add(food);
            //restaurantMemberMenuCheckList.Add(food);

            //SystemMenu restaurantEditMange = new SystemMenu()
            //{
            //    Name = "餐馆编辑",
            //    Leaf = true,
            //    ParentID = restaurantModel.Id,
            //    MenuRoute = "restaurant/pEditRestaurant.aspx",
            //    TLevel = 1,
            //    ColIndex = 5
            //};
            //iSystemMenuRepository.SaveOrUpdate(restaurantEditMange);
            //restaruantOwnerMenuCheckList.Add(restaurantEditMange);

            //SystemMenu valuingOfMyFoodOrder = new SystemMenu()
            //{
            //    Name = "餐馆订单评价管理",
            //    Leaf = true,
            //    ParentID = restaurantModel.Id,
            //    MenuRoute = "valuingOfMyFoodOrder/pValuingOfMyFoodOrderList.aspx",
            //    TLevel = 1,
            //    ColIndex = 6
            //};
            //iSystemMenuRepository.SaveOrUpdate(valuingOfMyFoodOrder);
            //adminMenuCheckList.Add(valuingOfMyFoodOrder);
            //restaruantOwnerMenuCheckList.Add(valuingOfMyFoodOrder);
            //restaurantMemberMenuCheckList.Add(valuingOfMyFoodOrder);

            //SystemMenu valuingItemOfMyFoodOrder = new SystemMenu()
            //{
            //    Name = "食品评价项管理",
            //    Leaf = true,
            //    ParentID = restaurantModel.Id,
            //    MenuRoute = "valuingItemOfMyFoodOrder/pValuingItemOfMyFoodOrderList.aspx",
            //    TLevel = 1,
            //    ColIndex = 7
            //};
            //iSystemMenuRepository.SaveOrUpdate(valuingItemOfMyFoodOrder);
            //adminMenuCheckList.Add(valuingItemOfMyFoodOrder);
            //restaruantOwnerMenuCheckList.Add(valuingItemOfMyFoodOrder);
            //restaurantMemberMenuCheckList.Add(valuingItemOfMyFoodOrder);

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
            //restaruantOwnerMenuCheckList.Add(baseInfo);
            customerMenuCheckList.Add(baseInfo);
            //restaurantMemberMenuCheckList.Add(baseInfo);
            shopOwnerMenuCheckList.Add(baseInfo);
            shopMemberMenuCheckList.Add(baseInfo);
            //rentOwnerMenuCheckList.Add(baseInfo);
            //rentMemberMenuCheckList.Add(baseInfo);

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

            //SystemMenu merchantGoodsType = new SystemMenu()
            //{
            //    Name = "自定义商品类型",
            //    Leaf = true,
            //    ParentID = baseInfo.Id,
            //    MenuRoute = "merchantGoodsType/pMerchantGoodsTypeList.aspx",
            //    TLevel = 1,
            //    ColIndex = 3
            //};
            //iSystemMenuRepository.SaveOrUpdate(merchantGoodsType);
            //adminMenuCheckList.Add(merchantGoodsType);
            //restaruantOwnerMenuCheckList.Add(merchantGoodsType);
            //restaurantMemberMenuCheckList.Add(merchantGoodsType);
            //shopOwnerMenuCheckList.Add(merchantGoodsType);
            //shopMemberMenuCheckList.Add(merchantGoodsType);
            //rentOwnerMenuCheckList.Add(merchantGoodsType);
            //rentMemberMenuCheckList.Add(merchantGoodsType);

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

            SystemMenu anonymousUser = new SystemMenu()
            {
                Name = "匿名账号管理",
                Leaf = true,
                ParentID = baseInfo.Id,
                MenuRoute = "systemUser/pAnonymousUserList.aspx",
                TLevel = 1,
                ColIndex = 6
            };
            iSystemMenuRepository.SaveOrUpdate(anonymousUser);
            adminMenuCheckList.Add(anonymousUser);
            customerMenuCheckList.Add(anonymousUser);

            SystemMenu merchantMember = new SystemMenu()
            {
                Name = "员工管理",
                Leaf = true,
                ParentID = baseInfo.Id,
                MenuRoute = "merchantEmployee/pMerchantEmployeeList.aspx",
                TLevel = 1,
                ColIndex = 7
            };
            iSystemMenuRepository.SaveOrUpdate(merchantMember);
            //adminMenuCheckList.Add(merchantMember);
            //restaruantOwnerMenuCheckList.Add(merchantMember);
            shopOwnerMenuCheckList.Add(merchantMember);
            //rentOwnerMenuCheckList.Add(merchantMember);

            SystemMenu loginUser = new SystemMenu()
            {
                Name = "商家账号管理",
                Leaf = true,
                ParentID = baseInfo.Id,
                MenuRoute = "loginUser/pLoginUserList.aspx",
                TLevel = 1,
                ColIndex = 8
            };
            iSystemMenuRepository.SaveOrUpdate(loginUser);
            adminMenuCheckList.Add(loginUser);
            //restaruantOwnerMenuCheckList.Add(loginUser);

            SystemMenu logUser = new SystemMenu()
            {
                Name = "商家账号编辑",
                Leaf = true,
                ParentID = baseInfo.Id,
                MenuRoute = "loginUser/pEditLoginUser.aspx",
                TLevel = 1,
                ColIndex = 9
            };
            iSystemMenuRepository.SaveOrUpdate(logUser);
            //adminMenuCheckList.Add(logUser);
            //restaruantOwnerMenuCheckList.Add(logUser);
            shopOwnerMenuCheckList.Add(logUser);
            //rentOwnerMenuCheckList.Add(logUser);

            SystemMenu systemRole = new SystemMenu()
            {
                Name = "角色权限管理",
                Leaf = true,
                ParentID = baseInfo.Id,
                MenuRoute = "systemRole/pSystemRoleList.aspx",
                TLevel = 1,
                ColIndex = 10
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
                ColIndex = 11
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
                ColIndex = 12
            };
            iSystemMenuRepository.SaveOrUpdate(school);
            adminMenuCheckList.Add(school);

            SystemMenu propid = new SystemMenu()
            {
                Name = "规格类型管理",
                Leaf = true,
                ParentID = baseInfo.Id,
                MenuRoute = "propID/pPropIDList.aspx",
                TLevel = 1,
                ColIndex = 13
            };
            iSystemMenuRepository.SaveOrUpdate(propid);
            adminMenuCheckList.Add(propid);
            shopOwnerMenuCheckList.Add(propid);
            shopMemberMenuCheckList.Add(propid);
            //restaruantOwnerMenuCheckList.Add(propid);
            //restaurantMemberMenuCheckList.Add(propid);
            //rentOwnerMenuCheckList.Add(propid);
            //rentMemberMenuCheckList.Add(propid);

            SystemMenu propvalue = new SystemMenu()
            {
                Name = "规格明细管理",
                Leaf = true,
                ParentID = baseInfo.Id,
                MenuRoute = "propValue/pPropValueList.aspx",
                TLevel = 1,
                ColIndex = 13
            };
            iSystemMenuRepository.SaveOrUpdate(propvalue);
            adminMenuCheckList.Add(propvalue);
            shopOwnerMenuCheckList.Add(propvalue);
            shopMemberMenuCheckList.Add(propvalue);
            //restaruantOwnerMenuCheckList.Add(propid);
            //restaurantMemberMenuCheckList.Add(propid);
            //rentOwnerMenuCheckList.Add(propid);
            //rentMemberMenuCheckList.Add(propid);

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
            //restaruantOwnerMenuCheckList.Add(valuingComments);
            //customerMenuCheckList.Add(valuingComments);
            //restaurantMemberMenuCheckList.Add(valuingComments);
            //shopOwnerMenuCheckList.Add(valuingComments);
            //shopMemberMenuCheckList.Add(valuingComments);
            //rentOwnerMenuCheckList.Add(valuingComments);
            //rentMemberMenuCheckList.Add(valuingComments);

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
            //restaruantOwnerMenuCheckList.Add(messageModel);
            customerMenuCheckList.Add(messageModel);
            //restaurantMemberMenuCheckList.Add(messageModel);
            shopOwnerMenuCheckList.Add(messageModel);
            shopMemberMenuCheckList.Add(messageModel);
            //rentOwnerMenuCheckList.Add(messageModel);
            //rentMemberMenuCheckList.Add(messageModel);

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
            //restaruantOwnerMenuCheckList.Add(message);
            customerMenuCheckList.Add(message);
            //restaurantMemberMenuCheckList.Add(message);
            shopOwnerMenuCheckList.Add(message);
            shopMemberMenuCheckList.Add(message);
            //rentOwnerMenuCheckList.Add(message);
            //rentMemberMenuCheckList.Add(message);

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
            //restaruantOwnerMenuCheckList.Add(feedBackModel);
            customerMenuCheckList.Add(feedBackModel);
            //restaurantMemberMenuCheckList.Add(feedBackModel);
            shopOwnerMenuCheckList.Add(feedBackModel);
            shopMemberMenuCheckList.Add(feedBackModel);
            //rentOwnerMenuCheckList.Add(feedBackModel);
            //rentMemberMenuCheckList.Add(feedBackModel);

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
            //restaruantOwnerMenuCheckList.Add(feedBack);
            customerMenuCheckList.Add(feedBack);
            //restaurantMemberMenuCheckList.Add(feedBack);
            shopOwnerMenuCheckList.Add(feedBack);
            shopMemberMenuCheckList.Add(feedBack);
            //rentOwnerMenuCheckList.Add(feedBack);
            //rentMemberMenuCheckList.Add(feedBack);

            //SystemMenu feedBackReply = new SystemMenu()
            //{
            //    Name = "反馈回复",
            //    Leaf = true,
            //    ParentID = feedBackModel.Id,
            //    MenuRoute = "feedBack/pFeedBackList.aspx",
            //    TLevel = 1,
            //    ColIndex = 2
            //};
            //iSystemMenuRepository.SaveOrUpdate(feedBackReply);
            //adminMenuCheckList.Add(feedBackReply);
            //restaruantOwnerMenuCheckList.Add(feedBackReply);
            //customerMenuCheckList.Add(feedBackReply);
            //restaurantMemberMenuCheckList.Add(feedBackReply);

            //租房模块
            //SystemMenu rentModel = new SystemMenu()
            //{
            //    Name = "租房模块",
            //    Leaf = false,
            //    ParentID = null,
            //    TLevel = 0,
            //    ColIndex = 5

            //};
            //iSystemMenuRepository.SaveOrUpdate(rentModel);
            //adminMenuCheckList.Add(rentModel);
            //rentOwnerMenuCheckList.Add(rentModel);
            //rentMemberMenuCheckList.Add(rentModel);

            //SystemMenu rentMange = new SystemMenu()
            //{
            //    Name = "租房管理",
            //    Leaf = true,
            //    ParentID = rentModel.Id,
            //    MenuRoute = "rent/pRentList.aspx",
            //    TLevel = 1,
            //    ColIndex = 1
            //};
            //iSystemMenuRepository.SaveOrUpdate(rentMange);
            //adminMenuCheckList.Add(rentMange);
            ////rentOwnerMenuCheckList.Add(rentMange);

            //SystemMenu rentEdit = new SystemMenu()
            //{
            //    Name = "租房编辑",
            //    Leaf = true,
            //    ParentID = rentModel.Id,
            //    MenuRoute = "rent/pEditRent.aspx",
            //    TLevel = 1,
            //    ColIndex = 2
            //};
            //iSystemMenuRepository.SaveOrUpdate(rentEdit);
            ////adminMenuCheckList.Add(rentEdit);
            //rentOwnerMenuCheckList.Add(rentEdit);

            //SystemMenu houseOrderDetail = new SystemMenu()
            //{
            //    Name = "租房订单明细管理",
            //    Leaf = true,
            //    ParentID = rentModel.Id,
            //    MenuRoute = "orderOfHouse/pOrderOfHouseList.aspx",
            //    TLevel = 1,
            //    ColIndex = 3
            //};
            //iSystemMenuRepository.SaveOrUpdate(houseOrderDetail);
            //adminMenuCheckList.Add(houseOrderDetail);
            //rentOwnerMenuCheckList.Add(houseOrderDetail);
            //rentMemberMenuCheckList.Add(houseOrderDetail);

            //SystemMenu houseOrder = new SystemMenu()
            //{
            //    Name = "租房订单管理",
            //    Leaf = true,
            //    ParentID = rentModel.Id,
            //    MenuRoute = "myHouseOrder/pMyHouseOrderList.aspx",
            //    TLevel = 1,
            //    ColIndex = 4
            //};
            //iSystemMenuRepository.SaveOrUpdate(houseOrder);
            //adminMenuCheckList.Add(houseOrder);
            //rentOwnerMenuCheckList.Add(houseOrder);
            //rentMemberMenuCheckList.Add(houseOrder);

            //SystemMenu house = new SystemMenu()
            //{
            //    Name = "房屋管理",
            //    Leaf = true,
            //    ParentID = rentModel.Id,
            //    MenuRoute = "house/pHouseList.aspx",
            //    TLevel = 1,
            //    ColIndex = 5
            //};
            //iSystemMenuRepository.SaveOrUpdate(house);
            //adminMenuCheckList.Add(house);
            //rentOwnerMenuCheckList.Add(house);
            //rentMemberMenuCheckList.Add(house);

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

            //SystemMenu valuingOfMyHouseOrder = new SystemMenu()
            //{
            //    Name = "租房订单评价管理",
            //    Leaf = true,
            //    ParentID = rentModel.Id,
            //    MenuRoute = "valuingOfMyHouseOrder/pValuingOfMyHouseOrderList.aspx",
            //    TLevel = 1,
            //    ColIndex = 6
            //};
            //iSystemMenuRepository.SaveOrUpdate(valuingOfMyHouseOrder);
            //adminMenuCheckList.Add(valuingOfMyHouseOrder);
            //rentOwnerMenuCheckList.Add(valuingOfMyHouseOrder);
            //rentMemberMenuCheckList.Add(valuingOfMyHouseOrder);

            //SystemMenu valuingItemOfMyHouseOrder = new SystemMenu()
            //{
            //    Name = "房屋评价项管理",
            //    Leaf = true,
            //    ParentID = rentModel.Id,
            //    MenuRoute = "valuingItemOfMyHouseOrder/pValuingItemOfMyHouseOrderList.aspx",
            //    TLevel = 1,
            //    ColIndex = 7
            //};
            //iSystemMenuRepository.SaveOrUpdate(valuingItemOfMyHouseOrder);
            //adminMenuCheckList.Add(valuingItemOfMyHouseOrder);
            //rentOwnerMenuCheckList.Add(valuingItemOfMyHouseOrder);
            //rentMemberMenuCheckList.Add(valuingItemOfMyHouseOrder);

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
            shopOwnerMenuCheckList.Add(shopModel);
            shopMemberMenuCheckList.Add(shopModel);

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
            shopOwnerMenuCheckList.Add(shopEditMange);

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
            shopOwnerMenuCheckList.Add(commodity);
            shopMemberMenuCheckList.Add(commodity);

            //SystemMenu commodityOrderDetail = new SystemMenu()
            //{
            //    Name = "订单明细管理",
            //    Leaf = true,
            //    ParentID = shopModel.Id,
            //    MenuRoute = "orderOfCommodity/pOrderOfCommodityList.aspx",
            //    TLevel = 1,
            //    ColIndex = 4
            //};
            //iSystemMenuRepository.SaveOrUpdate(commodityOrderDetail);
            //adminMenuCheckList.Add(commodityOrderDetail);
            //shopOwnerMenuCheckList.Add(commodityOrderDetail);
            //shopMemberMenuCheckList.Add(commodityOrderDetail);

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
            shopOwnerMenuCheckList.Add(commodityOrder);
            shopMemberMenuCheckList.Add(commodityOrder);

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
            shopOwnerMenuCheckList.Add(valuingOfMyCommodityOrder);
            shopMemberMenuCheckList.Add(valuingOfMyCommodityOrder);

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
            shopOwnerMenuCheckList.Add(valuingItemOfMyCommodityOrder);
            shopMemberMenuCheckList.Add(valuingItemOfMyCommodityOrder);

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

            //SystemMenu restaurantStatistic = new SystemMenu()
            //{
            //    Name = "餐馆统计",
            //    Leaf = true,
            //    ParentID = statisticModel.Id,
            //    MenuRoute = "restaurantStatistic/pRestaurantStatisticList.aspx",
            //    TLevel = 1,
            //    ColIndex = 3
            //};
            //iSystemMenuRepository.SaveOrUpdate(restaurantStatistic);
            //adminMenuCheckList.Add(restaurantStatistic);

            //SystemMenu foodStatistic = new SystemMenu()
            //{
            //    Name = "食品统计",
            //    Leaf = true,
            //    ParentID = statisticModel.Id,
            //    MenuRoute = "foodStatistic/pFoodStatisticList.aspx",
            //    TLevel = 1,
            //    ColIndex = 4
            //};
            //iSystemMenuRepository.SaveOrUpdate(foodStatistic);
            //adminMenuCheckList.Add(foodStatistic);

            //SystemMenu rentStatistic = new SystemMenu()
            //{
            //    Name = "租房统计",
            //    Leaf = true,
            //    ParentID = statisticModel.Id,
            //    MenuRoute = "rentStatistic/pRentStatisticList.aspx",
            //    TLevel = 1,
            //    ColIndex = 5
            //};
            //iSystemMenuRepository.SaveOrUpdate(rentStatistic);
            //adminMenuCheckList.Add(rentStatistic);

            //SystemMenu houseStatistic = new SystemMenu()
            //{
            //    Name = "房屋统计",
            //    Leaf = true,
            //    ParentID = statisticModel.Id,
            //    MenuRoute = "houseStatistic/pHouseStatisticList.aspx",
            //    TLevel = 1,
            //    ColIndex = 6
            //};
            //iSystemMenuRepository.SaveOrUpdate(houseStatistic);
            //adminMenuCheckList.Add(houseStatistic);

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
                            //foreach (SystemMenu sm in customerMenuCheckList)
                            //{
                            //    RoleInMenu roleInMenu = new RoleInMenu();
                            //    roleInMenu.SystemMenu = sm;
                            //    roleInMenu.SystemRole = sr;
                            //    iRoleInMenuRepository.SaveOrUpdate(roleInMenu);
                            //}
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
                    //case "餐馆店主":
                    //    {
                    //        foreach (SystemMenu sm in restaruantOwnerMenuCheckList)
                    //        {
                    //            RoleInMenu roleInMenu = new RoleInMenu();
                    //            roleInMenu.SystemMenu = sm;
                    //            roleInMenu.SystemRole = sr;
                    //            iRoleInMenuRepository.SaveOrUpdate(roleInMenu);
                    //        }
                    //        break;
                    //    }
                    //case "租房店主":
                    //    {
                    //        foreach (SystemMenu sm in rentOwnerMenuCheckList)
                    //        {
                    //            RoleInMenu roleInMenu = new RoleInMenu();
                    //            roleInMenu.SystemMenu = sm;
                    //            roleInMenu.SystemRole = sr;
                    //            iRoleInMenuRepository.SaveOrUpdate(roleInMenu);
                    //        }
                    //        break;
                    //    }
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
                    //case "餐馆店小二":
                    //    {
                    //        foreach (SystemMenu sm in restaurantMemberMenuCheckList)
                    //        {
                    //            RoleInMenu roleInMenu = new RoleInMenu();
                    //            roleInMenu.SystemMenu = sm;
                    //            roleInMenu.SystemRole = sr;
                    //            iRoleInMenuRepository.SaveOrUpdate(roleInMenu);
                    //        }
                    //        break;
                    //    }
                    //case "租房店小二":
                    //    {
                    //        foreach (SystemMenu sm in rentMemberMenuCheckList)
                    //        {
                    //            RoleInMenu roleInMenu = new RoleInMenu();
                    //            roleInMenu.SystemMenu = sm;
                    //            roleInMenu.SystemRole = sr;
                    //            iRoleInMenuRepository.SaveOrUpdate(roleInMenu);
                    //        }
                    //        break;
                    //    }
                }
            }
        }

        //提取角色和功能点关联的公共函数
        public SystemFunctionObjectInRole GetFuncObjInRoleByi(string i)
        {
            string[] fncOgj = i.Split(',');
            SystemFunctionObject sysFuncObj = iSystemFunctionObjectRepository.GetSystemFunctionObjectByName(fncOgj[0]);
            SystemFunctionObjectInRole sysFuncObjInRole = new SystemFunctionObjectInRole();
            sysFuncObjInRole.SystemFunctionObject = sysFuncObj;
            if (fncOgj.Length == 1) 
            {
                sysFuncObjInRole.Deletable = sysFuncObj.DeletePermissionAvailable;
                sysFuncObjInRole.Editable = sysFuncObj.EditPermissionAvailable;
                sysFuncObjInRole.Enabled = sysFuncObj.FunctionAvailable;
            }
            else 
            {
                foreach (var j in fncOgj)
                {
                    if (j == "Edit")
                    {
                        sysFuncObjInRole.Editable = true;
                    }
                    if (j == "Enable")
                    {
                        sysFuncObjInRole.Enabled = true;
                    }
                    if (j == "Delete")
                    {
                        sysFuncObjInRole.Deletable = true;
                    }
                }
            }          
            return sysFuncObjInRole;
        }

        //角色和功能点的关联
        private void add_ObjectInRole()
        {
            IRepository<SystemFunctionObjectInRole> iSystemFunctionObjectInRoleRepository = UnityHelper.UnityToT<IRepository<SystemFunctionObjectInRole>>();
           
            systemRoleList = iSystemRoleRepository.GetAll();

            IList<SystemFunctionObject> customerList = new List<SystemFunctionObject>();
            adminSFOCheckList = iSystemFunctionObjectRepository.GetAll();

            string[] customerArr = { };// { "基本信息模块", "顾客账号维护", "评论回复管理", "消息模块", "消息维护", "反馈模块", "反馈维护", "反馈管理", "餐馆模块","食品订单维护权限" };
            foreach (var i in customerArr)
            {
                List<DataFilter> customerFilterList = new List<DataFilter>();          
                customerFilterList.Add(new DataFilter()
                {
                    type = "FunctionObjectName",
                    value = i
                });
                customerSFOCheckList = iSystemFunctionObjectRepository.Search(customerFilterList);
                foreach (var j in customerSFOCheckList)
                {
                    customerList.Add(j);
                }
            }           

            IList<SystemFunctionObjectInRole> sysFuncObjInShopOwnerRolerList = new List<SystemFunctionObjectInRole>();
            string[] shopArr = { "基本信息模块", "商店模块", "商店维护,Edit", "商品维护", "商品订单维护", "商品订单明细维护", "商店订单评价管理", "商品评价项管理,Enable", "商品评价项评分管理,Enable", "员工维护", "规格类型维护", "规格明细维护", "商家账号维护,Edit", "评论回复管理,Enable", "消息模块", "消息维护,Enable,Delete", "反馈模块", "反馈维护,Enable" };
            foreach (var i in shopArr)
            {
                sysFuncObjInShopOwnerRolerList.Add(GetFuncObjInRoleByi(i));
            }

            IList<SystemFunctionObjectInRole> sysFuncObjInShopEmpRolerList = new List<SystemFunctionObjectInRole>();
            string[] shopEmpArr = { "基本信息模块", "商店模块", "商品维护", "商品订单维护", "商品订单明细维护", "商店订单评价管理", "商品评价项管理,Enable", "商品评价项评分管理,Enable", "规格类型维护", "规格明细维护", "评论回复管理,Enable", "消息模块", "消息维护,Enable,Delete", "反馈模块", "反馈维护,Enable" };
            foreach (var i in shopEmpArr)
            {
                sysFuncObjInShopEmpRolerList.Add(GetFuncObjInRoleByi(i));
            }

            //IList<SystemFunctionObjectInRole> sysFuncObjInRestaurantOwnerRolerList = new List<SystemFunctionObjectInRole>();
            //string[] restaurantArr = { "基本信息模块", "餐馆模块", "餐馆维护,Edit", "菜品维护", "食品订单维护", "食品订单明细维护", "餐馆订单评价管理", "食品评价项管理,Enable", "食品评价项评分管理,Enable", "员工维护", "自定义商品类型维护", "商家账号维护,Edit", "评论回复管理,Enable", "消息模块", "消息维护,Enable,Delete", "反馈模块", "反馈维护,Enable" };
            //foreach (var i in restaurantArr)
            //{
            //    sysFuncObjInRestaurantOwnerRolerList.Add(GetFuncObjInRoleByi(i));
            //}

            //IList<SystemFunctionObjectInRole> sysFuncObjInRestaurantEmpRolerList = new List<SystemFunctionObjectInRole>();
            //string[] restaurantEmpArr = { "基本信息模块", "餐馆模块", "菜品维护", "食品订单维护", "食品订单明细维护", "餐馆订单评价管理", "食品评价项管理,Enable", "食品评价项评分管理,Enable", "自定义商品类型维护", "评论回复管理,Enable", "消息模块", "消息维护,Enable,Delete", "反馈模块", "反馈维护,Enable" };
            //foreach (var i in restaurantEmpArr)
            //{
            //    sysFuncObjInRestaurantEmpRolerList.Add(GetFuncObjInRoleByi(i));
            //}

            //IList<SystemFunctionObjectInRole> sysFuncObjInRentOwnerRolerList = new List<SystemFunctionObjectInRole>();
            //string[] rentArr = { "基本信息模块", "租房模块", "租房维护,Edit", "房屋维护", "租房订单维护", "租房订单明细维护", "租房订单评价管理", "房屋评价项管理,Enable", "房屋评价项评分管理,Enable", "员工维护", "自定义商品类型维护", "商家账号维护,Edit", "评论回复管理,Enable", "消息模块", "消息维护,Enable,Delete", "反馈模块", "反馈维护,Enable" };
            //foreach (var i in rentArr)
            //{
            //    sysFuncObjInRentOwnerRolerList.Add(GetFuncObjInRoleByi(i));
            //}

            //IList<SystemFunctionObjectInRole> sysFuncObjInRentEmpRolerList = new List<SystemFunctionObjectInRole>();
            //string[] rentEmpArr = { "基本信息模块", "租房模块", "房屋维护", "租房订单维护", "租房订单明细维护", "租房订单评价管理", "房屋评价项管理,Enable", "房屋评价项评分管理,Enable", "自定义商品类型维护", "评论回复管理,Enable", "消息模块", "消息维护,Enable,Delete", "反馈模块", "反馈维护,Enable" };
            //foreach (var i in rentEmpArr)
            //{
            //    sysFuncObjInRentEmpRolerList.Add(GetFuncObjInRoleByi(i));
            //}

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

                            foreach (SystemFunctionObjectInRole shopSFunctionInRole in sysFuncObjInShopOwnerRolerList)
                            {
                                shopSFunctionInRole.SystemRole = sr;
                                iSystemFunctionObjectInRoleRepository.SaveOrUpdate(shopSFunctionInRole);
                            }
                            break;
                        }
                    //case "餐馆店主":
                    //    {
                    //        foreach (SystemFunctionObjectInRole restSFunctionInRole in sysFuncObjInRestaurantOwnerRolerList)
                    //        {
                    //            restSFunctionInRole.SystemRole = sr;
                    //            iSystemFunctionObjectInRoleRepository.SaveOrUpdate(restSFunctionInRole);
                    //        }
                    //        break;
                    //    }
                    //case "租房店主":
                    //    {
                    //        foreach (SystemFunctionObjectInRole rentSFunctionInRole in sysFuncObjInRentOwnerRolerList)
                    //        {
                    //            rentSFunctionInRole.SystemRole = sr;
                    //            iSystemFunctionObjectInRoleRepository.SaveOrUpdate(rentSFunctionInRole);
                    //        }
                    //        break;
                    //    }
                    case "商店店小二":
                        {
                            foreach (SystemFunctionObjectInRole shopEmpSFunctionInRole in sysFuncObjInShopEmpRolerList)
                            {
                                shopEmpSFunctionInRole.SystemRole = sr;
                                iSystemFunctionObjectInRoleRepository.SaveOrUpdate(shopEmpSFunctionInRole);
                            }
                            break;
                        }
                    //case "餐馆店小二":
                    //    {
                    //        foreach (SystemFunctionObjectInRole restEmpSFunctionInRole in sysFuncObjInRestaurantEmpRolerList)
                    //        {
                    //            restEmpSFunctionInRole.SystemRole = sr;
                    //            iSystemFunctionObjectInRoleRepository.SaveOrUpdate(restEmpSFunctionInRole);
                    //        }
                    //        break;
                    //    }
                    //case "租房店小二":
                    //    {
                    //        foreach (SystemFunctionObjectInRole rentEmpSFunctionInRole in sysFuncObjInRentEmpRolerList)
                    //        {
                    //            rentEmpSFunctionInRole.SystemRole = sr;
                    //            iSystemFunctionObjectInRoleRepository.SaveOrUpdate(rentEmpSFunctionInRole);
                    //        }
                    //        break;
                    //    }
                }
            }
        }
        //添加全局商品类型
        private void   add_GlobalGoodsType()
        {
            IGlobalGoodsTypeService iGlobalGoodsTypeService = UnityHelper.UnityToT<IGlobalGoodsTypeService>();

            //添加1级目录
            string[] firstCatg = { "国际品牌", "服装/内衣/配件", "鞋/箱包", "珠宝饰品/手表眼镜", "食品", "化妆品/个人护理 ", "手机数码", "家用电器", "家具建材", "家纺/居家", "母婴玩具", "医药保健", "全新整车/汽车配件", "图书音像", "文化娱乐", "充值/合约机/通信" };
            for (int i = 0; i < firstCatg.Length; i++)
            {
                GlobalGoodsType fgt = new GlobalGoodsType()
                {
                    Name = firstCatg[i],
                    Leaf = false,
                    TLevel = 0,
                    IsDelete = false,
                    Description = "1级目录",
                    //2013-05-09 basilwnag add Family
                    Family = "",
                    EntityIndex=i  //排序
                };
              iGlobalGoodsTypeService.Save(fgt);
            }
            
            //------添加2级目录---------
            //2级"国际品牌"
            string[] SecdForNational={"优衣库","Adidas GAP","飞利浦","微软","新百伦","Nike","兰芝","ELLE","Karicare"};
            for (int i = 0; i < SecdForNational.Length;i++ )
            {

                GlobalGoodsType sgtn = new GlobalGoodsType()
                {
                    ParentID = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("国际品牌").Id,
                    //2013-05-09 basilwnag add Family
                    Family = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("国际品牌").Family.Trim() + iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("国际品牌").Id + ",",
                    Name = SecdForNational[i],
                    Leaf = false,
                    TLevel = 1,
                    IsDelete = false,
                    Description = "2级目录—国际名牌"
                };
                iGlobalGoodsTypeService.Save(sgtn);
            }
            //2级"服装/内衣/配件"
            string[] SecdForClothes = { "女装","男装","内衣","针织衫","T恤","文胸","睡衣","男T恤","牛仔裤"};
            for (int i = 0; i < SecdForClothes.Length; i++)
            {

                GlobalGoodsType sgtc = new GlobalGoodsType()
                {
                    ParentID = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("服装/内衣/配件").Id,
                    //2013-05-09 basilwnag add Family
                    Family = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("服装/内衣/配件").Family.Trim() + iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("服装/内衣/配件").Id + ",",                
                    Name = SecdForClothes[i],
                    Leaf = false,
                    TLevel = 1,
                    IsDelete = false,
                    Description = "2级目录—服装/内衣/配件"
                };
                iGlobalGoodsTypeService.Save(sgtc);
            }
            //2级"鞋/箱包"
            string[] SecdForShoes = { "女鞋","男鞋","单鞋","休闲鞋","帆布鞋","女包","男包","旅行箱","帆布包","撞色包" };
            for (int i = 0; i < SecdForShoes.Length; i++)
            {

                GlobalGoodsType sgts = new GlobalGoodsType()
                {
                    ParentID = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("鞋/箱包").Id,
                    //2013-05-09 basilwnag add Family
                    Family = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("鞋/箱包").Family.Trim() + iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("鞋/箱包").Id + ",",
                    Name = SecdForShoes[i],
                    Leaf = false,
                    TLevel = 1,
                    IsDelete = false,
                    Description = "2级目录—鞋/箱包"
                };
                iGlobalGoodsTypeService.Save(sgts);
            }
            //2级"珠宝饰品/手表眼镜"
            string[] SecdForJewelry = { "珠宝/黄金", "手表", "饰品", "太阳镜", "ZIPPO", "钻石", "珍珠", "项链", "手镯" };
            for (int i = 0; i < SecdForJewelry.Length; i++)
            {

                GlobalGoodsType sgtj = new GlobalGoodsType()
                {
                    ParentID = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("珠宝饰品/手表眼镜").Id,
                    //2013-05-09 basilwnag add Family
                    Family = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("珠宝饰品/手表眼镜").Family.Trim() + iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("珠宝饰品/手表眼镜").Id + ",",
                    
                    Name = SecdForJewelry[i],
                    Leaf = false,
                    TLevel = 1,
                    IsDelete = false,
                    Description = "2级目录—珠宝饰品/手表眼镜"
                };
                iGlobalGoodsTypeService.Save(sgtj);
            }
            //2级"食品"
            string[] SecdForFood  = { "零食","粮油","生鲜","茶叶","坚果","冲饮","酒水","巧克力","进口食品" };
            for (int i = 0; i < SecdForFood.Length; i++)
            {

                GlobalGoodsType sgtf = new GlobalGoodsType()
                {
                    ParentID = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("食品").Id,
                    //2013-05-09 basilwnag add Family
                    Family = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("食品").Family.Trim() + iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("食品").Id + ",",
                    
                    Name = SecdForFood[i],
                    Leaf = false,
                    TLevel = 1,
                    IsDelete = false,
                    Description = "2级目录—食品"
                };
                iGlobalGoodsTypeService.Save(sgtf);
            }


            //2级"化妆品/个人护理"
            string[] SecdForMakeup = { "护肤", "彩妆", "洗护", "男士护肤", "卫生巾", "乳液", "面膜", "香水", "精华液", "BB霜" };
            for (int i = 0; i < SecdForMakeup.Length; i++)
            {

                GlobalGoodsType sgtm = new GlobalGoodsType()
                {
                    ParentID = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("化妆品/个人护理").Id,
                    //2013-05-09 basilwnag add Family
                    Family = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("化妆品/个人护理").Family.Trim() + iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("化妆品/个人护理").Id + ",",
                    
                    Name = SecdForMakeup[i],
                    Leaf = false,
                    TLevel = 1,
                    IsDelete = false,
                    Description = "2级目录—化妆品/个人护理"
                };
                iGlobalGoodsTypeService.Save(sgtm);
            }

            //------添加3级详细目录---------
            //3级“服装/内衣/配件”
            //"女装"
            string[] ThrdForWomenClothes = { "连衣裙","T恤","裤子","雪纺衫","衬衫","半身裙","吊带/背心","制服/校服","中老年服装","短外套","牛仔裤","大码女装","婚纱/礼服/旗袍","针织衫女士","唐装/中式服装","小西装","马甲","卫衣","风衣","PU外套" };
            for (int i = 0; i < ThrdForWomenClothes.Length; i++)
            {
                GlobalGoodsType sgwc = new GlobalGoodsType()
                {
                    ParentID = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("女装").Id,
                    //2013-05-09 basilwnag add Family
                    Family = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("女装").Family.Trim() + iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("女装").Id + ",",
                    
                    Name = ThrdForWomenClothes[i],
                    Leaf = false,
                    TLevel = 2,
                    IsDelete = false,
                    Description = "3级详细目录—精品女装"
                };
                iGlobalGoodsTypeService.Save(sgwc);
            }
            //"男装"
            string[] ThrdForMenClothes = { "热卖T恤","衬衫","POLO衫","休闲短裤","牛仔短裤","工装裤","针织衫男士","卫衣","西装夹克","风衣","背心/马甲","西裤","西服","套装","大码男装","中老年男装","设计潮牌"};
            for (int i = 0; i < ThrdForMenClothes.Length; i++)
            {
                GlobalGoodsType sgmc = new GlobalGoodsType()
                {
                    ParentID = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("男装").Id,
                    //2013-05-09 basilwnag add Family
                    Family = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("男装").Family.Trim() + iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("男装").Id + ",",
                    
                    Name = ThrdForMenClothes[i],
                    Leaf = false,
                    TLevel = 2,
                    IsDelete = false,
                    Description = "3级详细目录—精品男装"
                };
                iGlobalGoodsTypeService.Save(sgmc);
            }
            //"内衣"
            string[] ThrdForWomenInCloh = { "精品文胸","女式内裤","男式内裤","船袜","连裤袜","美腿塑形袜","塑身上衣","全棉内裤","聚拢文胸","光面文胸","少女文胸","塑身裤" };
            for (int i = 0; i < ThrdForWomenInCloh.Length; i++)
            {
                GlobalGoodsType sgwic = new GlobalGoodsType()
                {
                    ParentID = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("内衣").Id,
                    //2013-05-09 basilwnag add Family
                    Family = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("内衣").Family.Trim() + iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("内衣").Id + ",",
                    
                    Name = ThrdForWomenInCloh[i],
                    Leaf = false,
                    TLevel = 2,
                    IsDelete = false,
                    Description = "3级详细目录—精致内衣"
                };
                iGlobalGoodsTypeService.Save(sgwic);
            }
            //"服饰配件"
            string[] ThrdForClothesOrnament = { "女士腰带", "男士皮带", "女士围巾", "男士围巾", "帽子", "手套", "领带/领结/袖扣毛线" };
            for (int i = 0; i < ThrdForClothesOrnament.Length; i++)
            {
                GlobalGoodsType tgtco = new GlobalGoodsType()
                {
                    ParentID = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("针织衫").Id,
                    //2013-05-09 basilwnag add Family
                    Family = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("针织衫").Family.Trim() + iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("针织衫").Id + ",",
                    
                    Name = ThrdForClothesOrnament[i],
                    Leaf = false,
                    TLevel = 2,
                    IsDelete = false,
                    Description = "3级详细目录—服饰配件"
                };
                iGlobalGoodsTypeService.Save(tgtco);
            }
            //3级“鞋/箱包”
            //"女鞋"
            string[] ThrdForWomenShoes = { "凉鞋","坡跟","凉鞋","鱼嘴","凉鞋","凉拖","单鞋","帆布鞋","高跟鞋","坡跟单鞋","鱼嘴单鞋","豆豆鞋","婚鞋","松糕鞋","真皮鞋","妈妈鞋","透气鞋","大码鞋","高帮鞋","靴子短靴","长靴","马丁靴","流苏靴","内增高","雨鞋/雨靴" };
            for (int i = 0; i < ThrdForWomenShoes.Length; i++)
            {
                GlobalGoodsType tgtwc = new GlobalGoodsType()
                {
                    ParentID = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("女鞋").Id,
                    //2013-05-09 basilwnag add Family
                    Family = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("女鞋").Family.Trim() + iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("女鞋").Id + ",",
                    
                    Name = ThrdForWomenShoes[i],
                    Leaf = false,
                    TLevel = 2,
                    IsDelete = false,
                    Description = "3级详细目录—时尚女鞋"
                };
                iGlobalGoodsTypeService.Save(tgtwc);
            }
            //"男鞋"
            string[] ThrdForMenShoes = { "低帮鞋","驾车鞋","透气鞋","帆船鞋","帆布鞋","日常休闲","运动休闲","商务正装","皮鞋","大码鞋","高帮鞋","内增高" };
            for (int i = 0; i < ThrdForMenShoes.Length; i++)
            {
                GlobalGoodsType tgtmc = new GlobalGoodsType()
                {
                    ParentID = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("男鞋").Id,
                    //2013-05-09 basilwnag add Family
                    Family = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("男鞋").Family.Trim() + iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("男鞋").Id + ",",
                    
                    Name = ThrdForMenShoes[i],
                    Leaf = false,
                    TLevel = 2,
                    IsDelete = false,
                    Description = "3级详细目录—时尚男鞋"
                };
                iGlobalGoodsTypeService.Save(tgtmc);
            }
            //"女包"
            string[] ThrdForWomenBag = { "单肩包","手提包","斜挎包","手拿包","钱包","双肩包","帆布包","PU女包","欧美包","真皮包","撞色包","糖果包" };
            for (int i = 0; i < ThrdForWomenBag.Length; i++)
            {
                GlobalGoodsType tgtwb = new GlobalGoodsType()
                {
                    ParentID = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("女包").Id,
                    //2013-05-09 basilwnag add Family
                    Family = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("女包").Family.Trim() + iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("女包").Id + ",",
                    
                    Name = ThrdForWomenBag[i],
                    Leaf = false,
                    TLevel = 2,
                    IsDelete = false,
                    Description = "3级详细目录—时尚女包"
                };
                iGlobalGoodsTypeService.Save(tgtwb);
            }
            //"男包"
            string[] ThrdForMenBag = { "单肩包","手提包","斜挎包","手拿包","腰包","双肩包" };
            for (int i = 0; i < ThrdForMenBag.Length; i++)
            {
                GlobalGoodsType tgtmb = new GlobalGoodsType()
                {
                    ParentID = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("男包").Id,
                    //2013-05-09 basilwnag add Family
                    Family = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("男包").Family.Trim() + iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("男包").Id + ",",
                    
                    Name = ThrdForMenBag[i],
                    Leaf = false,
                    TLevel = 2,
                    IsDelete = false,
                    Description = "3级详细目录—时尚男包"
                };
                iGlobalGoodsTypeService.Save(tgtmb);
            }

            //3级“珠宝饰品/手表眼镜”
            //"珠宝"
            string[] ThrdForJawlery = { "黄金","钻石","翡翠","珍珠","铂金","玉石","宝石","琥珀","戒指","吊坠","项链","手镯","手链","耳环","金条" };
            for (int i = 0; i < ThrdForJawlery.Length; i++)
            {
                GlobalGoodsType tgtjw = new GlobalGoodsType()
                {
                    ParentID = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("珠宝/黄金").Id,
                    //2013-05-09 basilwnag add Family
                    Family = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("珠宝/黄金").Family.Trim() + iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("珠宝/黄金").Id + ",",
                    
                    Name = ThrdForJawlery[i],
                    Leaf = false,
                    TLevel = 2,
                    IsDelete = false,
                    Description = "3级详细目录—珠宝/黄金"
                };
                iGlobalGoodsTypeService.Save(tgtjw);
            }
            //"太阳镜"
            string[] ThrdForSunGlass = { "男士太阳镜","女士太阳镜","近视眼镜","老花镜","电脑护目镜","3D眼镜夜视镜" };
            for (int i = 0; i < ThrdForSunGlass.Length; i++)
            {
                GlobalGoodsType tgtsg= new GlobalGoodsType()
                {
                    ParentID = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("太阳镜").Id,
                    //2013-05-09 basilwnag add Family
                    Family = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("太阳镜").Family.Trim() + iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("太阳镜").Id + ",",
                    
                    Name = ThrdForSunGlass[i],
                    Leaf = false,
                    TLevel = 2,
                    IsDelete = false,
                    Description = "3级详细目录—珠宝"
                };
                iGlobalGoodsTypeService.Save(tgtsg);
            }
            //"饰品"
            string[] ThrdForDecoration = { "项链", "手链", "饰品戒指", "耳饰", "项坠", "发饰", "手镯", "胸针", "摆件", "首饰", "盒银饰", "天然水晶", "合金", "人造水晶", "珍珠", "母贝", "水钻", "钛钢" };
            for (int i = 0; i < ThrdForDecoration.Length; i++)
            {
                GlobalGoodsType tgtdt = new GlobalGoodsType()
                {
                    ParentID = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("饰品").Id,
                    //2013-05-09 basilwnag add Family
                    Family = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("饰品").Family.Trim() + iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("饰品").Id + ",",
                    
                    Name = ThrdForDecoration[i],
                    Leaf = false,
                    TLevel = 2,
                    IsDelete = false,
                    Description = "3级详细目录—饰品"
                };
                iGlobalGoodsTypeService.Save(tgtdt);
            }
            //"手表"
            string[] ThrdForWatch = { "石英表","机械表","电子表","光能表","男表","女表","情侣表","儿童表","复古表","果冻表","水钻表","陶瓷表" };
            for (int i = 0; i < ThrdForWatch.Length; i++)
            {
                GlobalGoodsType tgtw = new GlobalGoodsType()
                {
                    ParentID = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("手表").Id,
                    //2013-05-09 basilwnag add Family
                    Family = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("手表").Family.Trim() + iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("手表").Id + ",",
                    
                    Name = ThrdForWatch[i],
                    Leaf = false,
                    TLevel = 2,
                    IsDelete = false,
                    Description = "3级详细目录—手表"
                };
                iGlobalGoodsTypeService.Save(tgtw);
            }
            //3 级  食品
            //"酒水"
            string[] ThrdForDrinks = { "白酒", "葡萄酒", "洋酒", "黄酒", "啤酒", "威士忌", "干红", "冰酒", "香槟", "药酒", "进口红酒", "起泡酒", "黑啤冰甜" };
            for (int i = 0; i < ThrdForDrinks.Length; i++)
            {
                GlobalGoodsType tgtd = new GlobalGoodsType()
                {
                    ParentID = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("酒水").Id,
                    //2013-05-09 basilwnag add Family
                    Family = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("酒水").Family.Trim() + iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("酒水").Id + ",",
                    
                    Name = ThrdForDrinks[i],
                    Leaf = false,
                    TLevel = 2,
                    IsDelete = false,
                    Description = "3级详细目录—酒水"
                };
                iGlobalGoodsTypeService.Save(tgtd);
            }
            //"茶叶"
            string[] ThrdForTea = { "铁观音","普洱","红茶","养生茶","绿茶","花草茶","水果茶","黑茶","白茶" };
            for (int i = 0; i < ThrdForTea.Length; i++)
            {
                GlobalGoodsType tgttea = new GlobalGoodsType()
                {
                    ParentID = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("茶叶").Id,
                    //2013-05-09 basilwnag add Family
                    Family = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("茶叶").Family.Trim() + iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("茶叶").Id + ",",
                    
                    Name = ThrdForTea[i],
                    Leaf = false,
                    TLevel = 2,
                    IsDelete = false,
                    Description = "3级详细目录—茶叶"
                };
                iGlobalGoodsTypeService.Save(tgttea);
            }
            //"生鲜"
            string[] ThrdForShengXian = { "鲜肉","蔬菜","水果","火腿","蛋及制品","海参","螃蟹","牛排","寿司","新鲜蛋糕" };
            for (int i = 0; i < ThrdForShengXian.Length; i++)
            {
                GlobalGoodsType tgtsx = new GlobalGoodsType()
                {
                    ParentID = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("生鲜").Id,
                    //2013-05-09 basilwnag add Family
                    Family = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("生鲜").Family.Trim() + iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("生鲜").Id + ",",
                   
                    Name = ThrdForShengXian[i],
                    Leaf = false,
                    TLevel = 2,
                    IsDelete = false,
                    Description = "3级详细目录—生鲜"
                };
                iGlobalGoodsTypeService.Save(tgtsx);
            }

        }
        //商店商品目录添加
        private void add_MerchantCategory()
         {
             IMerchantCategoryService iMerchantCategoryService = UnityHelper.UnityToT<IMerchantCategoryService>();
            // string[] restCatg = {"中餐","西餐","清真","自助餐","火锅","鲁菜","川菜","粤菜","闽菜","苏菜","湘菜","徽菜" };
            //foreach(var i in restCatg)
            //{
            //    MerchantCategory restMC = new MerchantCategory()
            //    {
            //        MerchantCategoryName = i,
            //        MerchantType = MerchantTypeEnum.餐馆
            //    };
            //    iMerchantCategoryService.Save(restMC);            
            //}
            //string[] rentCatg = { "学区房", "海景房", "洋房", "独栋别墅", "复式楼房", "筒子楼", "集体宿舍"};
            //foreach (var i in rentCatg)
            //{
            //    MerchantCategory restMC = new MerchantCategory()
            //    {
            //        MerchantCategoryName = i,
            //        MerchantType = MerchantTypeEnum.租房
            //    };
            //    iMerchantCategoryService.Save(restMC);
            //}

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
        //public void add_RestaurantInfo()
        //{
        //    IMerchantCategoryRepository iMerchantCategoryRepository = UnityHelper.UnityToT<IMerchantCategoryRepository>();
        //    IUserInRoleRepository iUserInRoleRepository = UnityHelper.UnityToT<IUserInRoleRepository>();

        //    Restaurant restaurant1 = new Restaurant()
        //    {
        //        Activity = "五一大促销",
        //        Address = "山东财经大学燕山",
        //        AfternoonBeginHour = "18:20",
        //        AfternoonEndHour = "19:30",
        //        Bulletins = "9折优惠",
        //        Cost = 2,
        //        Description = "just come",
        //        Distance = "100",
        //        Email = "222@qq.com",
        //        Logo = "/uploadimage/lrest1.png",
        //        sBrand = "/uploadimage/srest1.jpg",
        //        bBrand = "/uploadimage/brest1.jpg",
        //        Name = "翠峰苑连锁火锅城",
        //        Owener = "刘德华",
        //        ShortName = "翠峰苑",   
        //        Tel = "18799999992",
        //        SendTime = 30,
        //        Rate = 0.8,
        //        SendPrice = 10,
        //        ShopStatus = ShopStatusEnum.营业时间,
        //        MerchantCategory = iMerchantCategoryRepository.SearchByMerchantCategoryName("鲁菜"),
        //        MerchantType = MerchantTypeEnum.餐馆
        //    };
        //    MerchantGoodsType restaurantFoodTye_1 = new MerchantGoodsType() { Merchant = restaurant1, GoodsType = "汉堡" };
        //    MerchantGoodsType restaurantFoodTye_2 = new MerchantGoodsType() { Merchant = restaurant1, GoodsType = "小吃" };
        //    restaurant1.MerchantGoodsTypes.Add(restaurantFoodTye_1);
        //    restaurant1.MerchantGoodsTypes.Add(restaurantFoodTye_2);
        //    new RestaurantRepository().SaveOrUpdate(restaurant1);

        //    IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>();
        //    ILoginUserOfMerchantRepository iLoginUserOfMerchantRepository = UnityHelper.UnityToT<ILoginUserOfMerchantRepository>();

        //    LoginUser lu1 = new LoginUser();
        //    lu1.LoginName = "restcuifengyuan";
        //    lu1.Password = "000000";
        //    iLoginUserRepository.SaveOrUpdate(lu1);
            
        //    LoginUserOfMerchant lum = new LoginUserOfMerchant();
        //    lum.Merchant = restaurant1;
        //    lum.LoginUser = lu1;
        //    iLoginUserOfMerchantRepository.SaveOrUpdate(lum);

        //    UserInRole uir = new UserInRole();
        //    uir.LoginUser = lu1;
        //    uir.SystemRole = iSystemRoleRepository.GetRoleByName("餐馆店主");
        //    iUserInRoleRepository.SaveOrUpdate(uir);

        //    LoginUser lu1_1 = new LoginUser();
        //    lu1_1.LoginName = "restcuifengyxiaoer";
        //    lu1_1.Password = "111111";
        //    iLoginUserRepository.SaveOrUpdate(lu1_1);

        //    LoginUserOfMerchant lum1_1 = new LoginUserOfMerchant();
        //    lum1_1.Merchant = restaurant1;
        //    lum1_1.LoginUser = lu1_1;
        //    iLoginUserOfMerchantRepository.SaveOrUpdate(lum1_1);

        //    UserInRole uir1_1 = new UserInRole();
        //    uir1_1.LoginUser = lu1_1;
        //    uir1_1.SystemRole = iSystemRoleRepository.GetRoleByName("餐馆店小二");
        //    iUserInRoleRepository.SaveOrUpdate(uir1_1);

        //        Food food_1 = new Food()
        //        {
        //            Name = "鸡腿堡",
        //            Price = 10,
        //            Image = "/uploadimage/f1.jpg",
        //            IsDiscount = false,
        //            InventoryCount = 100,
        //            MerchantGoodsType = restaurantFoodTye_1,
        //            Restaurant = restaurant1,

        //        };
        //        restaurant1.Foods.Add(food_1);

        //        Food food_2 = new Food()
        //        {
        //            Name = "薯条",
        //            Price = 15,
        //            Image = "/uploadimage/f2.jpg",
        //            IsDiscount = true,
        //            InventoryCount = 200,
        //            DiscountInventoryCount = 100,
        //            MerchantGoodsType = restaurantFoodTye_2,
        //            DiscountPrice = 10,
        //            Restaurant = restaurant1,
        //            IsLimited = true,

        //        };
        //        restaurant1.Foods.Add(food_2);
        //    new RestaurantRepository().SaveOrUpdate(restaurant1);

        //    //添加顾客张国荣
        //    string systemuserid = Guid.NewGuid().ToString();
        //    string loginuserid = Guid.NewGuid().ToString();
        //    SystemUser s1 = new SystemUser(systemuserid)
        //    {
        //        Tel = "13988888888",
        //        Description = "erhuan10",
        //        Email = "ocam10@163.com",
        //        EntityIndex = 10,
        //        Name = "张国荣",                 
        //        IsAnonymous = false,
        //    };
        //    new SystemUserRepository().SaveOrUpdate(s1);          
        //    Address address = new Address()
        //    {
        //        AddressName = "山东财经大学9号宿舍楼",
        //        BackupTel = "187000000000",
        //        Email ="23423@163.com",
        //        Linkman = "john",
        //        QQ ="3333333333",
        //        Tel ="18668668686",
        //        Weixin ="5862414855",
        //        SystemUser=s1
        //    };
        //    //s1.Addresses.Add(address);
        //    new AddressRepository().SaveOrUpdate(address);
        //    Address address2 = new Address()
        //    {
        //        AddressName = "青岛大学9号宿舍楼",
        //        BackupTel = "18711111111111",
        //        Email = "23423@163.com",
        //        Linkman = "john",
        //        QQ = "66666666",
        //        Tel = "18668668686",
        //        Weixin = "5862414855",
        //        SystemUser=s1
        //    };
        //    //s1.Addresses.Add(address2);
        //    new AddressRepository().SaveOrUpdate(address2);

        //    LoginUser sysLoginUser = new LoginUser(loginuserid)
        //    {
        //        SystemUser = s1,
        //        IsAdmin = false,
        //        LoginName = "restzhangguorong",
        //        Password = "000000",
                 
        //    };
        //    //s1.LoginUser = sysLoginUser;
        //    new LoginUserRepository().SaveOrUpdate(sysLoginUser);

        //    UserInRole uir1 = new UserInRole();
        //    uir1.LoginUser = sysLoginUser;
        //    uir1.SystemRole = iSystemRoleRepository.GetRoleByName("顾客");
        //    iUserInRoleRepository.SaveOrUpdate(uir1);

        //    var add = s1.Addresses.FirstOrDefault();
        //    MyFoodOrder myFoodOrder = new MyFoodOrder()
        //    {
        //        Address = address.AddressName,
        //        Linkman = address.Linkman,
        //        SystemUser = s1,
        //        EntityIndex = 1,
        //        Tel = address.Tel,
        //        Restaurant = restaurant1,
        //        OrderNumber = DateTime.Now.ToString("yyyyMMddhhmmssfff"),  //2013-02-10 TODO basilwang need use id policy
        //        OrderStatus = MyOrderStatusEnum.成功,
        //        SendTime = "11:20",
        //        Description = "不要辣椒"
        //    };

        //        OrderOfFood orderOfFood_1 = new OrderOfFood()
        //       {
        //           Amount = 2,
        //           MyFoodOrder = myFoodOrder,
        //           Price = food_1.Price,
        //           Food = food_1,
        //           EntityIndex = 1
        //       };
        //       myFoodOrder.OrderOfFoods.Add(orderOfFood_1);
        //   new MyFoodOrderRepository().SaveOrUpdate(myFoodOrder);


        //   Restaurant restaurant2 = new Restaurant()
        //   {
        //       Activity = "清仓大甩卖",
        //       Address = "青岛大学崂山校区",
        //       AfternoonBeginHour = "18:20",
        //       AfternoonEndHour = "19:30",
        //       Bulletins = "9折优惠",
        //       Cost = 2,
        //       Description = "just come",
        //       Distance = "100",
        //       Email = "222@qq.com",
        //       Logo = "/uploadimage/lrest2.png",
        //       sBrand = "/uploadimage/srest2.jpg",
        //       bBrand = "/uploadimage/brest2.jpg",
        //       Name = "金汉斯自助餐连锁店",
        //       Owener = "张学友",
        //       ShortName = "金汉斯",
        //       Tel = "18799999992",
        //       SendTime = 30,
        //       Rate = 0.8,
        //       SendPrice = 10,
        //       ShopStatus = ShopStatusEnum.营业时间,
        //       MerchantCategory = iMerchantCategoryRepository.SearchByMerchantCategoryName("川菜"),
        //       MerchantType = MerchantTypeEnum.餐馆
        //   };
        //   MerchantGoodsType restaurantFoodTye_12 = new MerchantGoodsType() { Merchant = restaurant2, GoodsType = "蛋糕" };
        //   MerchantGoodsType restaurantFoodTye_22 = new MerchantGoodsType() { Merchant = restaurant2, GoodsType = "水果" };
        //   restaurant2.MerchantGoodsTypes.Add(restaurantFoodTye_12);
        //   restaurant2.MerchantGoodsTypes.Add(restaurantFoodTye_22);
        //   new RestaurantRepository().SaveOrUpdate(restaurant2);

        //   LoginUser lu2 = new LoginUser();
        //   lu2.LoginName = "restjinhansi";
        //   lu2.Password = "000000";
        //   iLoginUserRepository.SaveOrUpdate(lu2);

        //   LoginUserOfMerchant lum2 = new LoginUserOfMerchant();
        //   lum2.Merchant = restaurant2;
        //   lum2.LoginUser = lu2;
        //   iLoginUserOfMerchantRepository.SaveOrUpdate(lum2);

        //   UserInRole uir2 = new UserInRole();
        //   uir2.LoginUser = lu2;
        //   uir2.SystemRole = iSystemRoleRepository.GetRoleByName("餐馆店主");
        //   iUserInRoleRepository.SaveOrUpdate(uir2);

        //   LoginUser lu1_2 = new LoginUser();
        //   lu1_2.LoginName = "restxiaoerjinhansi";
        //   lu1_2.Password = "111111";
        //   iLoginUserRepository.SaveOrUpdate(lu1_2);

        //   LoginUserOfMerchant lum1_2 = new LoginUserOfMerchant();
        //   lum1_2.Merchant = restaurant2;
        //   lum1_2.LoginUser = lu1_2;
        //   iLoginUserOfMerchantRepository.SaveOrUpdate(lum1_2);

        //   UserInRole uir1_2 = new UserInRole();
        //   uir1_2.LoginUser = lu1_2;
        //   uir1_2.SystemRole = iSystemRoleRepository.GetRoleByName("餐馆店小二");
        //   iUserInRoleRepository.SaveOrUpdate(uir1_2);

        //   Food food_12 = new Food()
        //   {
        //       Name = "生日蛋糕",
        //       Price = 10,
        //       Image = "/uploadimage/f3.jpg",
        //       IsDiscount = false,
        //       InventoryCount = 100,
        //       MerchantGoodsType = restaurantFoodTye_12,
        //       Restaurant = restaurant2,

        //   };
        //   restaurant1.Foods.Add(food_12);

        //   Food food_22 = new Food()
        //   {
        //       Name = "香蕉",
        //       Price = 15,
        //       Image = "/uploadimage/f4.jpg",
        //       IsDiscount = true,
        //       InventoryCount = 200,
        //       DiscountInventoryCount = 100,
        //       MerchantGoodsType = restaurantFoodTye_22,
        //       DiscountPrice = 10,
        //       Restaurant = restaurant2,
        //       IsLimited = true,

        //   };
        //   restaurant2.Foods.Add(food_22);
        //   new RestaurantRepository().SaveOrUpdate(restaurant2);

        //   //添加顾客张卫健
        //   SystemUser s2 = new SystemUser()
        //   {
        //       Tel = "13988888888",
        //       Description = "erhuan10",
        //       Email = "ocam10@163.com",
        //       EntityIndex = 10,
        //       Name = "张卫健",
        //       IsAnonymous = false,
        //   };
        //   new SystemUserRepository().SaveOrUpdate(s2);
        //   Address address12 = new Address()
        //   {
        //       AddressName = "青岛大学崂山校区1号宿舍楼",
        //       BackupTel = "187000000000",
        //       Email = "23423@163.com",
        //       Linkman = "john",
        //       QQ = "3333333333",
        //       Tel = "18668668686",
        //       Weixin = "5862414855",
        //       SystemUser = s2
        //   };
        //   //s1.Addresses.Add(address);
        //   new AddressRepository().SaveOrUpdate(address12);
        //   Address address22 = new Address()
        //   {
        //       AddressName = "中国海洋大学2号宿舍楼",
        //       BackupTel = "18711111111111",
        //       Email = "23423@163.com",
        //       Linkman = "john",
        //       QQ = "66666666",
        //       Tel = "18668668686",
        //       Weixin = "5862414855",
        //       SystemUser = s2
        //   };
        //   //s1.Addresses.Add(address2);
        //   new AddressRepository().SaveOrUpdate(address22);

        //   LoginUser sysLoginUser2 = new LoginUser()
        //   {
        //       SystemUser = s2,
        //       IsAdmin = false,
        //       LoginName = "restzhangweijian",
        //       Password = "000000",

        //   };
        //   //s1.LoginUser = sysLoginUser;
        //   new LoginUserRepository().SaveOrUpdate(sysLoginUser2);

        //   UserInRole uir12 = new UserInRole();
        //   uir12.LoginUser = sysLoginUser2;
        //   uir12.SystemRole = iSystemRoleRepository.GetRoleByName("顾客");
        //   iUserInRoleRepository.SaveOrUpdate(uir12);

        //   var add2 = s2.Addresses.FirstOrDefault();
        //   MyFoodOrder myFoodOrder2 = new MyFoodOrder()
        //   {
        //       Address = address22.AddressName,
        //       Linkman = address22.Linkman,
        //       SystemUser = s2,
        //       EntityIndex = 1,
        //       Tel = address22.Tel,
        //       Restaurant = restaurant2,
        //       OrderNumber = DateTime.Now.ToString("yyyyMMddhhmmssfff"),  //2013-02-10 TODO basilwang need use id policy
        //       OrderStatus = MyOrderStatusEnum.成功,
        //       SendTime = "11:20",
        //       Description = "不要辣椒"
        //   };

        //   OrderOfFood orderOfFood_12 = new OrderOfFood()
        //   {
        //       Amount = 2,
        //       MyFoodOrder = myFoodOrder2,
        //       Price = food_12.Price,
        //       Food = food_12,
        //       EntityIndex = 1
        //   };
        //   myFoodOrder2.OrderOfFoods.Add(orderOfFood_12);

        //   OrderOfFood orderOfFood_22 = new OrderOfFood()
        //   {
        //       Amount = 2,
        //       MyFoodOrder = myFoodOrder2,
        //       Price = food_22.Price,
        //       Food = food_22,
        //       EntityIndex = 1
        //   };
        //   myFoodOrder2.OrderOfFoods.Add(orderOfFood_12);
        //   new MyFoodOrderRepository().SaveOrUpdate(myFoodOrder2);        

        //  //添加评价数据Valuing、ValuingComments、Score、ValuingItem
        //   IRepository<MyFoodOrder> iMyFoodOrderRepository = UnityHelper.UnityToT<IRepository<MyFoodOrder>>();

        //   IValuingOfMyFoodOrderRepository iValuingOfMyFoodOrderRepository = UnityHelper.UnityToT<IValuingOfMyFoodOrderRepository>();
        //   IRepository<ValuingItemOfMyFoodOrder> iValuingItemOfMyFoodOrderRepository = UnityHelper.UnityToT<IRepository<ValuingItemOfMyFoodOrder>>();
        //   IRepository<ScoreOfItemInFoodOrder> iScoreOfItemInFoodOrderRepository = UnityHelper.UnityToT<IRepository<ScoreOfItemInFoodOrder>>();
        //   IList<ValuingItemOfMyFoodOrder> iValuingItemOfMyFoodOrderOrders = new List<ValuingItemOfMyFoodOrder>();

        //   string[] vItemArray = { "送货速度", "服务态度", "商品质量" };
        //   foreach (var i in vItemArray)
        //   {
        //       ValuingItemOfMyFoodOrder vluItemOfFd = new ValuingItemOfMyFoodOrder()
        //       {
        //           ValuingItemName = i
        //       };
        //       iValuingItemOfMyFoodOrderRepository.SaveOrUpdate(vluItemOfFd);
        //       iValuingItemOfMyFoodOrderOrders.Add(vluItemOfFd);
        //   };

        //   ValuingComments valucmmt1_1 = new ValuingComments()
        //   {
        //       Comments = "商品的包装跟网页显示的不一样，质量很差，快递员送货不及时",
        //       Direction = 0,
        //       TrackIndex = 1,
        //   };
        //   ValuingComments valucmmt1_2 = new ValuingComments()
        //   {
        //       Comments = "能不能退货",
        //       Direction = 0,
        //       TrackIndex = 2,
        //   };
        //       ValuingOfMyFoodOrder vluOfFd1_1 = new ValuingOfMyFoodOrder()
        //       {
        //           LoginUser = sysLoginUser,
        //           Merchant = restaurant1,
        //           MyFoodOrder =myFoodOrder ,
        //           ValuingContent =  "送货速度慢，产品质量差，服务态度恶劣",
                   
        //       };
        //       new ValuingOfMyFoodOrderRepository().SaveOrUpdate(vluOfFd1_1);

        //       valucmmt1_1.Valuing = vluOfFd1_1;
        //       valucmmt1_2.Valuing = vluOfFd1_1;
        //       new ValuingCommentsRepository().SaveOrUpdate(valucmmt1_1);
        //       new ValuingCommentsRepository().SaveOrUpdate(valucmmt1_2);
  
        //       for (int j = 0; j < 3; j++)
        //       {
        //           ScoreOfItemInFoodOrder scoreOfItFd1_1 = new ScoreOfItemInFoodOrder()
        //           {
        //               Score = j,
        //               ValuingOfMyFoodOrder = vluOfFd1_1,
        //               ValuingItemOfMyFoodOrder = iValuingItemOfMyFoodOrderOrders[j],
        //           };
        //           vluOfFd1_1.ScoreOfItemInFoodOrders.Add(scoreOfItFd1_1);
        //           iValuingItemOfMyFoodOrderOrders[j].ScoreOfItemInFoodOrders.Add(scoreOfItFd1_1);
        //       };
        //       iValuingOfMyFoodOrderRepository.SaveOrUpdate(vluOfFd1_1);


        //       //第二个用户对第二个餐馆的valuing
        //       ValuingComments valucmmt2_1 = new ValuingComments()
        //       {
        //           Comments = "商品的包装跟网页显示的不一样，质量很差，快递员送货不及时",
        //           Direction = 0,
        //           TrackIndex = 1,
        //       };
        //       ValuingComments valucmmt2_2 = new ValuingComments()
        //       {
        //           Comments = "能不能退货",
        //           Direction = 0,
        //           TrackIndex = 2,
        //       };
        //       ValuingOfMyFoodOrder vluOfFd2_1 = new ValuingOfMyFoodOrder()
        //       {
        //           LoginUser = sysLoginUser2,
        //           Merchant = restaurant2,
        //           MyFoodOrder = myFoodOrder2,
        //           ValuingContent = "送货速度慢，产品质量差，服务态度恶劣",

        //       };
        //       new ValuingOfMyFoodOrderRepository().SaveOrUpdate(vluOfFd2_1);

        //       valucmmt2_1.Valuing = vluOfFd2_1;
        //       valucmmt2_2.Valuing = vluOfFd2_1;
        //       new ValuingCommentsRepository().SaveOrUpdate(valucmmt2_1);
        //       new ValuingCommentsRepository().SaveOrUpdate(valucmmt2_2);

        //       for (int j = 0; j < 3; j++)
        //       {
        //           ScoreOfItemInFoodOrder scoreOfItFd2_1 = new ScoreOfItemInFoodOrder()
        //           {
        //               Score = j,
        //               ValuingOfMyFoodOrder = vluOfFd2_1,
        //               ValuingItemOfMyFoodOrder = iValuingItemOfMyFoodOrderOrders[j],
        //           };
        //           vluOfFd2_1.ScoreOfItemInFoodOrders.Add(scoreOfItFd2_1);
        //           iValuingItemOfMyFoodOrderOrders[j].ScoreOfItemInFoodOrders.Add(scoreOfItFd2_1);
        //       };
        //       iValuingOfMyFoodOrderRepository.SaveOrUpdate(vluOfFd2_1);
             
        //    //添加Message模块
        //       IMessageRepository iMessageRepository = UnityHelper.UnityToT<IMessageRepository>();
        //       MessageContent mc1_1 = new MessageContent()
        //       {
        //           Content = "阿里巴巴员工2013年初收到了史上最丰厚的年终大礼包。"
        //       };
        //       new MessageContentRepository().SaveOrUpdate(mc1_1);

        //       Message mess1_1 = new Message()
        //       {
        //            Direction=0,
        //            Merchant = restaurant1,
        //            LoginUser = sysLoginUser,
        //            MessageContent=mc1_1,
        //            IsNew=true,
        //            ThreadIndex="年终大礼包",
        //            TrackIndex="0"
        //       };
        //       new MessageRepository().SaveOrUpdate(mess1_1);

        //       MessageContent mc1_2 = new MessageContent()
        //       {
        //           Content = "年终大礼包赠送的都有哪些东西？"
        //       };
        //       new MessageContentRepository().SaveOrUpdate(mc1_2);

        //       Message mess1_2 = new Message()
        //       {
        //           Direction = 1,
        //           Merchant = restaurant1,
        //           LoginUser = sysLoginUser,
        //           MessageContent = mc1_2,
        //           IsNew = true,
        //           ThreadIndex = "年终大礼包",
        //           TrackIndex = "1"
        //       };
        //       new MessageRepository().SaveOrUpdate(mess1_2);
        //      //第二个人的消息模块
        //       MessageContent mc2_1 = new MessageContent()
        //       {
        //           Content = "亲爱的天猫达人，今天是您的生日，天猫俱乐部祝您生日快乐。"
        //       };
        //       new MessageContentRepository().SaveOrUpdate(mc2_1);

        //       Message mess2_1 = new Message()
        //       {
        //           Direction = 0,
        //           Merchant = restaurant2,
        //           LoginUser = sysLoginUser2,
        //           MessageContent = mc2_1,
        //           IsNew = true,
        //           ThreadIndex = "生日礼物",
        //           TrackIndex = "0"
        //       };
        //       new MessageRepository().SaveOrUpdate(mess2_1);

        //       MessageContent mc2_2 = new MessageContent()
        //       {
        //           Content = "感谢您一直以来对天猫的支持。今天是双倍积分卡有效期的最后一天，您的积分赚够了么？"
        //       };
        //       new MessageContentRepository().SaveOrUpdate(mc2_2);

        //       Message mess2_2 = new Message()
        //       {
        //           Direction = 1,
        //           Merchant = restaurant2,
        //           LoginUser = sysLoginUser2,
        //           MessageContent = mc2_2,
        //           IsNew = true,
        //           ThreadIndex = "生日礼物",
        //           TrackIndex = "1"
        //       };
        //       new MessageRepository().SaveOrUpdate(mess2_2);
            
        //    ////添加FeedBack
        //       IFeedBackRepository iFeedBackRepository = UnityHelper.UnityToT<IFeedBackRepository>();
        //      // LoginUser adminLoginUser=iLoginUserRepository.s
        //       FeedBack fb1 = new FeedBack()
        //       {
        //           Type = "1",
        //           Contents = "送货速度很慢啊！！！！！！",
        //           LoginUser = sysLoginUser
        //       };
        //       iFeedBackRepository.SaveOrUpdate(fb1);

        //       FeedBack fb2 = new FeedBack()
        //       {
        //           Type = "2",
        //           Contents = "面包质量有问题。。。",
        //           LoginUser = sysLoginUser2
        //       };
        //       FeedBack fb3 = new FeedBack()
        //       {
        //           Type = "2",
        //           Contents = "面包质量有问题自己解决",
        //           ParentFeedBack = fb2,
        //           LoginUser = adminLoginUser
        //       };
        //       // iFeedBackRepository.SaveOrUpdate(fb3);
        //       fb2.ChildFeedBacks.Add(fb3);
        //       iFeedBackRepository.SaveOrUpdate(fb2);



        //       FeedBack fb4 = new FeedBack()
        //       {
        //           Type = "3",
        //           Contents = "有优惠活动吗？",
        //           LoginUser = sysLoginUser
        //       };

        //       FeedBack fb5 = new FeedBack()
        //       {
        //           Type = "3",
        //           Contents = "没有有优惠活动",
        //           ParentFeedBack = fb4,
        //           LoginUser = adminLoginUser
        //       };
        //       //   iFeedBackRepository.SaveOrUpdate(fb4);
        //       fb4.ChildFeedBacks.Add(fb5);
        //       iFeedBackRepository.SaveOrUpdate(fb4);

        //}
        // public void add_RentInfo()
        //{
        //    IMerchantCategoryRepository iMerchantCategoryRepository = UnityHelper.UnityToT<IMerchantCategoryRepository>();
        //    IUserInRoleRepository iUserInRoleRepository = UnityHelper.UnityToT<IUserInRoleRepository>();

        //    Rent rent1 = new Rent()
        //    {
        //        Activity = "五一大促销",
        //        Address = "二环东路7366号",
        //        Bulletins = "9折促销",
        //        Description = "just come",
        //        Distance = "100",
        //        Email = "7366@qq.com",
        //        Logo = "/uploadimage/lret1.png",
        //        sBrand = "/uploadimage/sret1.jpg",
        //        bBrand = "/uploadimage/bret1.jpg",
        //        Name = "济南安泰置业有限公司",
        //        Owener = "任贤齐",
        //        ShortName = "安泰",
        //        Tel = "18799999992",
        //        Rate = 0.8,
        //        ShopStatus = ShopStatusEnum.营业时间,
        //        MerchantCategory = iMerchantCategoryRepository.SearchByMerchantCategoryName("学区房"),
        //        MerchantType = MerchantTypeEnum.租房
        //    };
        //    MerchantGoodsType rentHouseTye_1 = new MerchantGoodsType() { Merchant = rent1, GoodsType = "高校学区房" };
        //    MerchantGoodsType rentHouseTye_2 = new MerchantGoodsType() { Merchant = rent1, GoodsType = "中学学区房" };
        //    rent1.MerchantGoodsTypes.Add(rentHouseTye_1);
        //    rent1.MerchantGoodsTypes.Add(rentHouseTye_2);
        //    new RentRepository().SaveOrUpdate(rent1);

        //    IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>();
        //    ILoginUserOfMerchantRepository iLoginUserOfMerchantRepository = UnityHelper.UnityToT<ILoginUserOfMerchantRepository>();

        //    LoginUser lu1 = new LoginUser();
        //    lu1.LoginName = "rentantai";
        //    lu1.Password = "000000";
        //    iLoginUserRepository.SaveOrUpdate(lu1);
            
        //    LoginUserOfMerchant lum = new LoginUserOfMerchant();
        //    lum.Merchant = rent1;
        //    lum.LoginUser = lu1;
        //    iLoginUserOfMerchantRepository.SaveOrUpdate(lum);

        //    UserInRole uir = new UserInRole();
        //    uir.LoginUser = lu1;
        //    uir.SystemRole = iSystemRoleRepository.GetRoleByName("租房店主");
        //    iUserInRoleRepository.SaveOrUpdate(uir);

        //    LoginUser lu1_1 = new LoginUser();
        //    lu1_1.LoginName = "rentantaixiaoer";
        //    lu1_1.Password = "111111";
        //    iLoginUserRepository.SaveOrUpdate(lu1_1);

        //    LoginUserOfMerchant lum1_1 = new LoginUserOfMerchant();
        //    lum1_1.Merchant = rent1;
        //    lum1_1.LoginUser = lu1_1;
        //    iLoginUserOfMerchantRepository.SaveOrUpdate(lum1_1);

        //    UserInRole uir1_1 = new UserInRole();
        //    uir1_1.LoginUser = lu1_1;
        //    uir1_1.SystemRole = iSystemRoleRepository.GetRoleByName("租房店小二");
        //    iUserInRoleRepository.SaveOrUpdate(uir1_1);

        //        House house_1 = new House()
        //        {
        //            Name = "财大学区房",
        //            Price = 10,
        //            Image = "/uploadimage/h1.jpg",
        //            IsDiscount = false,
        //            InventoryCount = 100,
        //            MerchantGoodsType = rentHouseTye_1,
        //            Rent = rent1,
        //           TimeOfRentFrom=DateTime.Now,
        //           TimeOfRentTO=DateTime.Now

        //        };
        //        rent1.Houses.Add(house_1);

        //        House house_2 = new House()
        //        {
        //            Name = "甸柳一小学区房",
        //            Price = 15,
        //            Image = "/uploadimage/h2.jpg",
        //            IsDiscount = true,
        //            InventoryCount = 200,
        //            DiscountInventoryCount = 100,
        //            MerchantGoodsType = rentHouseTye_2,
        //            DiscountPrice = 10,
        //            Rent = rent1,
        //            IsLimited = true,
        //            TimeOfRentFrom = DateTime.Now,
        //            TimeOfRentTO = DateTime.Now
        //        };
        //        rent1.Houses.Add(house_2);
        //    new RentRepository().SaveOrUpdate(rent1);

        //    //添加顾客李自成
        //    string systemuserid = Guid.NewGuid().ToString();
        //    string loginuserid = Guid.NewGuid().ToString();
        //    SystemUser s1 = new SystemUser(systemuserid)
        //    {
        //        Tel = "13988888888",
        //        Description = "erhuan10",
        //        Email = "ocam10@163.com",
        //        EntityIndex = 10,
        //        Name = "李自成",                 
        //        IsAnonymous = false,
        //    };
        //    new SystemUserRepository().SaveOrUpdate(s1);          
        //    Address address = new Address()
        //    {
        //        AddressName = "济南市历下区燕子山小区9#116",
        //        BackupTel = "187000000000",
        //        Email ="23423@163.com",
        //        Linkman = "john",
        //        QQ ="3333333333",
        //        Tel ="18668668686",
        //        Weixin ="5862414855",
        //        SystemUser=s1
        //    };
        //    //s1.Addresses.Add(address);
        //    new AddressRepository().SaveOrUpdate(address);
        //    Address address2 = new Address()
        //    {
        //        AddressName = "济南市市中区军安和平山庄9#116",
        //        BackupTel = "18711111111111",
        //        Email = "23423@163.com",
        //        Linkman = "john",
        //        QQ = "66666666",
        //        Tel = "18668668686",
        //        Weixin = "5862414855",
        //        SystemUser=s1
        //    };
        //    //s1.Addresses.Add(address2);
        //    new AddressRepository().SaveOrUpdate(address2);

        //    LoginUser sysLoginUser = new LoginUser(loginuserid)
        //    {
        //        SystemUser = s1,
        //        IsAdmin = false,
        //        LoginName = "rentlizicheng",
        //        Password = "000000",
                 
        //    };
        //    //s1.LoginUser = sysLoginUser;
        //    new LoginUserRepository().SaveOrUpdate(sysLoginUser);

        //    UserInRole uir1 = new UserInRole();
        //    uir1.LoginUser = sysLoginUser;
        //    uir1.SystemRole = iSystemRoleRepository.GetRoleByName("顾客");
        //    iUserInRoleRepository.SaveOrUpdate(uir1);

        //    var add = s1.Addresses.FirstOrDefault();
        //    MyHouseOrder myHouseOrder = new MyHouseOrder()
        //    {
        //        Address = address.AddressName,
        //        Linkman = address.Linkman,
        //        SystemUser = s1,
        //        EntityIndex = 1,
        //        Tel = address.Tel,
        //        Rent = rent1,
        //        OrderNumber = DateTime.Now.ToString("yyyyMMddhhmmssfff"),  //2013-02-10 TODO basilwang need use id policy
        //        OrderStatus = MyOrderStatusEnum.成功,
        //        SendTime = "11:20",
        //        Description = "价格不能超过3000"
        //    };

        //        OrderOfHouse orderOfHouse_1 = new OrderOfHouse()
        //       {
        //           Amount = 2,
        //           MyHouseOrder = myHouseOrder,
        //           Price = house_1.Price,
        //           House = house_1,
        //           EntityIndex = 1
        //       };
        //       myHouseOrder.OrderOfHouses.Add(orderOfHouse_1);
        //   new MyHouseOrderRepository().SaveOrUpdate(myHouseOrder);


        //   Rent rent2 = new Rent()
        //   {
        //       Activity = "优质房源",
        //       Address = "济南市市中区舜耕路30号",
        //       Bulletins = "9折优惠",
        //       Description = "just come",
        //       Distance = "100",
        //       Email = "222@qq.com",
        //       Logo = "/uploadimage/lret2.png",
        //       sBrand = "/uploadimage/sret2.jpg",
        //       bBrand = "/uploadimage/bret2.jpg",
        //       Name = "济南润华置业公司",
        //       Owener = "杨千嬅",
        //       ShortName = "润华",
        //       Tel = "18799999992",
        //       Rate = 0.8,
        //       ShopStatus = ShopStatusEnum.营业时间,
        //       MerchantCategory = iMerchantCategoryRepository.SearchByMerchantCategoryName("海景房"),
        //       MerchantType = MerchantTypeEnum.租房
        //   };
        //   MerchantGoodsType rentHouseTye_12 = new MerchantGoodsType() { Merchant = rent2, GoodsType = "烟台海景房" };
        //   MerchantGoodsType rentHouseTye_22 = new MerchantGoodsType() { Merchant = rent2, GoodsType = "威海海景房" };
        //   rent2.MerchantGoodsTypes.Add(rentHouseTye_12);
        //   rent2.MerchantGoodsTypes.Add(rentHouseTye_22);
        //   new RentRepository().SaveOrUpdate(rent2);

        //   LoginUser lu2 = new LoginUser();
        //   lu2.LoginName = "rentrunhua";
        //   lu2.Password = "000000";
        //   iLoginUserRepository.SaveOrUpdate(lu2);

        //   LoginUserOfMerchant lum2 = new LoginUserOfMerchant();
        //   lum2.Merchant = rent2;
        //   lum2.LoginUser = lu2;
        //   iLoginUserOfMerchantRepository.SaveOrUpdate(lum2);

        //   UserInRole uir2 = new UserInRole();
        //   uir2.LoginUser = lu2;
        //   uir2.SystemRole = iSystemRoleRepository.GetRoleByName("租房店主");
        //   iUserInRoleRepository.SaveOrUpdate(uir2);

        //   LoginUser lu1_2 = new LoginUser();
        //   lu1_2.LoginName = "rentrunhuaxiaoer";
        //   lu1_2.Password = "111111";
        //   iLoginUserRepository.SaveOrUpdate(lu1_2);

        //   LoginUserOfMerchant lum1_2 = new LoginUserOfMerchant();
        //   lum1_2.Merchant = rent2;
        //   lum1_2.LoginUser = lu1_2;
        //   iLoginUserOfMerchantRepository.SaveOrUpdate(lum1_2);

        //   UserInRole uir1_2 = new UserInRole();
        //   uir1_2.LoginUser = lu1_2;
        //   uir1_2.SystemRole = iSystemRoleRepository.GetRoleByName("租房店小二");
        //   iUserInRoleRepository.SaveOrUpdate(uir1_2);

        //   House house_12 = new House()
        //   {
        //       Name = "烟大海景房",
        //       Price = 10,
        //       Image = "/uploadimage/h3.jpg",
        //       IsDiscount = false,
        //       InventoryCount = 100,
        //       MerchantGoodsType = rentHouseTye_12,
        //       Rent = rent2,
        //       TimeOfRentFrom = DateTime.Now,
        //       TimeOfRentTO = DateTime.Now
        //   };
        //   rent1.Houses.Add(house_12);

        //   House house_22 = new House()
        //   {
        //       Name = "山大威海校区海景房",
        //       Price = 15,
        //       Image = "/uploadimage/h4.jpg",
        //       IsDiscount = true,
        //       InventoryCount = 200,
        //       DiscountInventoryCount = 100,
        //       MerchantGoodsType = rentHouseTye_22,
        //       DiscountPrice = 10,
        //       Rent = rent2,
        //       IsLimited = true,
        //       TimeOfRentFrom = DateTime.Now,
        //       TimeOfRentTO = DateTime.Now
        //   };
        //   rent2.Houses.Add(house_22);
        //   new RentRepository().SaveOrUpdate(rent2);

        //   //添加顾客王志文
        //   SystemUser s2 = new SystemUser()
        //   {
        //       Tel = "13988888888",
        //       Description = "erhuan10",
        //       Email = "ocam10@163.com",
        //       EntityIndex = 10,
        //       Name = "王志文",
        //       IsAnonymous = false,
        //   };
        //   new SystemUserRepository().SaveOrUpdate(s2);
        //   Address address12 = new Address()
        //   {
        //       AddressName = "北京市海淀区和平校区3220",
        //       BackupTel = "187000000000",
        //       Email = "23423@163.com",
        //       Linkman = "john",
        //       QQ = "3333333333",
        //       Tel = "18668668686",
        //       Weixin = "5862414855",
        //       SystemUser = s2
        //   };
        //   //s1.Addresses.Add(address);
        //   new AddressRepository().SaveOrUpdate(address12);
        //   Address address22 = new Address()
        //   {
        //       AddressName = "青岛市四方区贵和校区4112",
        //       BackupTel = "18711111111111",
        //       Email = "23423@163.com",
        //       Linkman = "john",
        //       QQ = "66666666",
        //       Tel = "18668668686",
        //       Weixin = "5862414855",
        //       SystemUser = s2
        //   };
        //   //s1.Addresses.Add(address2);
        //   new AddressRepository().SaveOrUpdate(address22);

        //   LoginUser sysLoginUser2 = new LoginUser()
        //   {
        //       SystemUser = s2,
        //       IsAdmin = false,
        //       LoginName = "rentwangzhiwen",
        //       Password = "000000",

        //   };
        //   //s1.LoginUser = sysLoginUser;
        //   new LoginUserRepository().SaveOrUpdate(sysLoginUser2);

        //   UserInRole uir12 = new UserInRole();
        //   uir12.LoginUser = sysLoginUser2;
        //   uir12.SystemRole = iSystemRoleRepository.GetRoleByName("顾客");
        //   iUserInRoleRepository.SaveOrUpdate(uir12);

        //   var add2 = s2.Addresses.FirstOrDefault();
        //   MyHouseOrder myHouseOrder2 = new MyHouseOrder()
        //   {
        //       Address = address22.AddressName,
        //       Linkman = address22.Linkman,
        //       SystemUser = s2,
        //       EntityIndex = 1,
        //       Tel = address22.Tel,
        //       Rent = rent2,
        //       OrderNumber = DateTime.Now.ToString("yyyyMMddhhmmssfff"),  //2013-02-10 TODO basilwang need use id policy
        //       OrderStatus = MyOrderStatusEnum.成功,
        //       SendTime = "11:20",
        //       Description = ""
        //   };

        //   OrderOfHouse orderOfHouse_12 = new OrderOfHouse()
        //   {
        //       Amount = 2,
        //       MyHouseOrder = myHouseOrder2,
        //       Price = house_12.Price,
        //       House = house_12,
        //       EntityIndex = 1
        //   };
        //   myHouseOrder2.OrderOfHouses.Add(orderOfHouse_12);

        //   OrderOfHouse orderOfHouse_22 = new OrderOfHouse()
        //   {
        //       Amount = 2,
        //       MyHouseOrder = myHouseOrder2,
        //       Price = house_22.Price,
        //       House = house_22,
        //       EntityIndex = 1
        //   };
        //   myHouseOrder2.OrderOfHouses.Add(orderOfHouse_12);
        //   new MyHouseOrderRepository().SaveOrUpdate(myHouseOrder2);
       

        //      //添加评价数据Valuing、ValuingComments、Score、ValuingItem
        //   IRepository<MyHouseOrder> iMyHouseOrderRepository = UnityHelper.UnityToT<IRepository<MyHouseOrder>>();

        //   IValuingOfMyHouseOrderRepository iValuingOfMyHouseOrderRepository = UnityHelper.UnityToT<IValuingOfMyHouseOrderRepository>();
        //   IRepository<ValuingItemOfMyHouseOrder> iValuingItemOfMyHouseOrderRepository = UnityHelper.UnityToT<IRepository<ValuingItemOfMyHouseOrder>>();
        //   IRepository<ScoreOfItemInHouseOrder> iScoreOfItemInHouseOrderRepository = UnityHelper.UnityToT<IRepository<ScoreOfItemInHouseOrder>>();
        //   IList<ValuingItemOfMyHouseOrder> iValuingItemOfMyHouseOrderOrders = new List<ValuingItemOfMyHouseOrder>();

        //   string[] vItemArray = { "送货速度", "服务态度", "商品质量" };
        //   foreach (var i in vItemArray)
        //   {
        //       ValuingItemOfMyHouseOrder vluItemOfFd = new ValuingItemOfMyHouseOrder()
        //       {
        //           ValuingItemName = i
        //       };
        //       iValuingItemOfMyHouseOrderRepository.SaveOrUpdate(vluItemOfFd);
        //       iValuingItemOfMyHouseOrderOrders.Add(vluItemOfFd);
        //   };

        //   ValuingComments valucmmt1_1 = new ValuingComments()
        //   {
        //       Comments = "商品的包装跟网页显示的不一样，质量很差，快递员送货不及时",
        //       Direction = 0,
        //       TrackIndex = 1,
        //   };
        //   ValuingComments valucmmt1_2 = new ValuingComments()
        //   {
        //       Comments = "能不能退货",
        //       Direction = 0,
        //       TrackIndex = 2,
        //   };
        //       ValuingOfMyHouseOrder vluOfFd1_1 = new ValuingOfMyHouseOrder()
        //       {
        //           LoginUser = sysLoginUser,
        //           Merchant = rent1,
        //           MyHouseOrder =myHouseOrder ,
        //           ValuingContent =  "送货速度慢，产品质量差，服务态度恶劣",
                   
        //       };
        //       new ValuingOfMyHouseOrderRepository().SaveOrUpdate(vluOfFd1_1);

        //       valucmmt1_1.Valuing = vluOfFd1_1;
        //       valucmmt1_2.Valuing = vluOfFd1_1;
        //       new ValuingCommentsRepository().SaveOrUpdate(valucmmt1_1);
        //       new ValuingCommentsRepository().SaveOrUpdate(valucmmt1_2);
  
        //       for (int j = 0; j < 3; j++)
        //       {
        //           ScoreOfItemInHouseOrder scoreOfItFd1_1 = new ScoreOfItemInHouseOrder()
        //           {
        //               Score = j,
        //               ValuingOfMyHouseOrder = vluOfFd1_1,
        //               ValuingItemOfMyHouseOrder = iValuingItemOfMyHouseOrderOrders[j],
        //           };
        //           vluOfFd1_1.ScoreOfItemInHouseOrders.Add(scoreOfItFd1_1);
        //           iValuingItemOfMyHouseOrderOrders[j].ScoreOfItemInHouseOrders.Add(scoreOfItFd1_1);
        //       };
        //       iValuingOfMyHouseOrderRepository.SaveOrUpdate(vluOfFd1_1);


        //       //第二个用户对第二个餐馆的valuing
        //       ValuingComments valucmmt2_1 = new ValuingComments()
        //       {
        //           Comments = "商品的包装跟网页显示的不一样，质量很差，快递员送货不及时",
        //           Direction = 0,
        //           TrackIndex = 1,
        //       };
        //       ValuingComments valucmmt2_2 = new ValuingComments()
        //       {
        //           Comments = "能不能退货",
        //           Direction = 0,
        //           TrackIndex = 2,
        //       };
        //       ValuingOfMyHouseOrder vluOfFd2_1 = new ValuingOfMyHouseOrder()
        //       {
        //           LoginUser = sysLoginUser2,
        //           Merchant = rent2,
        //           MyHouseOrder = myHouseOrder2,
        //           ValuingContent = "送货速度慢，产品质量差，服务态度恶劣",

        //       };
        //       new ValuingOfMyHouseOrderRepository().SaveOrUpdate(vluOfFd2_1);

        //       valucmmt2_1.Valuing = vluOfFd2_1;
        //       valucmmt2_2.Valuing = vluOfFd2_1;
        //       new ValuingCommentsRepository().SaveOrUpdate(valucmmt2_1);
        //       new ValuingCommentsRepository().SaveOrUpdate(valucmmt2_2);

        //       for (int j = 0; j < 3; j++)
        //       {
        //           ScoreOfItemInHouseOrder scoreOfItFd2_1 = new ScoreOfItemInHouseOrder()
        //           {
        //               Score = j,
        //               ValuingOfMyHouseOrder = vluOfFd2_1,
        //               ValuingItemOfMyHouseOrder = iValuingItemOfMyHouseOrderOrders[j],
        //           };
        //           vluOfFd2_1.ScoreOfItemInHouseOrders.Add(scoreOfItFd2_1);
        //           iValuingItemOfMyHouseOrderOrders[j].ScoreOfItemInHouseOrders.Add(scoreOfItFd2_1);
        //       };
        //       iValuingOfMyHouseOrderRepository.SaveOrUpdate(vluOfFd2_1);

        //       //添加Message模块
        //       IMessageRepository iMessageRepository = UnityHelper.UnityToT<IMessageRepository>();
        //       MessageContent mc1_1 = new MessageContent()
        //       {
        //           Content = "选择家，选择专家。资深置业顾问毛建军为您解决烦恼。用专业的眼光来审视每一个优质的房源。心与心的沟通，一次成交一辈子的朋友"
        //       };
        //       new MessageContentRepository().SaveOrUpdate(mc1_1);

        //       Message mess1_1 = new Message()
        //       {
        //           Direction = 0,
        //           Merchant = rent1,
        //           LoginUser = sysLoginUser,
        //           MessageContent = mc1_1,
        //           IsNew = true,
        //           ThreadIndex = "全套家具大户型出租",
        //           TrackIndex = "0"
        //       };
        //       new MessageRepository().SaveOrUpdate(mess1_1);

        //       MessageContent mc1_2 = new MessageContent()
        //       {
        //           Content = "超大客厅 约70平 非常适合公司老总等 高端人士居住，里有类似房源多套 可供选择",
        //       };
        //       new MessageContentRepository().SaveOrUpdate(mc1_2);

        //       Message mess1_2 = new Message()
        //       {
        //           Direction = 1,
        //           Merchant = rent1,
        //           LoginUser = sysLoginUser,
        //           MessageContent = mc1_2,
        //           IsNew = true,
        //           ThreadIndex = "全套家具大户型出租",
        //           TrackIndex = "1"
        //       };
        //       new MessageRepository().SaveOrUpdate(mess1_2);
        //       //第二个人的消息模块
        //       MessageContent mc2_1 = new MessageContent()
        //       {
        //           Content = "高档社区规范物业 高层 带电梯，室内精装修 超大客厅适合商住两用，靠近山大路科技市场 解放路 历山路 交通方便"
        //       };
        //       new MessageContentRepository().SaveOrUpdate(mc2_1);

        //       Message mess2_1 = new Message()
        //       {
        //           Direction = 0,
        //           Merchant = rent2,
        //           LoginUser = sysLoginUser2,
        //           MessageContent = mc2_1,
        //           IsNew = true,
        //           ThreadIndex = "绿景嘉园精装修出租房",
        //           TrackIndex = "0"
        //       };
        //       new MessageRepository().SaveOrUpdate(mess2_1);

        //       MessageContent mc2_2 = new MessageContent()
        //       {
        //           Content = "山大南路科技市场附近绿景嘉园双气精装超大客厅错层适合商住办公"
        //       };
        //       new MessageContentRepository().SaveOrUpdate(mc2_2);

        //       Message mess2_2 = new Message()
        //       {
        //           Direction = 1,
        //           Merchant = rent2,
        //           LoginUser = sysLoginUser2,
        //           MessageContent = mc2_2,
        //           IsNew = true,
        //           ThreadIndex = "绿景嘉园精装修出租房",
        //           TrackIndex = "1"
        //       };
        //       new MessageRepository().SaveOrUpdate(mess2_2);

        //       //添加FeedBack
        //       IFeedBackRepository iFeedBackRepository = UnityHelper.UnityToT<IFeedBackRepository>();
        //       FeedBack fb1 = new FeedBack()
        //       {
        //           Type = "1",
        //           Contents = "急寻月租在1200以下的100平房屋出租！",
        //           LoginUser = sysLoginUser
        //       };
        //       iFeedBackRepository.SaveOrUpdate(fb1);

        //       FeedBack fb2 = new FeedBack()
        //       {
        //           Type = "2",
        //           Contents = "房屋的实际装修与网上的图片效果差远了，店主坑人啊！",
        //           LoginUser = sysLoginUser2
        //       };
        //       FeedBack fb3 = new FeedBack()
        //       {
        //           Type = "2",
        //           Contents = "网上的效果是PS的,这位顾客，您的期望太高了啊！",
        //           ParentFeedBack = fb2,
        //           LoginUser = adminLoginUser
        //       };
        //       // iFeedBackRepository.SaveOrUpdate(fb3);
        //       fb2.ChildFeedBacks.Add(fb3);
        //       iFeedBackRepository.SaveOrUpdate(fb2);



        //       FeedBack fb4 = new FeedBack()
        //       {
        //           Type = "3",
        //           Contents = "此房屋中介机构推荐的房源都是些优质房源，顶！",
        //           LoginUser = sysLoginUser
        //       };

        //       FeedBack fb5 = new FeedBack()
        //       {
        //           Type = "3",
        //           Contents = "谢谢您的赞扬，我们会竭诚努力，精益求精！",
        //           ParentFeedBack = fb4,
        //           LoginUser = adminLoginUser
        //       };
        //       //   iFeedBackRepository.SaveOrUpdate(fb4);
        //       fb4.ChildFeedBacks.Add(fb5);
        //       iFeedBackRepository.SaveOrUpdate(fb4);
        //}
        public void add_ShopInfo()
        {
        
            IMerchantCategoryRepository iMerchantCategoryRepository = UnityHelper.UnityToT<IMerchantCategoryRepository>();
            IUserInRoleRepository iUserInRoleRepository = UnityHelper.UnityToT<IUserInRoleRepository>();
            IGlobalGoodsTypeRepository iGlobalGoodsTypeRepository = UnityHelper.UnityToT<IGlobalGoodsTypeRepository>();

            Shop shop1 = new Shop()
            {
                Activity = "五一大促销",
                Address = "山师东路66号",
                Bulletins = "9折促销",
                Description = "just come",
                Distance = "100",
                Email = "7366@qq.com",
                Logo = "/uploadimage/lshop1.png",
                sBrand = "/uploadimage/sshop1.jpg",
                bBrand = "/uploadimage/bshop1.jpg",
                Name = "大润发购物中心",
                Owener = "王力宏",
                ShortName = "大润发",
                Tel = "18799999992",
                Rate = 0.8,
                ShopStatus = ShopStatusEnum.营业时间,
                MerchantCategory = iMerchantCategoryRepository.SearchByMerchantCategoryName("综合购物中心"),
                MerchantType = MerchantTypeEnum.百货
            };
            //GlobalGoodsType shopCommodityTye_1 = new GlobalGoodsType() { Name = "专供酒水" };
            //new GlobalGoodsTypeRepository().SaveOrUpdate(shopCommodityTye_1);
            //GlobalGoodsType shopCommodityTye_2 = new GlobalGoodsType() { Name = "特供蔬菜" };
            //new GlobalGoodsTypeRepository().SaveOrUpdate(shopCommodityTye_2);
            //shop1.MerchantGoodsTypes.Add(shopCommodityTye_1);
            //shop1.MerchantGoodsTypes.Add(shopCommodityTye_2);
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
                    Image = "/uploadimage/c1.jpg",
                    IsDiscount = false,
                    InventoryCount = 100,
                    GlobalGoodsType = iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByName("白酒"),
                    //2013-05-09 basilwang 增加family
                    GlobalGoodsTypeFamily = iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByName("白酒").Family,
                    Shop= shop1,
                    Amount=100,
                    AverageValuing=4,
                    DiscountInventoryCount=50,
                    DiscountPrice=8.5,
                    MonthAmount=300,
                    OldPrice=15,
                    ValuingCount=20,
                    IsEnabled=true,
                    IsLimited=false,
                    Description="五一大促销"

                };
                shop1.Commodities.Add(commodity_1);

                Commodity commodity_2 = new Commodity()
                {
                    Name = "章丘大葱",
                    Price = 15,
                    Image = "/uploadimage/c2.jpg",
                    IsDiscount = true,
                    InventoryCount = 200,
                    DiscountInventoryCount = 100,
                    GlobalGoodsType = iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByName("蔬菜"),
                    //2013-05-09 basilwang 增加family
                    GlobalGoodsTypeFamily = iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByName("蔬菜").Family,
                    DiscountPrice = 10,
                    Shop= shop1,
                    IsLimited = true,
                    Amount = 100,
                    AverageValuing = 4,
                    MonthAmount = 300,
                    OldPrice = 15,
                    ValuingCount = 20,
                    IsEnabled = true,
                    Description = "五一大促销"
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
               Logo = "/uploadimage/lshop2.png",
               sBrand = "/uploadimage/sshop2.jpg",
               bBrand = "/uploadimage/bshop2.jpg",
               Name = "银座连锁购物中心",
               Owener = "姜文",
               ShortName = "银座",
               Tel = "18799999992",
               Rate = 0.8,
               ShopStatus = ShopStatusEnum.营业时间,
               MerchantCategory = iMerchantCategoryRepository.SearchByMerchantCategoryName("综合购物中心"),
               MerchantType = MerchantTypeEnum.百货
           };
           //GlobalGoodsType shopCommodityTye_12 = new GlobalGoodsType() { Name = "金制品" };
           //new GlobalGoodsTypeRepository().SaveOrUpdate(shopCommodityTye_12);
           //GlobalGoodsType shopCommodityTye_22 = new GlobalGoodsType() { Name = "茶叶" };
           //new GlobalGoodsTypeRepository().SaveOrUpdate(shopCommodityTye_22);
           //shop2.MerchantGoodsTypes.Add(shopCommodityTye_12);
           //shop2.MerchantGoodsTypes.Add(shopCommodityTye_22);
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
               Image = "/uploadimage/c3.jpg",
               IsDiscount = false,
               InventoryCount = 100,
               GlobalGoodsType = iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByName("戒指"),
               //2013-05-09 basilwang 增加family
               GlobalGoodsTypeFamily = iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByName("戒指").Family,
               Shop= shop2,
               Amount = 100,
               AverageValuing = 4,
               DiscountInventoryCount = 50,
               DiscountPrice = 8.5,
               MonthAmount = 300,
               OldPrice = 15,
               ValuingCount = 20,
               IsEnabled = true,
               IsLimited = false,
               Description = "五一大促销"
           };
           shop1.Commodities.Add(commodity_12);

           Commodity commodity_22 = new Commodity()
           {
               Name = "铁观音",
               Price = 15,
               Image = "/uploadimage/c4.jpg",
               IsDiscount = true,
               InventoryCount = 200,
               DiscountInventoryCount = 100,
               GlobalGoodsType = iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByName("铁观音"),
               //2013-05-09 basilwang 增加family
               GlobalGoodsTypeFamily = iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByName("铁观音").Family,
               DiscountPrice = 10,
               Shop= shop2,
               IsLimited = true,
               Amount = 100,
               AverageValuing = 4,
               MonthAmount = 300,
               OldPrice = 15,
               ValuingCount = 20,
               IsEnabled = true,
               Description = "五一大促销"
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

           //添加评价数据Valuing、ValuingComments、Score、ValuingItem
           IRepository<MyCommodityOrder> iMyCommodityOrderRepository = UnityHelper.UnityToT<IRepository<MyCommodityOrder>>();

           IValuingOfMyCommodityOrderRepository iValuingOfMyCommodityOrderRepository = UnityHelper.UnityToT<IValuingOfMyCommodityOrderRepository>();
           IRepository<ValuingItemOfMyCommodityOrder> iValuingItemOfMyCommodityOrderRepository = UnityHelper.UnityToT<IRepository<ValuingItemOfMyCommodityOrder>>();
           IRepository<ScoreOfItemInCommodityOrder> iScoreOfItemInCommodityOrderRepository = UnityHelper.UnityToT<IRepository<ScoreOfItemInCommodityOrder>>();
           IList<ValuingItemOfMyCommodityOrder> iValuingItemOfMyCommodityOrderOrders = new List<ValuingItemOfMyCommodityOrder>();

           string[] vItemArray = { "送货速度", "服务态度", "商品质量" };
           foreach (var i in vItemArray)
           {
               ValuingItemOfMyCommodityOrder vluItemOfFd = new ValuingItemOfMyCommodityOrder()
               {
                   ValuingItemName = i
               };
               iValuingItemOfMyCommodityOrderRepository.SaveOrUpdate(vluItemOfFd);
               iValuingItemOfMyCommodityOrderOrders.Add(vluItemOfFd);
           };

           ValuingComments valucmmt1_1 = new ValuingComments()
           {
               Comments = "商品的包装跟网页显示的不一样，质量很差，快递员送货不及时",
               Direction = 0,
               TrackIndex = 1,
           };
           ValuingComments valucmmt1_2 = new ValuingComments()
           {
               Comments = "能不能退货",
               Direction = 0,
               TrackIndex = 2,
           };
           ValuingOfMyCommodityOrder vluOfFd1_1 = new ValuingOfMyCommodityOrder()
           {
               LoginUser = sysLoginUser,
               Merchant = shop1,
               MyCommodityOrder = myCommodityOrder,
               ValuingContent = "送货速度慢，产品质量差，服务态度恶劣",

           };
           new ValuingOfMyCommodityOrderRepository().SaveOrUpdate(vluOfFd1_1);

           valucmmt1_1.Valuing = vluOfFd1_1;
           valucmmt1_2.Valuing = vluOfFd1_1;
           new ValuingCommentsRepository().SaveOrUpdate(valucmmt1_1);
           new ValuingCommentsRepository().SaveOrUpdate(valucmmt1_2);

           for (int j = 0; j < 3; j++)
           {
               ScoreOfItemInCommodityOrder scoreOfItFd1_1 = new ScoreOfItemInCommodityOrder()
               {
                   Score = j,
                   ValuingOfMyCommodityOrder = vluOfFd1_1,
                   ValuingItemOfMyCommodityOrder = iValuingItemOfMyCommodityOrderOrders[j],
               };
               vluOfFd1_1.ScoreOfItemInCommodityOrders.Add(scoreOfItFd1_1);
               iValuingItemOfMyCommodityOrderOrders[j].ScoreOfItemInCommodityOrders.Add(scoreOfItFd1_1);
           };
           iValuingOfMyCommodityOrderRepository.SaveOrUpdate(vluOfFd1_1);


           //第二个用户对第二个shop的valuing
           ValuingComments valucmmt2_1 = new ValuingComments()
           {
               Comments = "商品的包装跟网页显示的不一样，质量很差，快递员送货不及时",
               Direction = 0,
               TrackIndex = 1,
           };
           ValuingComments valucmmt2_2 = new ValuingComments()
           {
               Comments = "能不能退货",
               Direction = 0,
               TrackIndex = 2,
           };
           ValuingOfMyCommodityOrder vluOfFd2_1 = new ValuingOfMyCommodityOrder()
           {
               LoginUser = sysLoginUser2,
               Merchant = shop2,
               MyCommodityOrder = myCommodityOrder2,
               ValuingContent = "送货速度慢，产品质量差，服务态度恶劣",

           };
           new ValuingOfMyCommodityOrderRepository().SaveOrUpdate(vluOfFd2_1);

           valucmmt2_1.Valuing = vluOfFd2_1;
           valucmmt2_2.Valuing = vluOfFd2_1;
           new ValuingCommentsRepository().SaveOrUpdate(valucmmt2_1);
           new ValuingCommentsRepository().SaveOrUpdate(valucmmt2_2);

           for (int j = 0; j < 3; j++)
           {
               ScoreOfItemInCommodityOrder scoreOfItFd2_1 = new ScoreOfItemInCommodityOrder()
               {
                   Score = j,
                   ValuingOfMyCommodityOrder = vluOfFd2_1,
                   ValuingItemOfMyCommodityOrder = iValuingItemOfMyCommodityOrderOrders[j],
               };
               vluOfFd2_1.ScoreOfItemInCommodityOrders.Add(scoreOfItFd2_1);
               iValuingItemOfMyCommodityOrderOrders[j].ScoreOfItemInCommodityOrders.Add(scoreOfItFd2_1);
           };
           iValuingOfMyCommodityOrderRepository.SaveOrUpdate(vluOfFd2_1);

           //添加Message模块
           IMessageRepository iMessageRepository = UnityHelper.UnityToT<IMessageRepository>();
           MessageContent mc1_1 = new MessageContent()
           {
               Content = "如何增强账户安全系数？"
           };
           new MessageContentRepository().SaveOrUpdate(mc1_1);

           Message mess1_1 = new Message()
           {
               Direction = 0,
               Merchant = shop1,
               LoginUser = sysLoginUser,
               MessageContent = mc1_1,
               IsNew = true,
               ThreadIndex = "京东商城店铺使用",
               TrackIndex = "0"
           };
           new MessageRepository().SaveOrUpdate(mess1_1);

           MessageContent mc1_2 = new MessageContent()
           {
               Content = "您可以登录京东商城账户， 在“我的京东-账户信息-账户安全”里，通过经常性修改密码、绑定账户到邮箱和手机、设置支付密码的方式增加账户安全系数，保证账户安全。",
           };
           new MessageContentRepository().SaveOrUpdate(mc1_2);

           Message mess1_2 = new Message()
           {
               Direction = 1,
               Merchant = shop1,
               LoginUser = sysLoginUser,
               MessageContent = mc1_2,
               IsNew = true,
               ThreadIndex = "京东商城店铺使用",
               TrackIndex = "1"
           };
           new MessageRepository().SaveOrUpdate(mess1_2);
           //第二个人的消息模块
           MessageContent mc2_1 = new MessageContent()
           {
               Content = "京东自营商品售后服务运费规则有哪些？"
           };
           new MessageContentRepository().SaveOrUpdate(mc2_1);

           Message mess2_1 = new Message()
           {
               Direction = 0,
               Merchant = shop2,
               LoginUser = sysLoginUser2,
               MessageContent = mc2_1,
               IsNew = true,
               ThreadIndex = "运费规则",
               TrackIndex = "0"
           };
           new MessageRepository().SaveOrUpdate(mess2_1);

           MessageContent mc2_2 = new MessageContent()
           {
               Content = "A.双免：双向免费，即上门取件和寄还都免费。取（返）件包含两种形式：1）在京东取件范围内（含合作三方快递），可免费上门取件；2）客户也可采取自行发货（不含EMS、顺丰，拒收到付）寄回京东，运费以余额方式返还（余额可在京东直接消费或联系客服返还银行卡）。"
           };
           new MessageContentRepository().SaveOrUpdate(mc2_2);

           Message mess2_2 = new Message()
           {
               Direction = 1,
               Merchant = shop2,
               LoginUser = sysLoginUser2,
               MessageContent = mc2_2,
               IsNew = true,
               ThreadIndex = "运费规则",
               TrackIndex = "1"
           };
           new MessageRepository().SaveOrUpdate(mess2_2);

           //添加FeedBack
           IFeedBackRepository iFeedBackRepository = UnityHelper.UnityToT<IFeedBackRepository>();
           

           FeedBack fb1 = new FeedBack()
           {
               Type = "1",
               Contents = "请问商店五一期间有什么促销活动吗？",
               LoginUser = sysLoginUser
           };
           iFeedBackRepository.SaveOrUpdate(fb1);

           FeedBack fb2 = new FeedBack()
           {
               Type = "2",
               Contents = "从商店购买的物品出现了质量物品，可以更换吗？",
               LoginUser = sysLoginUser2
           };
           FeedBack fb3 = new FeedBack()
           {
               Type = "2",
               Contents = "可以，请到商店前台，凭发票审查",
               ParentFeedBack = fb2,
               LoginUser = adminLoginUser
           };
           // iFeedBackRepository.SaveOrUpdate(fb3);
           fb2.ChildFeedBacks.Add(fb3);
           iFeedBackRepository.SaveOrUpdate(fb2);



           FeedBack fb4 = new FeedBack()
           {
               Type = "3",
               Contents = "请问商店售后服务运费规则有哪些？",
               LoginUser = sysLoginUser
           };

           FeedBack fb5 = new FeedBack()
           {
               Type = "3",
               Contents = "向免费，即上门取件付费。取（返）件包含两种形式：1）京东自营上门取件收取费用收费标准>>，收费方式>>；2）客户通过第三方快递将商品寄回京东售后部，运费自付；",
               ParentFeedBack = fb4,
               LoginUser = adminLoginUser
           };
           //   iFeedBackRepository.SaveOrUpdate(fb4);
           fb4.ChildFeedBacks.Add(fb5);
           iFeedBackRepository.SaveOrUpdate(fb4);
        }

    }
}


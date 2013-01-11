using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Runtime.Remoting.Contexts;
using friday.core.domain;
using friday.core.repositories;



namespace friday.core.components
{
    public class CurrentUser
    {
        public CurrentUser()
        {
            if (!HttpContext.Current.User.Identity.IsAuthenticated)
                //HttpContext.Current.Response.RedirectLocation="LoginT.aspx";
                throw new WeatException("用户未登录");//必须要用户Form验证后才能使用CurrentUser

            var cache = new WebCache();
            if (cache.GetSessionCache("currentuser") == null)
            {
                //var menuRepo = UnityHelper.UnityToT<ISystemMenuRepository>();
                //var userRepo = UnityHelper.UnityToT<ISystemUserRepository>();
                //var buttonRepo = UnityHelper.UnityToT<ISystemButtonRepository>();
                //var companyRepo = UnityHelper.UnityToT<ISystemCompanyRepository>();
                var loginRepo = new Repository<SystemUser>();

                //string CompanyID = ((System.Web.Security.FormsIdentity)(HttpContext.Current.User.Identity)).Ticket.UserData.ToString();
                string loginId = HttpContext.Current.User.Identity.Name;

                UserInfo = loginRepo.Get(loginId);

                ////2010-12-23尹福青从跳票中取到公司的ID
                //CompanyInfo = companyRepo.GetBySystemCompanyTreeCode(CompanyID);

                //2010-10-22 王华杰 需要根据userID得到menu和button
                //MenuPermission = menuRepo(UserInfo.Id);
                //ActionPermission =buttonRepo(UserInfo.Id);
                // UserInfo us = new UserInfo();

                //userRepo.IfSucess(UserInfo.UserName, UserInfo.Password);
                //菜单
                //MenuList = menuRepo.GetMenuByUserIDandCompanyID(UserInfo.Id, CompanyInfo.Id);
                ////按钮
                //ButtonList = buttonRepo.GetButtonByUserIDandCompanyID(UserInfo.Id, CompanyInfo.Id);
                ////公司
                //CompanyList = companyRepo.GetCompanyByUserID(UserInfo.Id);
                ////角色
                //RoleList = roleRepo.GetRoleByUserIDandCompanyID(UserInfo.Id, CompanyInfo.Id);                
                cache.SetSessionCache("currentuser", this);
            }
            else
            {
                var u = (CurrentUser)cache.GetSessionCache("currentuser");
                UserInfo = u.UserInfo;
            }
        }
        //登录信息
        //public SystemUserLogin login { get; set; }

        //用户信息
        public SystemUser UserInfo{ get; set; }

        ////公司信息
        //public SystemCompany CompanyInfo { get; set; }

        ////部门信息
        //public Department Department { get; set; }

        ////菜单权限
        //public IList<SystemMenu> MenuList { get; set; }

        ////功能权限
        //public IList<SystemButton> ButtonList { get; set; }
        ////公司权限
        //public IList<SystemCompany> CompanyList { get; set; }
        ////角色权限
        //public IList<SystemRole> RoleList { get; set; }

    }
}

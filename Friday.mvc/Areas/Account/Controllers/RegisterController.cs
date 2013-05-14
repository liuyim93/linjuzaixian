using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using friday.core.services;
using friday.core.domain;
using friday.core;

namespace Friday.mvc.Areas.Account.Controllers
{
    public class RegisterController : Controller
    {
        //
        // GET: /Account/Register/

        
        private ISystemUserService iSystemUserService;
        private IAddressService iAddressService;
        private ISystemRoleService iSystemRoleService;
        private IUserInRoleService iUserInRoleService;
        private ILoginUserService iLoginUserService;

        public RegisterController(ILoginUserService iLoginUserService, ISystemUserService iSystemUserService, IAddressService iAddressService, ISystemRoleService iSystemRoleService, IUserInRoleService iUserInRoleService)
        {
            this.iLoginUserService = iLoginUserService;
            this.iSystemUserService = iSystemUserService;
            this.iAddressService = iAddressService;
            this.iSystemRoleService = iSystemRoleService;
            this.iUserInRoleService = iUserInRoleService;
        }

        public ActionResult Index()
        {


            return View();
        }

        public ActionResult Store(string MemberName, string J_Tel, string J_Mail, string J_Address, string J_Pwd)
        {   


            LoginUser lu = new LoginUser();
            lu.LoginName = MemberName;
            lu.Password = J_Pwd;
            lu.IsAdmin = false;
            lu.IsDelete = false;
            iLoginUserService.Save(lu);

            SystemUser su = new SystemUser();
            su.Email = J_Mail;
            su.IsAnonymous = false;
            su.IsDelete = false;
            su.LoginUser = lu;
            su.Tel = J_Tel;
            iSystemUserService.Save(su);

            UserInRole ur = new UserInRole();
            ur.LoginUser = lu;
            ur.SystemRole = iSystemRoleService.GetRoleByName("顾客");
            iUserInRoleService.Save(ur);

            Address ad = new Address();
            ad.AddressName = J_Address;
            ad.Email = J_Mail;
            ad.SystemUser = su;
            ad.Tel = J_Tel;
            ad.IsDelete = false;
            iAddressService.Save(ad);


            return View();
        }

    }
}

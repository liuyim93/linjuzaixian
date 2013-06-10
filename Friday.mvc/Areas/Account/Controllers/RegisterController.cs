﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using friday.core.services;
using friday.core.domain;
using friday.core;
using Friday.mvc.Models;
using friday.core.repositories;
using friday.core.components;
using Friday.mvc.Areas.Merchant.Models;
using System.Web.Security;
using Friday.mvc.Controllers;

namespace Friday.mvc.Areas.Account.Controllers
{
    public class RegisterController : FridayController
    {
        //
        // GET: /Account/Register/

        private IActivityService iActivityService;
        private ISystemUserService iSystemUserService;
        private IAddressService iAddressService;
        private ISystemRoleService iSystemRoleService;
        private IUserInRoleService iUserInRoleService;
        private ILoginUserService iLoginUserService;
        private ISchoolService iSchoolService;

        public RegisterController(IUserService iUserService, ISystemUserRepository iSystemUserRepository, IActivityService iActivityService, ILoginUserService iLoginUserService, ISystemUserService iSystemUserService, IAddressService iAddressService, ISystemRoleService iSystemRoleService, IUserInRoleService iUserInRoleService, ISchoolService iSchoolService)
            : base(iUserService, iSystemUserRepository)
        {
            this.iActivityService = iActivityService;
            this.iLoginUserService = iLoginUserService;
            this.iSystemUserService = iSystemUserService;
            this.iAddressService = iAddressService;
            this.iSystemRoleService = iSystemRoleService;
            this.iUserInRoleService = iUserInRoleService;
            this.iSchoolService = iSchoolService;
        }

        public ActionResult Index()
        {
            RegisterModel regstermodel = new RegisterModel();
            regstermodel.isReg = false;
            regstermodel.Activities = this.iActivityService.GetAll();

            return View(regstermodel);
        }

        public ActionResult check_nick()
        {
            string loginName;

            loginName = Request.Params["nick"];

            //{"success":false,"reason":"ERROR_DUP_NICK_NAME","commandNick":["jingang_54","jingang_67","jingang9181"]}

            FormatJsonResult jsonResult = new FormatJsonResult();

            if (!iLoginUserService.ValidateLoginName(loginName))
            {
                jsonResult.Data = new
                {
                    success = iLoginUserService.ValidateLoginName(loginName),
                    reason = "ERROR_DUP_NICK_NAME"
                };
            }
            else 
            {
                jsonResult.Data = new
                {
                    success = true,
                };
            }
            string json = jsonResult.FormatResult();
            string script = json;

            return JavaScript(script);
        }

        public ActionResult check_cellphone()
        {
            string cellphone;

            cellphone = Request.Params["mobile"];

            //{"success":false,"reason":"ERROR_CELLPHONE_EXISTED","alipay":true}

            FormatJsonResult jsonResult = new FormatJsonResult();

            if (!iSystemUserService.ValidateTel(cellphone))
            {
                jsonResult.Data = new
                {
                    success = iSystemUserService.ValidateTel(cellphone),
                    reason = "ERROR_CELLPHONE_EXISTED",
                    alipay=true
                };
            }
            else
            {
                jsonResult.Data = new
                {
                    success = true,
                    alipay=true
                };
            }
            string json = jsonResult.FormatResult();
            string script = json;

            return JavaScript(script);
        }

        public ActionResult Store(string J_Nick, string mobile, string email, string J_Address, string J_Pwd)
        {
            RegisterModel regstermodel = new RegisterModel();

            School school = iSchoolService.Load(J_Address);

            SystemUser su = new SystemUser();
            su.Email = email;
            su.IsAnonymous = false;
            su.IsDelete = false;
            su.Tel = mobile;
            su.School = school;
            iSystemUserService.Save(su);

            LoginUser lu = new LoginUser();
            lu.LoginName = J_Nick;
            lu.Password = J_Pwd;
            lu.IsAdmin = false;
            lu.IsDelete = false;
            lu.SystemUser = su;
            iLoginUserService.Save(lu);

            UserInRole ur = new UserInRole();
            ur.LoginUser = lu;
            ur.SystemRole = iSystemRoleService.GetRoleByName("顾客");
            iUserInRoleService.Save(ur);



            Address ad = new Address();
            ad.AddressName = school.Name;
            ad.Email = email;
            ad.SystemUser = su;
            ad.Tel = mobile;
            ad.IsDelete = false;
            iAddressService.Save(ad);

            regstermodel.isReg = true;
            regstermodel.Activities = this.iActivityService.GetAll();
            regstermodel.tel = mobile;
            regstermodel.loginName = J_Nick;

            
            populateFormAuthCookie(false, su.Id, "");

            return View("Index", regstermodel);
        }

    }
}

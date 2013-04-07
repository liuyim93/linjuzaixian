using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.repositories;
using friday.core.domain;
using friday.core.utils;
using System.Web;

namespace friday.core.services
{
    public class UserService:IUserService
    {
        ISystemUserRepository iSystemUserRepository;
        ILoginUserRepository iLoginUserRepository;
        public UserService(ISystemUserRepository iSystemUserRepository, ILoginUserRepository iLoginUserRepository)
        {
            this.iSystemUserRepository = iSystemUserRepository;
            this.iLoginUserRepository = iLoginUserRepository;
        }
        //public SystemUser getSystemUser(string id)
        //{
        //    return this.systemUserRepository.Get(id);
        //}
        //public void saveOrUpdateSystemUser(SystemUser user)
        //{
        //    this.systemUserRepository.SaveOrUpdate(user);
        //}
        private SystemUser GetOrCreateUser(CookieBag bag)
        {
            SystemUser systemUser = null;
            try
            {
                systemUser = iSystemUserRepository.Get(bag.id);
            }
            catch (Exception ex)
            {
                bag.remove();
            }
            return systemUser;
        }
        public SystemUser GetOrCreateUser(HttpContextBase httpContextBase)
        {
            return GetOrCreateUser(CookieUtil.getUserCookie(httpContextBase));
        }
        public LoginUser GetLoginUser(HttpContextBase httpContextBase)
        {
            return GetLoginUser(CookieUtil.getUserCookie(httpContextBase,false));
        }
        private LoginUser GetLoginUser(CookieBag bag)
        {
            LoginUser loginUser = null;
            try
            {
                loginUser = iLoginUserRepository.Get(bag.id);
            }
            catch (Exception ex)
            {
                bag.remove();
            }
            return loginUser;
        }
        public LoginUser getLoginUserByLoginName(string loginName)
        {
            if (!string.IsNullOrEmpty(loginName))
            {
                return iLoginUserRepository.GetLoginUserByLoginName(loginName);
            }
            return null;

        }
        public LoginUser getLoginUserByEmail(string emai)
        {
            if (!string.IsNullOrEmpty(emai))
            {
                return iLoginUserRepository.GetLoginUserByEmail(emai);
            }
            return null;
        }
      
    }
}

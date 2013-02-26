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
        public UserService(ISystemUserRepository iSystemUserRepository)
        {
            this.iSystemUserRepository = iSystemUserRepository;
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
    }
}

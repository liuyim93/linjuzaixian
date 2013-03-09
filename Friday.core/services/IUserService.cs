using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using System.Web;

namespace friday.core.services
{
    public interface IUserService
    {
        //SystemUser getSystemUser(string id);
        //void saveOrUpdateSystemUser(SystemUser user);
        SystemUser GetOrCreateUser(HttpContextBase httpContextBase);
        LoginUser GetLoginUser(HttpContextBase httpContextBase);
        LoginUser getLoginUserByLoginName(string loginName);
        LoginUser getLoginUserByEmail(string email);
    }
}

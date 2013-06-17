using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.repositories
{
    public interface ILoginUserRepository : IRepository<LoginUser>
    {
        LoginUser GetLoginUserByLoginName(string LoginName);
        IList<LoginUser> Search(List<DataFilter> termList);
        IList<LoginUser> Search(List<DataFilter> termList, int start, int limit, out long total);
        LoginUser GetLoginUserByEmail(string email);
        bool ValidateLoginName(string loginName);
        bool IsHaveLoginName(string loginName);
    }
}

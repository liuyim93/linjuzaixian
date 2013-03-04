using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.services
{
    public interface ILoginUserService
    {
        LoginUser Load(string id);
        void Save(LoginUser loginUser);
        void Update(LoginUser loginUser);
        void Delete(string id);
        LoginUser GetLoginUserByLoginName(string name);
        IList<LoginUser> Search(List<DataFilter> termList);
        IList<LoginUser> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}

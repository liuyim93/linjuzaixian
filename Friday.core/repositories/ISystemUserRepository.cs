using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.repositories
{
    public interface ISystemUserRepository : IRepository<SystemUser>
    {
        IList<SystemUser> Search(List<DataFilter> termList);
        IList<SystemUser> Search(List<DataFilter> termList, int start, int limit, out long total);
        bool ValidateTel(string tel); 
        bool ValidateLoginHasSystemUser(string LName);
        IList<SystemUser> GetSystemUser(DateTime startTime, DateTime endTime, bool IsAnonymous);
    }
}

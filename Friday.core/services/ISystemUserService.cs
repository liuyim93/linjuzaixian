using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.services
{
    public interface ISystemUserService
    {
        SystemUser Load(string id);
        void Save(SystemUser systemUser);
        void Update(SystemUser systemUser);
        void Delete(string id);
        IList<SystemUser> Search(List<DataFilter> termList);
        IList<SystemUser> Search(List<DataFilter> termList, int start, int limit, out long total);
        bool ValidateTel(string tel);
    }
}

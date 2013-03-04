using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface ISystemRoleService
    {
        SystemRole Load(string id);
        void Save(SystemRole systemRole);
        void Update(SystemRole systemRole);
        void Delete(string id);
        SystemRole GetRoleByName(string SystemRoleName);
        IList<SystemRole> Search(List<DataFilter> termList);
        IList<SystemRole> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}

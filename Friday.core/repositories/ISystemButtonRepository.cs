using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.repositories
{
    public interface ISystemButtonRepository : IRepository<SystemButton>
    {
        List<SystemButton> GetSystemButtonByMenuID(string MenuID);

    }
}

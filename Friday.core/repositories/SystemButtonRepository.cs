using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.repositories
{
    public class SystemButtonRepository:Repository<SystemButton>,ISystemButtonRepository
    {
        public List<SystemButton> GetSystemButtonByMenuID(string MenuID)
        {
            var query = Session.CreateQuery(@"select u from SystemButton as u,SystemMenu as m where u.Menu=m.Id and  m.TreeCode=:MenuID")
                            .SetString("MenuID", MenuID);
            return query.List<SystemButton>().ToList<SystemButton>();


        }
    }
}

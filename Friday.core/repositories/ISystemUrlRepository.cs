using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace friday.core.repositories
{
    public interface ISystemUrlRepository : IRepository<SystemUrl>    
    {
        SystemUrl GetByUrlPath(string name);
        bool GetByRel(string Rel);
    }
}

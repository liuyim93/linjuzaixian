using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.repositories
{
    public interface IMessageRepository : IRepository<Message>
    {
        Message SearchByShortName(string name);
        IList<Message> Search(List<DataFilter> termList);
        IList<Message> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}

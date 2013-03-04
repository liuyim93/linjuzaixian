using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface IMessageService
    {
        Message Load(string id);
        void Save(Message message);
        void Update(Message message);
        void Delete(string id);
        IList<Message> Search(List<DataFilter> termList);
        IList<Message> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}

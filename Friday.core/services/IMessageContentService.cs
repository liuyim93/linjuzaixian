using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface IMessageContentService
    {
        MessageContent Load(string id);
        void Save(MessageContent messageContent);
        void Update(MessageContent messageContent);
        void Delete(string id);
    }
}

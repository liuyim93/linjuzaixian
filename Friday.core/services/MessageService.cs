using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.utils;
using friday.core.repositories;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public class MessageService:IMessageService
    {
        private IMessageRepository iMessageRepository;
        private ILogger iLogger;
        public MessageService(IMessageRepository iMessageRepository, ILogger iLogger)
        {
            this.iMessageRepository = iMessageRepository;
            this.iLogger = iLogger;
        }
        public Message Load(string id)
        {
            return iMessageRepository.Load(id);
        }

        public void Save(Message message)
        {
            iLogger.LogMessage("插入Message数据，ID：" + message.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMessageRepository.SaveOrUpdate(message);
        }

        public void Update(Message message)
        {
            iLogger.LogMessage("更新Message数据，ID：" + message.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMessageRepository.SaveOrUpdate(message);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除Message数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMessageRepository.Delete(id);
        }

        public IList<Message> Search(List<DataFilter> termList)
        {
            return iMessageRepository.Search(termList);
        }

        public IList<Message> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iMessageRepository.Search(termList, start, limit, out total);
        }
    }
}

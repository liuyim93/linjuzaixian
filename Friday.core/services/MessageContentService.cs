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
    public class MessageContentService:IMessageContentService
    {
        private IMessageContentRepository iMessageContentRepository;
        private ILogger iLogger;
        public MessageContentService(IMessageContentRepository iMessageContentRepository, ILogger iLogger)
        {
            this.iMessageContentRepository = iMessageContentRepository;
            this.iLogger = iLogger;
        }
        public MessageContent Load(string id)
        {
            return iMessageContentRepository.Load(id);
        }

        public void Save(MessageContent messageContent)
        {
            iLogger.LogMessage("插入MessageContent数据，ID：" + messageContent.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMessageContentRepository.SaveOrUpdate(messageContent);
        }

        public void Update(MessageContent messageContent)
        {
            iLogger.LogMessage("更新MessageContent数据，ID：" + messageContent.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMessageContentRepository.SaveOrUpdate(messageContent);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除MessageContent数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMessageContentRepository.Delete(id);
        }

     
    }
}

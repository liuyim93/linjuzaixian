using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.repositories;
using friday.core.utils;
using friday.core.components;

namespace friday.core.services
{
    public class FeedBackService:IFeedBackService
    {
       private IFeedBackRepository iFeedBackRepository;
        private ILogger iLogger;
        public FeedBackService(IFeedBackRepository iFeedBackRepository, ILogger iLogger)
        {
            this.iFeedBackRepository = iFeedBackRepository;
            this.iLogger = iLogger;
        }
        public FeedBack Load(string id)
        {
            return iFeedBackRepository.Load(id);
        }

        public void Save(FeedBack feedBack)
        {
            iLogger.LogMessage("插入FeedBack数据，ID：" + feedBack.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iFeedBackRepository.SaveOrUpdate(feedBack);
        }

        public void Update(FeedBack feedBack)
        {
            iLogger.LogMessage("更新FeedBack数据，ID：" + feedBack.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iFeedBackRepository.SaveOrUpdate(feedBack);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除FeedBack数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iFeedBackRepository.Delete(id);
        }

        public IList<FeedBack> Search(List<DataFilter> termList)
        {
            return iFeedBackRepository.Search(termList);
        }

        public IList<FeedBack> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iFeedBackRepository.Search(termList, start, limit, out total);
        }

    }
}

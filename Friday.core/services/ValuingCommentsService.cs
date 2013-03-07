using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.repositories;
using friday.core.domain;
using friday.core.utils;
using friday.core.components;

namespace friday.core.services
{
    public class ValuingCommentsService : IValuingCommentsService
    {
        private IValuingCommentsRepository iValuingCommentsRepository;
        private ILogger iLogger;
        public ValuingCommentsService(IValuingCommentsRepository iValuingCommentsRepository, ILogger iLogger)
        {
            this.iValuingCommentsRepository = iValuingCommentsRepository;
            this.iLogger = iLogger;
        }
        public ValuingComments Load(string id)
        {
            return iValuingCommentsRepository.Load(id);
        }

        public int GetValuingCommentsCount(string valuingID)
        {
            return iValuingCommentsRepository.GetValuingCommentsCount(valuingID);
        }

        public void Save(ValuingComments valuingComments)
        {
            iLogger.LogMessage("插入ValuingComments数据，ID：" + valuingComments.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iValuingCommentsRepository.SaveOrUpdate(valuingComments);
        }

        public void Update(ValuingComments valuingComments)
        {
            iLogger.LogMessage("更新ValuingComments数据，ID：" + valuingComments.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iValuingCommentsRepository.SaveOrUpdate(valuingComments);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除ValuingComments数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iValuingCommentsRepository.Delete(id);
        }

        public IList<ValuingComments> Search(List<DataFilter> termList)
        {
            return iValuingCommentsRepository.Search(termList);
        }

        public IList<ValuingComments> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iValuingCommentsRepository.Search(termList, start, limit, out total);
        }
    }
}

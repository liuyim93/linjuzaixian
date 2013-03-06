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
    public class LogService:ILogService
    {
        private ILogRepository iLogRepository;
        private ILogger iLogger;
        public LogService(ILogRepository iLogRepository, ILogger iLogger)
        {
            this.iLogRepository = iLogRepository;
            this.iLogger = iLogger;
        }
        public Log Load(string id)
        {
            return iLogRepository.GerLogByLogID(id);
        }     

        public IList<Log> Search(List<DataFilter> termList)
        {
            return iLogRepository.Search(termList);
        }

        public IList<Log> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iLogRepository.Search(termList, start, limit, out total);
        }
    }
}

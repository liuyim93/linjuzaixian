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
    public class ActivityService:IActivityService
    {
       private IActivityRepository iActivityRepository;
        private ILogger iLogger;
        public ActivityService(IActivityRepository iActivityRepository, ILogger iLogger)
        {
            this.iActivityRepository = iActivityRepository;
            this.iLogger = iLogger;
        }
        public Activity Load(string id)
        {
            return iActivityRepository.Load(id);
        }

        public void Save(Activity activity)
        {
            iLogger.LogMessage("插入Activity数据，ID：" + activity.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iActivityRepository.SaveOrUpdate(activity);
        }

        public void Update(Activity activity)
        {
            iLogger.LogMessage("更新Activity数据，ID：" + activity.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iActivityRepository.SaveOrUpdate(activity);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除Activity数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iActivityRepository.Delete(id);
        }
        public Activity SearchByActivityName(string name)
        {
            return iActivityRepository.SearchByShortName(name);
        }

        public IList<Activity> Search(List<DataFilter> termList)
        {
            return iActivityRepository.Search(termList);
        }

        public IList<Activity> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iActivityRepository.Search(termList, start, limit, out total);
        }

    }
}

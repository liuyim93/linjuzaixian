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
    public class SectionService:ISectionService
    {
        private ISectionRepository iSectionRepository;
        private ILogger iLogger;
        public SectionService(ISectionRepository iSectionRepository, ILogger iLogger)
        {
            this.iSectionRepository = iSectionRepository;
            this.iLogger = iLogger;
        }
        public Section Load(string id)
        {
            return iSectionRepository.Load(id);
        }

        public void Save(Section activity)
        {
            iLogger.LogMessage("插入Section数据，ID：" + activity.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSectionRepository.SaveOrUpdate(activity);
        }

        public void Update(Section activity)
        {
            iLogger.LogMessage("更新Section数据，ID：" + activity.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSectionRepository.SaveOrUpdate(activity);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除Section数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSectionRepository.Delete(id);
        }
       
        public IList<Section> Search(List<DataFilter> termList)
        {
            return iSectionRepository.Search(termList);
        }
        public Section SearchByName(string name) 
        {
            return iSectionRepository.SearchByName(name);
        }
        public IList<Section> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iSectionRepository.Search(termList, start, limit, out total);
        }
        public IList<Section> GetAll()
        {
            return iSectionRepository.GetAll();
        }

    }
}

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
    public class DataResourceService:IDataResourceService
    {
        private IDataResourceRepository iDataResourceRepository;
        private ILogger iLogger;
        public DataResourceService(IDataResourceRepository iDataResourceRepository, ILogger iLogger)
        {
            this.iDataResourceRepository = iDataResourceRepository;
            this.iLogger = iLogger;
        }
        public DataResource Load(string id)
        {
            return iDataResourceRepository.Load(id);
        }

        public void Save(DataResource activity)
        {
            iLogger.LogMessage("插入DataResource数据，ID：" + activity.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iDataResourceRepository.SaveOrUpdate(activity);
        }

        public void Update(DataResource activity)
        {
            iLogger.LogMessage("更新DataResource数据，ID：" + activity.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iDataResourceRepository.SaveOrUpdate(activity);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除DataResource数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iDataResourceRepository.Delete(id);
        }
       
        public IList<DataResource> Search(List<DataFilter> termList)
        {
            return iDataResourceRepository.Search(termList);
        }
        public DataResource SearchByName(string name) 
        {
            return iDataResourceRepository.SearchByName(name);
        }
        public DataResource SearchBySectionName(string sectionName)
        {
            return iDataResourceRepository.SearchBySectionName(sectionName);
        }
        public DataResource SearchBySectionCode(string sectionCode)
        {
            return iDataResourceRepository.SearchBySectionCode(sectionCode);
        }
        public IList<DataResource> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iDataResourceRepository.Search(termList, start, limit, out total);
        }
        public IList<DataResource> GetAll()
        {
            return iDataResourceRepository.GetAll();
        }

    }
}

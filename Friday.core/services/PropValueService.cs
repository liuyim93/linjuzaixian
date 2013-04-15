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
    public class PropValueService : IPropValueService
    {

         private IPropValueRepository iPropValueRepository;
        private ILogger iLogger;
        public PropValueService(IPropValueRepository iPropValueRepository, ILogger iLogger)
        {
            this.iPropValueRepository = iPropValueRepository;
            this.iLogger = iLogger;
        }
        public PropValue Load(string id)
        {
            return iPropValueRepository.Load(id);
        }
        public void Save(PropValue propValue)
        {
            iLogger.LogMessage("插入PropValue数据，ID：" + propValue.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iPropValueRepository.SaveOrUpdate(propValue);
        }
        public void Update(PropValue propValue)
        {
            iLogger.LogMessage("更新PropValue数据，ID：" + propValue.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iPropValueRepository.SaveOrUpdate(propValue);
        }

        public void Delete(int id)
        {
            iLogger.LogMessage("删除PropValue数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iPropValueRepository.Delete(id);
        }

        public IList<PropValue> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iPropValueRepository.Search(termList, start, limit, out total);
        }

        public PropValue getPropValuebyIntID(string id)
        {
            return iPropValueRepository.getPropValuebyIntID(id);
        }

        public bool IsHaveTheSameName(string name)
        {
            return iPropValueRepository.IsHaveTheSameName(name);
        }

        public IList<PropValue> getPropValuebyPropID(string propID)
        {
            return iPropValueRepository.getPropValuebyPropID(propID);
        }


    }
}

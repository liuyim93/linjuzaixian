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
    public class PropIDService : IPropIDService
    {

         private IPropIDRepository iPropIDRepository;
        private ILogger iLogger;
        public PropIDService(IPropIDRepository iPropIDRepository, ILogger iLogger)
        {
            this.iPropIDRepository = iPropIDRepository;
            this.iLogger = iLogger;
        }
        public PropID Load(int id)
        {
            return iPropIDRepository.Load(id);
        }
        public void Save(PropID propID)
        {
            iLogger.LogMessage("插入PropID数据，ID：" + propID.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iPropIDRepository.SaveOrUpdate(propID);
        }
        public void Update(PropID propID)
        {
            iLogger.LogMessage("更新PropID数据，ID：" + propID.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iPropIDRepository.SaveOrUpdate(propID);
        }

        public void Delete(int id)
        {
            iLogger.LogMessage("删除PropID数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iPropIDRepository.Delete(id);
        }
        public IList<PropID> GetAll()
        {
            return iPropIDRepository.GetAll();
        }
        public IList<PropID> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iPropIDRepository.Search(termList, start, limit, out total);
        }

        public bool IsHaveTheSameName(string name)
        {
            return iPropIDRepository.IsHaveTheSameName(name);
        }
        public PropID getPropIDbyPropIDName(string name)
        {
            return iPropIDRepository.getPropIDbyPropIDName(name);
        }
        public IList<PropID> GetPropIDByMerchantID(string mid)
        {
            return iPropIDRepository.GetPropIDByMerchantID(mid);
        }

    }
}

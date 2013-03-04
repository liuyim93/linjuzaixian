using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.utils;
using friday.core.repositories;
using friday.core.components;

namespace friday.core.services
{
    public class RentService:IRentService
    {
        private IRentRepository iRentRepository;
        private ILogger iLogger;
        public RentService(IRentRepository iRentRepository, ILogger iLogger)
        {
            this.iRentRepository = iRentRepository;
            this.iLogger = iLogger;
        }
        public Rent Load(string id)
        {
            return iRentRepository.Load(id);
        }

        public void Save(Rent rent)
        {
            iLogger.LogMessage("插入Rent数据，ID：" + rent.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iRentRepository.SaveOrUpdate(rent);
        }

        public void Update(Rent rent)
        {
            iLogger.LogMessage("更新Rent数据，ID：" + rent.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iRentRepository.SaveOrUpdate(rent);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除Rent数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iRentRepository.Delete(id);
        }

        public Rent SearchByShortName(string name)
        {
            return iRentRepository.SearchByShortName(name);
        }

        public IList<Rent> Search(List<DataFilter> termList)
        {
            return iRentRepository.Search(termList);
        }

        public IList<Rent> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iRentRepository.Search(termList, start, limit, out total);
        }
    }
}

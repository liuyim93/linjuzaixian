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
    public class AddressService:IAddressService
    {
        private IAddressRepository iAddressRepository;
        private ILogger iLogger;
        public AddressService(IAddressRepository iAddressRepository, ILogger iLogger)
        {
            this.iAddressRepository = iAddressRepository;
            this.iLogger = iLogger;
        }
        public Address Load(string id)
        {
            return iAddressRepository.Load(id);
        }

        public void Save(Address address)
        {
            iLogger.LogMessage("插入Address数据，ID：" + address.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iAddressRepository.SaveOrUpdate(address);
        }

        public void Update(Address address)
        {
            iLogger.LogMessage("更新Address数据，ID：" + address.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iAddressRepository.SaveOrUpdate(address);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除Address数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iAddressRepository.Delete(id);
        }
       
        public IList<Address> Search(List<DataFilter> termList)
        {
            return iAddressRepository.Search(termList);
        }
        public IList<Address> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iAddressRepository.Search(termList, start, limit, out total);
        }

    }
}

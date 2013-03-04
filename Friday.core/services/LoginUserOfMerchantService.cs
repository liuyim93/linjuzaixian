using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.utils;
using friday.core.repositories;
using friday.core.components;

namespace friday.core.services
{
    public class LoginUserOfMerchantService:ILoginUserOfMerchantService
    {
        private ILoginUserOfMerchantRepository iLoginUserOfMerchantRepository;
        private ILogger iLogger;
        public LoginUserOfMerchantService(ILoginUserOfMerchantRepository iLoginUserOfMerchantRepository, ILogger iLogger)
        {
            this.iLoginUserOfMerchantRepository = iLoginUserOfMerchantRepository;
            this.iLogger = iLogger;
        }
        public LoginUserOfMerchant Load(string id)
        {
            return iLoginUserOfMerchantRepository.Load(id);
        }

        public void Save(LoginUserOfMerchant restaurant)
        {
            iLogger.LogMessage("插入LoginUserOfMerchant数据，ID：" + restaurant.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iLoginUserOfMerchantRepository.SaveOrUpdate(restaurant);
        }

        public void Update(LoginUserOfMerchant restaurant)
        {
            iLogger.LogMessage("更新LoginUserOfMerchant数据，ID：" + restaurant.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iLoginUserOfMerchantRepository.SaveOrUpdate(restaurant);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除LoginUserOfMerchant数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iLoginUserOfMerchantRepository.Delete(id);
        }

        public LoginUserOfMerchant SearchByShortName(string name)
        {
            return iLoginUserOfMerchantRepository.SearchByShortName(name);
        }

        public IList<LoginUserOfMerchant> Search(List<DataFilter> termList)
        {
            return iLoginUserOfMerchantRepository.Search(termList);
        }

        public IList<LoginUserOfMerchant> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iLoginUserOfMerchantRepository.Search(termList, start, limit, out total);
        }
    }
}

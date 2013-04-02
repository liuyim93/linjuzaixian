using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.utils;
using friday.core.repositories;
using friday.core.components;
using friday.core.EnumType;

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

        public void Save(LoginUserOfMerchant loginUserOfMerchant)
        {
            iLogger.LogMessage("插入LoginUserOfMerchant数据，ID：" + loginUserOfMerchant.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iLoginUserOfMerchantRepository.SaveOrUpdate(loginUserOfMerchant);
        }

        public void Update(LoginUserOfMerchant loginUserOfMerchant)
        {
            iLogger.LogMessage("更新LoginUserOfMerchant数据，ID：" + loginUserOfMerchant.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iLoginUserOfMerchantRepository.SaveOrUpdate(loginUserOfMerchant);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除LoginUserOfMerchant数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iLoginUserOfMerchantRepository.Delete(id);
        }

        //public LoginUser GetMerchantLoginUserBy(string MerchantId, UserTypeEnum ust)
        //{
        //    return iLoginUserOfMerchantRepository.GetMerchantLoginUserBy(MerchantId,ust);
        //}

        //public String[] GetLoginUserOfMerchantBy(string loginusername)
        //{
        //    return iLoginUserOfMerchantRepository.GetLoginUserOfMerchantBy(loginusername);
        //}
            
    }
}

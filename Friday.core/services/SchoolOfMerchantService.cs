﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.utils;
using friday.core.repositories;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public class SchoolOfMerchantService:ISchoolOfMerchantService
    {
        private ISchoolOfMerchantRepository iSchoolOfMerchantRepository;
        private ILogger iLogger;
        public SchoolOfMerchantService(ISchoolOfMerchantRepository iSchoolOfMerchantRepository, ILogger iLogger)
        {
            this.iSchoolOfMerchantRepository = iSchoolOfMerchantRepository;
            this.iLogger = iLogger;
        }
        public SchoolOfMerchant Load(string id)
        {
            return iSchoolOfMerchantRepository.Load(id);
        }

        public void Save(SchoolOfMerchant restaurant)
        {
            iLogger.LogMessage("插入SchoolOfMerchant数据，ID：" + restaurant.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSchoolOfMerchantRepository.SaveOrUpdate(restaurant);
        }

        public void Update(SchoolOfMerchant restaurant)
        {
            iLogger.LogMessage("更新SchoolOfMerchant数据，ID：" + restaurant.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSchoolOfMerchantRepository.SaveOrUpdate(restaurant);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除SchoolOfMerchant数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSchoolOfMerchantRepository.Delete(id);
        }

        public string GetSchoolNamesByMerchantID(string mid)
        {
            return iSchoolOfMerchantRepository.GetSchoolNamesByMerchantID(mid);
        }

        public void DeleteSchoolOfMerchantByMerchantID(string MID)
        {
            iSchoolOfMerchantRepository.DeleteSchoolOfMerchantByMerchantID(MID);
        }
     
    }
}

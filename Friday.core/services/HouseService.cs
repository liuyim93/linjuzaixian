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
    public class HouseService:IHouseService
    {
        private IHouseRepository iHouseRepository;
        private ILogger iLogger;
        public HouseService(IHouseRepository iHouseRepository, ILogger iLogger)
        {
            this.iHouseRepository = iHouseRepository;
            this.iLogger = iLogger;
        }
        public House Load(string id)
        {
            return iHouseRepository.Load(id);
        }

        public void Save(House house)
        {
            iLogger.LogMessage("插入House数据，ID：" + house.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iHouseRepository.SaveOrUpdate(house);
        }

        public void Update(House house)
        {
            iLogger.LogMessage("更新House数据，ID：" + house.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iHouseRepository.SaveOrUpdate(house);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除House数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iHouseRepository.Delete(id);
        }

        public IList<House> Search(List<DataFilter> termList)
        {
            return iHouseRepository.Search(termList);
        }

        public IList<House> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iHouseRepository.Search(termList, start, limit, out total);
        }
        public IList<House> Search(List<DataFilter> termList, List<Rent> rentList, int start, int limit) 
        {
            return iHouseRepository.Search(termList, rentList, start, limit);
        }
    }
}
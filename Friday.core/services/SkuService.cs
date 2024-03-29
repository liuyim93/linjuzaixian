﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.repositories;
using friday.core.utils;
using friday.core.domain;

namespace friday.core.services
{
    public class SkuService:ISkuService
    {
        private ISkuRepository iSkuRepository;
        private ISkuPropRepository iSkuPropRepository;
        private ILogger iLogger;

        public SkuService(ISkuRepository iSkuRepository, ILogger iLogger, ISkuPropRepository iSkuPropRepository)
        {
            this.iSkuPropRepository = iSkuPropRepository;
            this.iSkuRepository = iSkuRepository;
            this.iLogger = iLogger;
        }

        public IList<Sku> GetSkusByCommodityID(string commodityID, int start, int limit, out long total)
        {
            return iSkuRepository.GetSkusByCommodityID(commodityID, start, limit, out total);
        }
        public IList<Sku> GetSkusByCommodityID(string commodityID)
        {
            return iSkuRepository.GetSkusByCommodityID(commodityID);
        }
        public Sku GetMinPriceSkusByCommodityID(string commodityID) 
        {
            return iSkuRepository.GetMinPriceSkusByCommodityID(commodityID);
        }

        public Sku Load(string id)
        {
            return iSkuRepository.Load(id);
        }

        public void Save(Sku sku)
        {
            iLogger.LogMessage("插入Sku数据，ID：" + sku.skuId, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSkuRepository.SaveOrUpdate(sku);
        }

        public void Update(Sku sku)
        {
            iLogger.LogMessage("更新Sku数据，ID：" + sku.skuId, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSkuRepository.SaveOrUpdate(sku);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除Sku数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSkuRepository.Delete(id);
        }

        public Sku getSkubyIntID(string id)
        {
            return iSkuRepository.getSkubyIntID(id);
        }

        public void deleteSkubyID(string id)
        {
            iSkuRepository.deleteSkubyID(id);
        }

        public IList<Sku> GetSkusByCommodityOrderByID(Commodity commodity)
        {
            return iSkuRepository.GetSkusByCommodityOrderByID(commodity);
        }


        public string GetProString(Sku sku)
        {
            IList<SkuProp> skuProps = iSkuPropRepository.GetSkuProOrderByID(sku);
            string comma = ";";
            string propStr = comma;
            for (var i = 0; i < skuProps.Count; i++)
            {
                var prop = skuProps.ElementAt(i);
                propStr += prop.PropID.Id.ToString() + ":" + prop.PropValue.Id.ToString();
                if (i < skuProps.Count)
                {
                    propStr += comma;
                }
            }
            return propStr;
        }
    }
}

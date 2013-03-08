using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.utils;
using friday.core.repositories;
using friday.core.components;
using System.Text.RegularExpressions;
using NHibernate;
using NHibernate.Criterion;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.EnumType;
using Iesi.Collections.Generic;
using Friday.core.Models;

namespace friday.core.services
{
    public class MerchantService:IMerchantService
    {
        private IMerchantRepository iMerchantRepository;
        private ILogger iLogger;
        public MerchantService(IMerchantRepository iMerchantRepository, ILogger iLogger)
        {
            this.iMerchantRepository = iMerchantRepository;
            this.iLogger = iLogger;
        }

        public string GetMerchantsJson()
        {
            IList<MerchantModel> bBrandModels = new List<MerchantModel>();
            IList<MerchantModel> sBrandModels = new List<MerchantModel>();
            IList<Merchant> Merchants = GetAll();
            Merchant Merchant;
            int index;

            Random rand = new Random();

            //Logo
            for (int i = 0; i < 6; i++)
            {
                index = rand.Next(Merchants.Count);
                Merchant = Merchants.ElementAt(index);
                MerchantModel a = new MerchantModel();
                a.logoPicType = "logo";
                a.logo = Merchant.Logo;
                a.source = "sBrands";
                a.isCol = "False";
                a.brandId = Merchant.Id;
                a.brandName = Merchant.Name;
                a.brandDesc = Merchant.Description;
                sBrandModels.Add(a);
                Merchants.RemoveAt(index);
            }

            //sBrand 
            for (int i = 0; i < 3; i++)
            {
                index = rand.Next(Merchants.Count);
                Merchant = Merchants.ElementAt(index);
                MerchantModel a = new MerchantModel();
                a.logoPicType = "logo";
                a.logo = Merchant.sBrand;
                a.source = "sBrands";
                a.isCol = "False";
                a.brandId = Merchant.Id;
                a.brandName = Merchant.Name;
                a.brandDesc = Merchant.Description;
                sBrandModels.Add(a);
                Merchants.RemoveAt(index);
            }

            //bBrand
            for (int i = 0; i < 3; i++)
            {
                index = rand.Next(Merchants.Count);
                Merchant = Merchants.ElementAt(index);
                MerchantModel a = new MerchantModel();
                a.logoPicType = "bBrand";
                a.logo = Merchant.bBrand;
                a.source = "bBrands";
                a.isCol = "False";
                a.brandId = Merchant.Id;
                a.brandName = Merchant.Name;
                a.brandDesc = Merchant.Description;
                bBrandModels.Add(a);
                Merchants.RemoveAt(index);
            }

            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = new { 
              sBrands=sBrandModels,
              bBrands=bBrandModels
            };
            return jsonResult.FormatResult();
        }

        public Merchant Load(string id)
        {
            return iMerchantRepository.Load(id);
        }

        public void Save(Merchant merchant)
        {
            iLogger.LogMessage("插入Merchant数据，ID：" + merchant.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMerchantRepository.SaveOrUpdate(merchant);
        }

        public void Update(Merchant merchant)
        {
            iLogger.LogMessage("更新Merchant数据，ID：" + merchant.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMerchantRepository.SaveOrUpdate(merchant);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除Merchant数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMerchantRepository.Delete(id);
        }

        public IList<Merchant> Search(List<DataFilter> termList)
        {
            return iMerchantRepository.Search(termList);
        }

        public IList<Merchant> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iMerchantRepository.Search(termList, start, limit, out total);
        }
        public IList<Merchant> GetAll()
        {
            return iMerchantRepository.GetAll();
        }
    }
}

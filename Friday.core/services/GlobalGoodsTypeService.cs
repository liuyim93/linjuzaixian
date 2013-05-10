using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.repositories;
using friday.core.utils;
using friday.core.domain;

namespace friday.core.services
{
    public class GlobalGoodsTypeService : IGlobalGoodsTypeService
    {
        private IGlobalGoodsTypeRepository iGlobalGoodsTypeRepository;
        private ILogger iLogger;
        public GlobalGoodsTypeService(IGlobalGoodsTypeRepository iGlobalGoodsTypeRepository, ILogger iLogger)
        {
            this.iGlobalGoodsTypeRepository = iGlobalGoodsTypeRepository;
            this.iLogger = iLogger;
        }
        public GlobalGoodsType Load(string id)
        {
            return iGlobalGoodsTypeRepository.Load(id);
        }

        public void Save(GlobalGoodsType globalGoodsType)
        {
            iLogger.LogMessage("插入GlobalGoodsType数据，ID：" + globalGoodsType.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iGlobalGoodsTypeRepository.SaveOrUpdate(globalGoodsType);
        }

        public void Update(GlobalGoodsType globalGoodsType)
        {
            iLogger.LogMessage("更新GlobalGoodsType数据，ID：" + globalGoodsType.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iGlobalGoodsTypeRepository.SaveOrUpdate(globalGoodsType);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除GlobalGoodsType数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iGlobalGoodsTypeRepository.Delete(id);
        }


        public IList<GlobalGoodsType> Search(List<DataFilter> termList)
        {
            return iGlobalGoodsTypeRepository.Search(termList);
        }

        public IList<GlobalGoodsType> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iGlobalGoodsTypeRepository.Search(termList, start, limit, out total);
        }
        public IList<GlobalGoodsType> GetAll()
        {
            return iGlobalGoodsTypeRepository.GetAll();
        }

        public IList<GlobalGoodsType> GetChildrenFromParentID(string ParentID)
        {
            return iGlobalGoodsTypeRepository.GetChildrenFromParentID(ParentID);
        }

        public IList<GlobalGoodsType> GetChildrenByFamily(string ParentID)
        {
            return iGlobalGoodsTypeRepository.GetChildrenByFamily(ParentID);
        }

        public bool IsHaveChild(GlobalGoodsType GlobalGoodsType)
        {
            return iGlobalGoodsTypeRepository.IsHaveChild(GlobalGoodsType);
        }
        public GlobalGoodsType GetGlobalGoodsTypeByName(string Name) 
        {
            return iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByName(Name);
        }
        public IList<GlobalGoodsType> GetSimilarGoodsTypeListInThirdLevelByKeyword(string keyword)
        {
            return iGlobalGoodsTypeRepository.GetSimilarGoodsTypeListInThirdLevelByKeyword(keyword);
        }
        public IList<GlobalGoodsType> GetFirstLevelAll()
        {
            return iGlobalGoodsTypeRepository.GetFirstLevelAll();
        }
    }
}

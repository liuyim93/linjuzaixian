using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.repositories;
using friday.core.utils;
using friday.core.domain;
using friday.core.components;

namespace friday.core.services
{
    public class MyFavoriteService : IMyFavoriteService
    {
        private IMyFavoriteRepository iMyFavoriteRepository;
        private ILogger iLogger;
        public MyFavoriteService(IMyFavoriteRepository iMyFavoriteRepository, ILogger iLogger)
        {
            this.iMyFavoriteRepository = iMyFavoriteRepository;
            this.iLogger = iLogger;
        }
        public MyFavorite Load(string id)
        {
            return iMyFavoriteRepository.Load(id);
        }

        public void Save(MyFavorite myFavorite)
        {
            iLogger.LogMessage("插入MyFavorite数据，ID：" + myFavorite.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMyFavoriteRepository.SaveOrUpdate(myFavorite);
        }

        public void Update(MyFavorite myFavorite)
        {
            iLogger.LogMessage("更新MyFavorite数据，ID：" + myFavorite.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMyFavoriteRepository.SaveOrUpdate(myFavorite);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除MyFavorite数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMyFavoriteRepository.Delete(id);
        }

        public IList<MyFavorite> Search(List<DataFilter> termList)
        {
            return iMyFavoriteRepository.Search(termList);
        }

        public IList<MyFavorite> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iMyFavoriteRepository.Search(termList, start, limit, out total);
        }
    }
}

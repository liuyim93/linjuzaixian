using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.repositories;
using friday.core.utils;

namespace friday.core.services
{
    public class SystemMenuService : ISystemMenuService
    {
        private ISystemMenuRepository iSystemMenuRepository;
        private ILogger iLogger;
        public SystemMenuService(ISystemMenuRepository iSystemMenuRepository, ILogger iLogger)
        {
            this.iSystemMenuRepository = iSystemMenuRepository;
            this.iLogger = iLogger;
        }
        public SystemMenu Load(string id)
        {
            return iSystemMenuRepository.Load(id);
        }

        public void Save(SystemMenu systemMenu)
        {
            iLogger.LogMessage("插入SystemMenu数据，ID：" + systemMenu.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSystemMenuRepository.SaveOrUpdate(systemMenu);
        }

        public void Update(SystemMenu systemMenu)
        {
            iLogger.LogMessage("更新SystemMenu数据，ID：" + systemMenu.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSystemMenuRepository.SaveOrUpdate(systemMenu);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除SystemMenu数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSystemMenuRepository.Delete(id);
        }

        public IList<SystemMenu> GetChildrenFromParentID(string ParentID)
        {
            return iSystemMenuRepository.GetChildrenFromParentID(ParentID);
        }

        public bool IsHaveChild(SystemMenu systemMenu)
        {
            return iSystemMenuRepository.IsHaveChild(systemMenu);
        }

        public IList<SystemMenu> GetMenuByUserIDAndParentID(string userid, string parentid)
        {
            return iSystemMenuRepository.GetMenuByUserIDAndParentID(userid, parentid);
        }
    }
}

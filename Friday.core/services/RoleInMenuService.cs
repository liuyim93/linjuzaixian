using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.repositories;
using friday.core.utils;

namespace friday.core.services
{
    public class RoleInMenuService : IRoleInMenuService
    {
        private IRoleInMenuRepository iRoleInMenuRepository;
        private ILogger iLogger;
        public RoleInMenuService(IRoleInMenuRepository iRoleInMenuRepository, ILogger iLogger)
        {
            this.iRoleInMenuRepository = iRoleInMenuRepository;
            this.iLogger = iLogger;
        }
        public RoleInMenu Load(string id)
        {
            return iRoleInMenuRepository.Load(id);
        }

        public void Save(RoleInMenu roleInMenu)
        {
            iLogger.LogMessage("插入RoleInMenu数据，ID：" + roleInMenu.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iRoleInMenuRepository.SaveOrUpdate(roleInMenu);
        }

        public void Update(RoleInMenu roleInMenu)
        {
            iLogger.LogMessage("更新RoleInMenu数据，ID：" + roleInMenu.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iRoleInMenuRepository.SaveOrUpdate(roleInMenu);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除RoleInMenu数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iRoleInMenuRepository.Delete(id);
        }

        public bool GetRoleInMenuByMenuIDandRoleID(string menuid, string roleid)
        {
            return iRoleInMenuRepository.GetRoleInMenuByMenuIDandRoleID(menuid, roleid);
        }

        public IList<RoleInMenu> GetSystemMenuPListByRoleID(string RoleID)
        {
            return iRoleInMenuRepository.GetSystemMenuPListByRoleID(RoleID);
        }

    }
}

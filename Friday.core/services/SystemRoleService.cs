using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.repositories;
using friday.core.utils;
using friday.core.components;

namespace friday.core.services
{
    public class SystemRoleService:ISystemRoleService
    {
        private ISystemRoleRepository iSystemRoleRepository;
        private ILogger iLogger;
        public SystemRoleService(ISystemRoleRepository iSystemRoleRepository, ILogger iLogger)
        {
            this.iSystemRoleRepository = iSystemRoleRepository;
            this.iLogger = iLogger;
        }
        public SystemRole Load(string id)
        {
            return iSystemRoleRepository.Load(id);
        }

        public void Save(SystemRole systemRole)
        {
            iLogger.LogMessage("插入SystemRole数据，ID：" + systemRole.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSystemRoleRepository.SaveOrUpdate(systemRole);
        }

        public void Update(SystemRole systemRole)
        {
            iLogger.LogMessage("更新SystemRole数据，ID：" + systemRole.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSystemRoleRepository.SaveOrUpdate(systemRole);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除SystemRole数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSystemRoleRepository.Delete(id);
        }
       
        public IList<SystemRole> Search(List<DataFilter> termList)
        {
            return iSystemRoleRepository.Search(termList);
        }
        public SystemRole GetRoleByName(string SystemRoleName)
        {
            return iSystemRoleRepository.GetRoleByName(SystemRoleName);
        }
        public IList<SystemRole> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iSystemRoleRepository.Search(termList, start, limit, out total);
        }

    }
}

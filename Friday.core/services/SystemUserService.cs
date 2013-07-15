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
    public class SystemUserService : ISystemUserService
    {
        private ISystemUserRepository iSystemUserRepository;
        private ILogger iLogger;
        public SystemUserService(ISystemUserRepository iSystemUserRepository, ILogger iLogger)
        {
            this.iSystemUserRepository = iSystemUserRepository;
            this.iLogger = iLogger;
        }
        public SystemUser Load(string id)
        {
            return iSystemUserRepository.Load(id);
        }

        public void Save(SystemUser systemUser)
        {
            iLogger.LogMessage("插入SystemUser数据，ID：" + systemUser.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSystemUserRepository.SaveOrUpdate(systemUser);
        }

        public void Update(SystemUser systemUser)
        {
            iLogger.LogMessage("更新SystemUser数据，ID：" + systemUser.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSystemUserRepository.SaveOrUpdate(systemUser);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除SystemUser数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSystemUserRepository.Delete(id);
        }


        public IList<SystemUser> Search(List<DataFilter> termList)
        {
            return iSystemUserRepository.Search(termList);
        }

        public IList<SystemUser> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iSystemUserRepository.Search(termList, start, limit, out total);
        }
        public bool ValidateTel(string tel)
        {
            return iSystemUserRepository.ValidateTel(tel);
        }

        public void DeleteAnomymous(DateTime startTime, DateTime endTime, bool isAnomymous)
        {
            IList<SystemUser> anomymous = iSystemUserRepository.GetSystemUser(startTime, endTime, isAnomymous);
            iSystemUserRepository.DeleteAll(anomymous);
        }
    }
}

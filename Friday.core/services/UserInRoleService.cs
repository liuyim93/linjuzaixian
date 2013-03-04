using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.utils;
using friday.core.repositories;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public class UserInRoleService:IUserInRoleService
    {
        private IUserInRoleRepository iUserInRoleRepository;
        private ILogger iLogger;
        public UserInRoleService(IUserInRoleRepository iUserInRoleRepository, ILogger iLogger)
        {
            this.iUserInRoleRepository = iUserInRoleRepository;
            this.iLogger = iLogger;
        }
        public UserInRole Load(string id)
        {
            return iUserInRoleRepository.Load(id);
        }

        public void Save(UserInRole userInRole)
        {
            iLogger.LogMessage("插入UserInRole数据，ID：" + userInRole.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iUserInRoleRepository.SaveOrUpdate(userInRole);
        }

        public void Update(UserInRole userInRole)
        {
            iLogger.LogMessage("更新UserInRole数据，ID：" + userInRole.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iUserInRoleRepository.SaveOrUpdate(userInRole);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除UserInRole数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iUserInRoleRepository.Delete(id);
        }

        public string[] GetRoleNamesAndIDByLoginUserID(string userID)
        {
            return iUserInRoleRepository.GetRoleNamesAndIDByLoginUserID(userID);
        }

        public void DeleteUserInRoleByLoginUserID(string MID)
        {
            iUserInRoleRepository.DeleteUserInRoleByLoginUserID(MID);
        }
               
    }
}

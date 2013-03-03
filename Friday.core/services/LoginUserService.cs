using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.repositories;
using friday.core.components;

namespace friday.core.services
{
    public class LoginUserService:ILoginUserService
    {
        private ILoginUserRepository iLoginUserRepository;
        private ILogger iLogger;
        public LoginUserService(ILoginUserRepository iLoginUserRepository, ILogger iLogger)
        {
            this.iLoginUserRepository = iLoginUserRepository;
            this.iLogger = iLogger;
        }
        public LoginUser Load(string id)
        {
            return iLoginUserRepository.Load(id);
        }

        public void Save(LoginUser loginUser)
        {
            iLogger.LogMessage("插入LoginUser数据，ID：" + loginUser.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iLoginUserRepository.SaveOrUpdate(loginUser);
        }

        public void Update(LoginUser loginUser)
        {
            iLogger.LogMessage("更新LoginUser数据，ID：" + loginUser.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iLoginUserRepository.SaveOrUpdate(loginUser);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除LoginUser数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iLoginUserRepository.Delete(id);
        }

        public LoginUser GetLoginUserByLoginName(string name)
        {
            return iLoginUserRepository.GetLoginUserByLoginName(name);
        }

        public IList<LoginUser> Search(List<DataFilter> termList)
        {
            return iLoginUserRepository.Search(termList);
        }

        public IList<LoginUser> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iLoginUserRepository.Search(termList, start, limit, out total);
        }
    }
}

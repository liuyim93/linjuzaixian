using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.repositories;
using friday.core.domain;

namespace friday.core.services
{
    public class UserService:IUserService
    {
        ISystemUserRepository systemUserRepository;
        public UserService(ISystemUserRepository systemUserRepository)
        {
            this.systemUserRepository = systemUserRepository;
        }
        public SystemUser getSystemUser(string id)
        {
            return this.systemUserRepository.Get(id);
        }
        public void saveOrUpdateSystemUser(SystemUser user)
        {
            this.systemUserRepository.SaveOrUpdate(user);
        }
    }
}

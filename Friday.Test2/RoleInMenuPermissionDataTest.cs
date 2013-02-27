using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using friday.core.domain;
using friday.core;
using NUnit.Framework;
using friday.core.services;
using friday.core.repositories;

namespace Friday.Test2
{
    [TestClass]
    public class RoleInMenuPermissionDataTest
    {

        private List<SystemUser> systemUserList = new List<SystemUser>();
        private List<SystemMenu> systemMenuList = new List<SystemMenu>();
        private List<SystemRole> systemRoleList = new List<SystemRole>();
        private Random random = new Random();

        private readonly int SYSTEM_ROLE_COUNT = 20;
        private readonly int RANDOM_SYSTEM_ROLE_SEED = 30;

        [SetUp]
        public void init()
        {

            add_Random_SystemRoles();

            ISystemFunctionObjectService iSystemFunctionObjectService = UnityHelper.UnityToT<ISystemFunctionObjectService>();
            iSystemFunctionObjectService.Generate();


        }
        private void add_Random_SystemRoles()
        {
            IRepository<SystemRole> iSystemRoleRepository = UnityHelper.UnityToT<IRepository<SystemRole>>();
            for (int i = 0; i < SYSTEM_ROLE_COUNT; i++)
            {
                SystemRole systemRole = new SystemRole()
                {
                    Name = "role" + get_random_number_with_fixed_width(5)
                };


                iSystemRoleRepository.SaveOrUpdate(systemRole);
            }

        }
        private String get_random_number_with_fixed_width(int width)
        {
            int x = random.Next(Convert.ToInt32(String.Empty.PadRight(width, '9')));
            return x.ToString().PadLeft(width, '0');

        }


    }
}

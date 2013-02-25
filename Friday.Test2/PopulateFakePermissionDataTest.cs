using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using friday.core;
using friday.core.domain;
using NHibernate;
using friday.core.services;
using friday.core.components;
using friday.core.repositories;
using friday.core.EnumType;
namespace Friday.Test2
{

   [TestFixture]
    public class PopulateFakePermissionDataTest
    {
       private List<SystemUser> systemUserList = new List<SystemUser>();
       private List<LoginUser> loginUserList = new List<LoginUser>();
       private List<SystemRole> systemRoleList = new List<SystemRole>();
     
       private readonly int SYSTEM_ROLE_COUNT = 20;
       private readonly int RANDOM_SYSTEM_ROLE_SEED = 30;

       [SetUp]
        public void init()
        {

            add_Random_SystemRoles();
           

           
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
           int x = new Random().Next(Convert.ToInt32(String.Empty.PadRight(width, '9')));
           return x.ToString().PadLeft(width, '0');

       }

    }
}

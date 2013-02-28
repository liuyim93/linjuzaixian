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

        private List<RoleInMenu> roleInMenuList = new List<RoleInMenu>();
        private List<SystemMenu> childMenuList = new List<SystemMenu>();
        private List<SystemRole> systemRoleList = new List<SystemRole>();
        private Random random = new Random();

        private readonly int SYSTEM_ROLE_COUNT = 10;
        private readonly int SYSTEM_MENU_PARENT_COUNT = 5;
        private readonly int SYSTEM_MENU_CHILD_COUNT = 6;
        string[] isCheck = { "true", "false" };
        
        [SetUp]
        public void init()
        {

            add_Random_SystemRoles();
            add_Random_SystemMenus();
            add_Random_RoleInMenus();
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
                systemRoleList.Add(systemRole);
                iSystemRoleRepository.SaveOrUpdate(systemRole);
            }

        }

        private void add_Random_SystemMenus()
        {
            IRepository<SystemMenu> iSystemMenuRepository = UnityHelper.UnityToT<IRepository<SystemMenu>>();
            for (int i = 0; i < SYSTEM_MENU_PARENT_COUNT; i++)
            {
                SystemMenu parentMenu = new SystemMenu()
                {
                    Name = "父菜单" + get_random_number_with_fixed_width(5),
                    Leaf = false, 
                    ParentID = null, 
                };

                int childCount = random.Next(SYSTEM_MENU_CHILD_COUNT);

                for (int c = 0; c < childCount; c++)
                {
                    SystemMenu childsystemMenu = new SystemMenu()
                    {
                        Name = "子菜单" + get_random_number_with_fixed_width(5),
                        Leaf = true,
                        ParentID = parentMenu.Id,
                        MenuRoute = "url_" + get_random_number_with_fixed_width(5)
                    };
                    childMenuList.Add(childsystemMenu);
                    iSystemMenuRepository.SaveOrUpdate(childsystemMenu);
                }

                iSystemMenuRepository.SaveOrUpdate(parentMenu);
            }
        }

        private void add_Random_RoleInMenus()
        {
            IRepository<RoleInMenu> iRoleInMenuRepository = UnityHelper.UnityToT<IRepository<RoleInMenu>>();
            foreach (SystemRole sr in systemRoleList)
            {
                foreach (SystemMenu sm in childMenuList)
                {
                    if (random.Next(10)>5)
                    {
                        RoleInMenu roleInMenu = new RoleInMenu();
                        roleInMenu.Menu = sm;
                        roleInMenu.Role = sr;
                        iRoleInMenuRepository.SaveOrUpdate(roleInMenu);
                    }
                }
            }

        }

        private String get_random_number_with_fixed_width(int width)
        {
            int x = random.Next(Convert.ToInt32(String.Empty.PadRight(width, '9')));
            return x.ToString().PadLeft(width, '0');
        }


    }
}

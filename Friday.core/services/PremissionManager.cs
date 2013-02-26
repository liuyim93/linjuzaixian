using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.repositories;

namespace friday.core.components
{
    public class PermissionManager : friday.core.services.IPermissionManager
    {
        public PermissionManager(IRepository<UserInRole> iUserInRoleRepository, ISystemFunctionObjectRepository iSystemFunctionObjectRepository, ISystemFunctionObjectInRoleRepository iSystemFunctionObjectInRoleRepository)
        {
            this.iUserInRoleRepository = iUserInRoleRepository;
            this.iSystemFunctionObjectInRoleRepository = iSystemFunctionObjectInRoleRepository;
            this.iSystemFunctionObjectRepository = iSystemFunctionObjectRepository;
        }
        public void Check(FunctionTag functionTag, PremissionTag type = PremissionTag.Enable)
        {
            if (HasRight(functionTag, type) == false)
                throw new Exception("您没有权限请联系管理员!");
        }

        public bool HasRight(FunctionTag functionTag, PremissionTag type = PremissionTag.Enable)
        {
            int currentUserId = 0;


            if (functionTag == null)
                return true;

            var functionId = getFunctionObjId(functionTag);
            if (string.IsNullOrEmpty(functionId))
            {
                throw new Exception(string.Format("找不到权限设置:[{0}]", functionTag.TagName));
            }
            var role = from x in RolePermissionList
                       where x.SystemFunctionObject.Id == functionId
                       select x;
            if (role.Count() == 0)
            {
                return false;
            }
            switch (type)
            {
                case PremissionTag.Enable:
                    return (from x in role
                            where x.Enabled
                            && getUserRoles(currentUserId).Contains(x.Role.Id)
                            select x).FirstOrDefault() != null;

                case PremissionTag.Edit:
                    return (from x in role
                            where x.Editable
                            && getUserRoles(currentUserId).Contains(x.Role.Id)
                            select x).FirstOrDefault() != null;
                case PremissionTag.Delete:
                    return (from x in role
                            where x.Deletable
                            && getUserRoles(currentUserId).Contains(x.Role.Id)
                            select x).FirstOrDefault() != null;

            }

            return true;
        }
        private string getFunctionObjId(FunctionTag functionTag)
        {
            var obj = FunctionObjectList.SingleOrDefault(x => x.PermissonTag == functionTag.TagName);
            if (obj != null)
                return obj.Id;
            return null;
        }

        private List<string> getUserRoles(int userId)
        {
            return (from x in UserInRole
                    select x.Role.Id).ToList();
        }

        private List<SystemFunctionObjectInRole> _RolePermissionList = null;
        private List<SystemFunctionObjectInRole> RolePermissionList
        {
            get
            {
                if (_RolePermissionList == null)
                    RefreshRolePermission();
                return _RolePermissionList;
            }
            set { _RolePermissionList = value; }

        }
        private List<SystemFunctionObject> _FunctionObjectList = null;
        private List<SystemFunctionObject> FunctionObjectList
        {
            get
            {
                if (_FunctionObjectList == null)
                {
                    RefreshRolePermission();
                }
                return _FunctionObjectList;
            }
            set { _FunctionObjectList = value; }

        }
        public void RefreshRolePermission()
        {
            _RolePermissionList = iSystemFunctionObjectInRoleRepository.GetAll().ToList();
            _FunctionObjectList = iSystemFunctionObjectRepository.GetAll().ToList();
        }

        private List<UserInRole> _UserInRole = null;
        private List<UserInRole> UserInRole
        {
            get
            {
                if (_UserInRole == null)
                    RefreshRolePermission();
                return _UserInRole;
            }
            set { _UserInRole = value; }

        }
        public void RefreshUserInRole()
        {
            _UserInRole = iUserInRoleRepository.GetAll().ToList();
        }
        private IRepository<UserInRole> iUserInRoleRepository;
        private ISystemFunctionObjectRepository iSystemFunctionObjectRepository;
        private ISystemFunctionObjectInRoleRepository iSystemFunctionObjectInRoleRepository;
    }
}

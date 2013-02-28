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
        public void Check(string tagName, string userId, PermissionTag type = PermissionTag.Enable)
        {
            FunctionTag tag = new FunctionTag()
            {
                TagName = tagName
            };
            Check(tag, userId, type);
        }
        public void Check(FunctionTag functionTag, string userId, PermissionTag type = PermissionTag.Enable)
        {
            if (HasRight(functionTag,userId, type) == false)
                throw new Exception("您没有权限请联系管理员!");
        }
        public bool HasRight(string tagName, string userId, PermissionTag type = PermissionTag.Enable)
        {
            FunctionTag tag = new FunctionTag()
            {
                TagName=tagName
            };
            return HasRight(tag, userId, type);
        }
        public bool HasRight(FunctionTag functionTag, string userId,PermissionTag type = PermissionTag.Enable)
        {
            string currentUserId = userId;


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
                case PermissionTag.Enable:
                    return (from x in role
                            where x.Enabled
                            && getUserRoles(currentUserId).Contains(x.SystemRole.Id)
                            select x).FirstOrDefault() != null;

                case PermissionTag.Edit:
                    return (from x in role
                            where x.Editable
                            && getUserRoles(currentUserId).Contains(x.SystemRole.Id)
                            select x).FirstOrDefault() != null;
                case PermissionTag.Delete:
                    return (from x in role
                            where x.Deletable
                            && getUserRoles(currentUserId).Contains(x.SystemRole.Id)
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

        private List<string> getUserRoles(string userId)
        {
            return (from x in UserInRole
                    where x.LoginUser.Id==userId
                    select x.SystemRole.Id ).ToList();
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
                    RefreshUserInRole();
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

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.components
{
    public class PermissionManager
    {

        //public static void Check( FunctionTag functionTag, PremissionTag type = PremissionTag.Enable )
        //{
        //    if( HasRight( functionTag, type ) == false )
        //        throw new Exception( "您没有权限请联系管理员!" );
        //}

        //public static bool HasRight( FunctionTag functionTag, PremissionTag type = PremissionTag.Enable )
        //{
        //    int currentUserId = 0;


        //    if( functionTag == null )
        //        return true;
            
        //    var functionId = getFunctionObjId( functionTag );
        //    if( ( functionId ?? 0 ) == 0 )
        //    {
        //        throw new Exception( string.Format( "找不到权限设置:[{0}]", functionTag.TagName ) );
        //    }
        //    var role = from x in RolePermissionList
        //               where x.FunctionObjectId == functionId
        //               select x;
        //    if( role.Count() == 0 )
        //    {
        //        return false;
        //    }
        //    switch( type )
        //    {
        //        case PremissionTag.Enable:
        //            return ( from x in role
        //                     where x.Enable
        //                     && getUserRoles( currentUserId ).Contains( x.System_RoleId.Value )
        //                     select x ).FirstOrDefault() != null;

        //        case PremissionTag.Edit:
        //            return ( from x in role
        //                     where x.Editable
        //                     && getUserRoles( currentUserId ).Contains( x.System_RoleId.Value )
        //                     select x ).FirstOrDefault() != null;
        //        case PremissionTag.Delete:
        //            return ( from x in role
        //                     where x.Deleteable
        //                     && getUserRoles( currentUserId ).Contains( x.System_RoleId.Value )
        //                     select x ).FirstOrDefault() != null;

        //    }

        //    return true;
        //}
        //private static int? getFunctionObjId( FunctionTag functionTag )
        //{
        //    var obj = FunctionObjectList.SingleOrDefault( x => x.PermissonTag == functionTag.TagName );
        //    if( obj != null )
        //        return obj.ID;
        //    return null;
        //}

        //private static List<int> getUserRoles( int userId )
        //{
        //    return ( from x in UserInRole
        //             select x.System_RoleId ).ToList();
        //}

        //private static List<System_RolePermission> _RolePermissionList = null;
        //private static List<System_RolePermission> RolePermissionList
        //{
        //    get
        //    {
        //        if (_RolePermissionList == null)
        //            RefreshRolePermission();
        //        return _RolePermissionList;
        //    }
        //    set { _RolePermissionList = value; }

        //}
        //private static List<System_FunctionObject> _FunctionObjectList = null;
        //private static List<System_FunctionObject> FunctionObjectList
        //{
        //    get
        //    {
        //        if (_FunctionObjectList == null)
        //        {
        //            RefreshRolePermission();
        //        }
        //        return _FunctionObjectList;
        //    }
        //    set { _FunctionObjectList = value; }

        //}
        //public static void RefreshRolePermission()
        //{
        //    _RolePermissionList = System_RolePermission.List().ToList();
        //    _FunctionObjectList = System_FunctionObject.List().ToList();
        //}

        //private static List<System_UserInRole> _UserInRole = null;
        //private static List<System_UserInRole> UserInRole
        //{
        //    get
        //    {
        //        if (_UserInRole == null)
        //            RefreshRolePermission();
        //        return _UserInRole;
        //    }
        //    set { _UserInRole = value; }

        //}
        //public static void RefreshUserInRole()
        //{
        //    _UserInRole = System_UserInRole.List().ToList();
        //}
    }
}

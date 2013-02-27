using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.repositories
{
    public interface ISystemMenuRepository : ITreeNodeRepository<SystemMenu>
    {
        IList<SystemMenu> GetChildrenFromParentID(string ParentID);
        bool IsHaveChild(SystemMenu systemMenu);
        SystemMenu GetSystemMenuByMenuID(string MenuID);
        string GetCodeByParentCode(string ParentID);
        IList<SystemMenu> GetMenuByUserIDAndParentID(string userID,string parentID);
        IList<SystemMenu> GetMenuByUserIDandCompanyID(string userID, string companyID);
        string GetIDByTreeCode(string TreeCode);
        string GetColIndexByParentCode(string ParentID);
    }
}

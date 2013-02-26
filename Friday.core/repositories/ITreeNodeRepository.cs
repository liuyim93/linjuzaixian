using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.UI.WebControls;

namespace friday.core.repositories
{
    public interface ITreeNodeRepository<T> : IRepository<T> where T : friday.core.TreeNode
    {
        bool IsHaveChild(T model);
        IList<T> GetChildrenFromParentID(string ParentID);
        T GetModelByTreeCode(string TreeCode);

    }
}

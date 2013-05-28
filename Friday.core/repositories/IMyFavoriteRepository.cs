using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.repositories
{
    public interface IMyFavoriteRepository : IRepository<MyFavorite>
    {
        IList<MyFavorite> GetMyFavoriteBySystemUser(SystemUser systemUser, string _selectIP);
        IList<MyFavorite> GetMyFavoriteBySystemUser(SystemUser systemUser, int start, int limit, out int total);
        MyFavorite GetMyFavoriteBySystemUserAndMerchant(SystemUser systemUser, string merchantID);
        IList<MyFavorite> GetMyFavoriteBySystemUser(SystemUser systemUser);
        System.Collections.Generic.IList<MyFavorite> Search(System.Collections.Generic.List<DataFilter> termList);
        System.Collections.Generic.IList<MyFavorite> Search(System.Collections.Generic.List<DataFilter> termList, System.Collections.Generic.List<SystemUser> systemUserList, int start, int limit);
        System.Collections.Generic.IList<MyFavorite> Search(System.Collections.Generic.List<DataFilter> termList, int start, int limit, out long total);
    }
}

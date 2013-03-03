using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.services
{
    public interface IMyFavoriteService
    {
        MyFavorite Load(string id);
        void Save(MyFavorite myFavorite);
        void Update(MyFavorite myFavorite);
        void Delete(string id);
        IList<MyFavorite> Search(List<DataFilter> termList);
        IList<MyFavorite> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}

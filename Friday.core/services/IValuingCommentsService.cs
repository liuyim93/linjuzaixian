using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.services
{
    public interface IValuingCommentsService
    {
        ValuingComments Load(string id);
        int GetValuingCommentsCount(string valuingID);
        void Save(ValuingComments valuingComments);
        void Update(ValuingComments valuingComments);
        void Delete(string id);
        IList<ValuingComments> Search(List<DataFilter> termList);
        IList<ValuingComments> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}

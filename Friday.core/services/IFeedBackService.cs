using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.services
{
    public interface IFeedBackService
    {
        FeedBack Load(string id);
        void Save(FeedBack feedBack);
        void Update(FeedBack feedBack);
        void Delete(string id);
        IList<FeedBack> Search(List<DataFilter> termList);
        IList<FeedBack> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}

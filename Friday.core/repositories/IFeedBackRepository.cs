using System;
using friday.core.domain;
using friday.core.components;
namespace friday.core.repositories
{
    public interface IFeedBackRepository:IRepository<FeedBack>
    {
        FeedBack GetFeedBackByParentFeedBack(string id);
        System.Collections.Generic.IList<FeedBack> Search(System.Collections.Generic.List<DataFilter> termList);
        
        System.Collections.Generic.IList<FeedBack> Search(System.Collections.Generic.List<DataFilter> termList, int start, int limit, out long total);
    }
}

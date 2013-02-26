using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.services
{
    public interface IFeedBackService
    {
        void Save(FeedBack feedback);
        void Update(FeedBack feedback);
        void Delete(FeedBack feedback);

    }
}

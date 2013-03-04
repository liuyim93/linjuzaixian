using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface IActivityService
    {
        Activity Load(string id);
        void Save(Activity activity);
        void Update(Activity activity);
        void Delete(string id);
        Activity SearchByShortName(string name);
        IList<Activity> Search(List<DataFilter> termList);
        IList<Activity> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}

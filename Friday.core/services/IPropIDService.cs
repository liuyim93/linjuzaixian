using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface IPropIDService
    {
        PropID Load(int id);
        void Save(PropID propID);
        void Update(PropID propID);
        void Delete(int id);
        IList<PropID> GetAll();
        IList<PropID> Search(List<DataFilter> termList, int start, int limit, out long total);
        bool IsHaveTheSameName(string name);
        IList<PropID> GetPropIDByMerchantID(string mid);
        PropID getPropIDbyMerchantAndPropIDName(string mchtId, string name);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface IMerchantService
    {
        string GetMerchantsJson(SystemUser systemUser, string _selectIP);
        string GetMerchantsJson(SystemUser systemUser);
        Merchant Load(string id);
        void Save(Merchant merchant);
        void Update(Merchant merchant);
        void Delete(string id);
        IList<Merchant> GetAll();
        IList<Merchant> Search(List<DataFilter> termList);
        IList<Merchant> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}

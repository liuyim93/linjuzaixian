using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.repositories
{
    public interface IAddressRepository:IRepository<Address>
    {
        System.Collections.Generic.IList<Address> Search(System.Collections.Generic.List<DataFilter> termList);
        System.Collections.Generic.IList<Address> Search(System.Collections.Generic.List<DataFilter> termList, System.Collections.Generic.List<SystemUser> systemUserList, int start, int limit);
        System.Collections.Generic.IList<Address> Search(System.Collections.Generic.List<DataFilter> termList, int start, int limit, out long total);
    }
}

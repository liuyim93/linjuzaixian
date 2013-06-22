using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface IAddressService
    {
        Address Load(string id);
        void Save(Address address);
        void Update(Address address);
        void Delete(string id);
        void PhysicsDelete(string id);
        IList<Address> Search(List<DataFilter> termList);
        IList<Address> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface IPropValueService
    {
  
        PropValue Load(int id);
        void Save(PropValue propValue);
        void Update(PropValue propValue);
        void Delete(int id);
        IList<PropValue> Search(List<DataFilter> termList, int start, int limit, out long total);
        bool IsHaveTheSameName(string name);
        IList<PropValue> GetPropValueListByPropID(int pid);
        IList<PropValue> GetAllByPropIDName(string propIDName); 
    }
}

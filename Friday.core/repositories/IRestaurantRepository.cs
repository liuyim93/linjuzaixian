using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.repositories
{
    public interface IRestaurantRepository : IRepository<Restaurant>
    {

         Restaurant SearchByShortName(string name);



    }
}

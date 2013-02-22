using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.EnumType;

namespace friday.core.repositories
{
    public interface ILoginUserOfMerchantRepository : IRepository<LoginUserOfMerchant>
    {
        LoginUser GetMerchantLoginUserBy(string MerchantId,UserTypeEnum ust);
    }
}

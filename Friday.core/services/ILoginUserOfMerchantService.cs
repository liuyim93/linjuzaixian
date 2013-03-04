using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.EnumType;

namespace friday.core.services
{
    public interface ILoginUserOfMerchantService
    {
        LoginUserOfMerchant Load(string id);
        void Save(LoginUserOfMerchant loginUserOfMerchant);
        void Update(LoginUserOfMerchant loginUserOfMerchant);
        void Delete(string id);
        LoginUser GetMerchantLoginUserBy(string MerchantId, UserTypeEnum ust);
        String[] GetLoginUserOfMerchantBy(string loginusername);
    }
}

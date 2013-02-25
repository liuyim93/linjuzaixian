using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NUnit.Framework;
using friday.core.services;
using friday.core;

namespace Friday.Test2
{
    [TestFixture]
    public class Test_SystemFunctionObject
    {
        [Test]
        public void Test()
        {
            ISystemFunctionObjectService iSystemFunctionObjectService = UnityHelper.UnityToT<ISystemFunctionObjectService>();
            iSystemFunctionObjectService.Generate();
        }
    }
}

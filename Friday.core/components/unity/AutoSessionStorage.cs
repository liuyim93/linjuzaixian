using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate;

namespace friday.core.components
{
    public class AutoSessionStorage:ISessionStorage
    {
        ISession ISession;
        public AutoSessionStorage()
        {

        }
        public ISession Get()
        {
            return ISession;
        }
        public void Set(ISession value)
        {
            if (value != null)
            {
                ISession = value;
            }
        }
    }
}

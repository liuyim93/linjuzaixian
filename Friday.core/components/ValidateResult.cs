using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.components
{
    public class ValidateResult
    {
        public bool isSucceed
        {
            set;
            get;
        }

        public string message
        {
            set;
            get;
        }

        public string nextTime
        {
            set;
            get;
        }
    }
}

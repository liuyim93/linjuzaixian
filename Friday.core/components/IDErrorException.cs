using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.components
{
    public class IDErrorException:ApplicationException
    {
        string message = "ID不存在";
        public IDErrorException(string message) : base(message) 
        {
            this.message = message;
        }

        public override string Message
        {
            get
            {
                return base.Message;
            }
        }

    }
}

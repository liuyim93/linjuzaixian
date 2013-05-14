using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using friday.core.domain;

namespace Friday.mvc.Models
{
    public class RegisterModel
    {
        public RegisterModel()
        {
            bool isReg = false;

        }
        public bool isReg { get; set; }
        public IEnumerable<Activity> Activities { get; set; }
   
    }
}
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
            string tel;
            string loginName;
        }
        public bool isReg { get; set; }
        public string tel { get; set; }
        public string loginName { get; set; }
        public IEnumerable<Activity> Activities { get; set; }
   
    }
}
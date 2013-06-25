using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Friday.mvc.Models
{
    public class LoginModel
    {
        public LoginModel()
        {
            AuthenState = true;
        }

        [Required]
        [Display(Name = "登录名")]
        public string TPL_username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "密码")]
        public string TPL_password { get; set; }

        [Display(Name = "记住我?")]
        public bool RememberMe { get; set; }

        public bool AuthenState { get; set; }
    }
}
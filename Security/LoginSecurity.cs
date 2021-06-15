using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using Scaffolding.Models;


namespace Scaffolding.Security
{
    public static class LoginSecurity
    {
        public static tbl_UserType UserRole(string email)
        {
            using (var db = new db_IqraCompetationEntities())
            {
                return db.tbl_User.FirstOrDefault(s => s.Email.ToLower() == email.ToLower()).tbl_UserType;
            }
        }
        public static bool IsValidUser(string email, string password)
        {
            using (var db = new db_IqraCompetationEntities())
            {
                var user = db.tbl_User.SingleOrDefault(s => s.Email.ToLower() == email.ToLower() && s.Password==password && s.Active == true);
                return (user == null) ?false:true;
            }
        }
        public static tbl_User GetUserInfo(string email)
        {
            using (var db = new db_IqraCompetationEntities())
            {
                return db.tbl_User.FirstOrDefault(s => s.Email.ToLower() == email.ToLower());
            }
        }
        public static tbl_User User(int id)
        {
            using (var db = new db_IqraCompetationEntities())
            {
                return db.tbl_User.Find(id);
            }
        }
    }
}
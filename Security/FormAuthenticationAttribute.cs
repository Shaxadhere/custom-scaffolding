using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Scaffolding.Security
{
    public class FormAuthenticationAttribute : AuthorizeAttribute
    {
        private string roleid = "";
        public string RoleId { get { return roleid; } set { roleid = value; } }

        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            if (!base.AuthorizeCore(httpContext))
            {
                return false;
            }

            if (string.IsNullOrEmpty(roleid))
            {
                return true;
            }
            string email = httpContext.User.Identity.Name;
            var desig = LoginSecurity.UserRole(httpContext.User.Identity.Name);
            if (desig == null)
            {
                return false;
            }
            string role = "[" + desig.PK_Id + "]";
            return roleid.Contains(role);
        }
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            
            if(!filterContext.HttpContext.User.Identity.IsAuthenticated)
            {
                base.HandleUnauthorizedRequest(filterContext);
            }
            else
            {

            filterContext.Result = new RedirectToRouteResult(
                new RouteValueDictionary(
                    new
                    {
                        controller = "Error",
                        action = "Unauthorised",
                    })
                );
            }
        }

    }
}
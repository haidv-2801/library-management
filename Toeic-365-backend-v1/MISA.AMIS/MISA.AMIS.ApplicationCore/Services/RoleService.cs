using ClosedXML.Excel;
using TOE.TOEIC.ApplicationCore.Entities;
using TOE.TOEIC.ApplicationCore.Interfaces;
using TOE.TOEIC.Entities;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace TOE.TOEIC.ApplicationCore.Interfaces
{
    public class RoleService : BaseService<Role>, IRoleService
    {
        #region Declare
        IRoleRepository _accountRepository;
        IConfiguration _config;
        #endregion

        #region Constructer
        public RoleService(IRoleRepository accountRepository, IConfiguration config) : base(accountRepository)
        {
            _accountRepository = accountRepository;
            _config = config;
        }
        #endregion

        #region Methods
        #endregion
    }
}

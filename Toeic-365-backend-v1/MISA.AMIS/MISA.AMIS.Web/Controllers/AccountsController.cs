using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using MySqlConnector;
using System.Data;
using TOE.TOEIC.ApplicationCore;
using TOE.TOEIC.ApplicationCore.Interfaces;
using TOE.TOEIC.ApplicationCore.Entities;
using TOE.TOEIC.Web.Controllers;
using TOE.TOEIC.ApplicationCoore.Entities;
using Microsoft.AspNetCore.Cors;
using TOE.TOEIC.Entities;
using System.Threading;
using Microsoft.AspNetCore.Authorization;
using System.ComponentModel.DataAnnotations;

namespace MISA.CukCuk.Web.Controllers
{
    /// <summary>
    /// Controller bài đăng
    /// </summary>
    [ApiController]
    public class AccountsController : BaseEntityController<Account>
    {
        #region Declare
        IAccountService _accountService;
        #endregion

        #region Constructer
        public AccountsController(IAccountService accountService) : base(accountService)
        {
            _accountService = accountService;
        }
        #endregion

        #region Methods
        /// <summary>
        /// Lấy danh sách bài đăng phân trang, tìm kiếm
        /// </summary>
        /// <param name="filterValue">Giá trị tìm kiếm</param>
        /// <param name="pageSize">Số bản ghi trên 1 trang</param>
        /// <param name="pageNumber">Số trang</param>
        /// <returns>Danh sách bài đăng</returns>
        /// CREATED BY: DVHAI (07/07/2021)
        [EnableCors("AllowCROSPolicy")]
        [Route("/api/Accounts/AccountsFilterPaging")]
        [HttpPost]
        public ActionResult GetAccountsFilterPaging([FromQuery]string filterValue, [FromQuery] int pageSize, [FromQuery] int pageNumber)
        {
            return Ok(_accountService.GetAccountsFilterPaging(filterValue, pageSize, pageNumber));           
        }

        /// <summary>
        /// Test Authorization
        /// </summary>
        [EnableCors("AllowCROSPolicy")]
        [Route("test")]
        [HttpGet]
        public IActionResult TestAuth()
        {
            return Ok(new string[] { "value1", "value2", "value3", "value4", "value5" });
        }

        /// <summary>
        /// Login
        /// </summary>
        [EnableCors("AllowCROSPolicy")]
        [AllowAnonymous]
        [HttpPost("Login")]
        public IActionResult Login([FromBody] Account accountInfo)
        {
            try
            {
                var isLoggedIn = _accountService.Login(accountInfo);
                if (isLoggedIn == null) return Unauthorized();
                return Ok(isLoggedIn);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }
        }


        /// <summary>
        /// Login
        /// </summary>
        [EnableCors("AllowCROSPolicy")]
        [AllowAnonymous]
        [HttpPut("/api/Accounts/ChangePassword/{id}")]
        public IActionResult ChangePassword([FromRoute][Required]string id, [FromBody][Required] AccountPasswordChangeDTO entity)
        {
            var res = new ServiceResult();
            try
            {
                res = _accountService.ChangePassword(Guid.Parse(id), entity);
                if (res.TOECode == TOECode.InValid || res.TOECode == TOECode.Fail)
                    return BadRequest(res);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }
            return Ok(null);
        }
        #endregion
    }
}

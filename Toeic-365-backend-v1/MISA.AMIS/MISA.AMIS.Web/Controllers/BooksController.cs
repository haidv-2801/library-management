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
using Microsoft.AspNetCore.Cors;
using TOE.TOEIC.Entities;
using System.Threading;
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.Logging;
using TOE.TOEIC.ApplicationCore.MiddleWare;
using Newtonsoft.Json;

namespace TOE.TOEIC.Web.Controllers
{
    /// <summary>
    /// Controller bài đăng
    /// </summary>
    [ApiController]
    public class BookItemsController : BaseEntityController<BookItem>
    {
        #region Declare
        IBookService _bookService;
        ILogger<BookItem> _logger;
        IElasticService<BookItem> _bookELKService;
        #endregion

        #region Constructer
        public BookItemsController(IBookService bookService, ILogger<BookItem> logger, IElasticService<BookItem> postELKService) : base(bookService, logger)
        {
            _bookService = bookService;
            _logger = logger;
            _bookELKService = postELKService;
        }
        #endregion

        #region Methods
        [HttpPost]
        [Route("private/filter")]
        [EnableCors("AllowCROSPolicy")]
        [ServiceFilter(typeof(ClientIpCheckActionFilter))]
        public async Task<IActionResult> GetFilterPrivate(PagingRequest pagingRequest)
        {
            var serviceResult = new ServiceResult();
            try
            {
                _logger.LogInformation($"Filter {typeof(BookItem).Name} info : " + JsonConvert.SerializeObject(pagingRequest));
                var entity = await _bookService.GetEntitiesFilter(pagingRequest);

                if (entity == null)
                    return NotFound();

                return Ok(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError("Lỗi GetFilter: " + ex.Message);
                serviceResult.Data = null;
                serviceResult.Messasge = ex.Message;
                serviceResult.TOECode = TOECode.Fail;
            }

            if (serviceResult.TOECode == TOECode.Fail) { return BadRequest(serviceResult); }

            return Ok(serviceResult);
        }

        /// <summary>
        /// Thêm một thực thể mới
        /// </summary>
        /// <param name="bookOrder"></param>
        /// <returns>Sô bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: DVHAI 07/07/2021
        [EnableCors("AllowCROSPolicy")]
        [HttpGet("NextBookCode")]
        public async Task<IActionResult> GetNextBookCode()
        {
            try
            {
                return Ok(await _bookService.GetNextBookCode());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        #endregion
    }
}

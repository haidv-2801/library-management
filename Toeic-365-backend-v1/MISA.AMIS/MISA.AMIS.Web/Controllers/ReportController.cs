﻿using Microsoft.AspNetCore.Http;
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
using Microsoft.AspNetCore.Cors;
using TOE.TOEIC.Entities;
using System.Threading;
using Microsoft.AspNetCore.Authorization;
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.Logging;

namespace TOE.TOEIC.Web.Controllers
{
    /// <summary>
    /// Controller bài đăng
    /// </summary>
    [Route("/api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        #region Declare
        IBookService _bookService;
        ILibraryCardService _libraryCardService;
        IBookOrderService _bookOrderService;
        #endregion

        #region Constructer
        public ReportController(IBookService bookService, ILibraryCardService libraryCardService, IBookOrderService bookOrderService)
        {
            _bookService = bookService;
            _libraryCardService = libraryCardService;
            _bookOrderService = bookOrderService;
        }
        #endregion

        #region Methods

        [HttpGet]
        [Route("/api/scorecard")]
        [EnableCors("AllowCROSPolicy")]
        public async Task<IActionResult> GetReportScoreCard()
        {
            var totalBookOrdered = _bookOrderService.GetTotalBookOrdered();
            var totalLibraryCards = _libraryCardService.GetTotalLibraryCard();
            var totalBook = _bookService.GetTotalBook();
            var res = await Task.WhenAll(totalBookOrdered, totalLibraryCards, totalBook);
            return Ok(new { totalBooks = res[2], totalBookOrdereds = res[0], totalLibraryCards = res[1] });
        }


        [HttpGet]
        [Route("/api/top-book-borrowed")]
        [EnableCors("AllowCROSPolicy")]
        public async Task<IActionResult> GetTopBookBorrowed()
        {
            return Ok(await _bookOrderService.TopBookBorrowed());
        }
        #endregion
    }
}

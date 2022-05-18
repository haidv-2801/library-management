using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using MySqlConnector;
using System.Data;
using TOE.TOEIC.ApplicationCore.Interfaces;
using TOE.TOEIC.ApplicationCore.Entities;
using TOE.TOEIC.Web.Controllers;
using Microsoft.AspNetCore.Cors;
using TOE.TOEIC.Entities;
using System.Threading;
using Microsoft.Extensions.Logging;

namespace TOE.TOEIC.Web.Controllers
{
    /// <summary>
    /// Controller book order
    /// </summary>
    [ApiController]
    public class BookItemController : BaseEntityController<BookItem>
    {
        #region Declare
        IBaseService<BookItem> _bookItemService;
        #endregion

        #region Constructer
        public BookItemController(IBaseService<BookItem> bookItemService, ILogger<BookItem> logger) : base(bookItemService, logger)
        {
            _bookItemService = bookItemService;
        }
        #endregion

        #region Methods
        #endregion
    }
}

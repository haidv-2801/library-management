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
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace TOE.TOEIC.Web.Controllers
{
    /// <summary>
    /// Controller bài đăng
    /// </summary>
    [ApiController]
    public class FilesController : ControllerBase
    {
        #region Declare
        IBookService _bookService;
        IHostingEnvironment _hostingEnvironment;
        #endregion

        #region Constructer
        public FilesController(IBookService bookService, IHostingEnvironment hostingEnvironment)
        {
            _bookService = bookService;
            _hostingEnvironment = hostingEnvironment;
        }
        #endregion

        #region Methods
        [EnableCors("AllowCROSPolicy")]
        [Route("/api/FileManager")]
        [HttpPost]
        public ActionResult Create(IFormFile file)
        {
            try
            {
                if (file.FileName != null)
                {
                    var uniqueFileName = GetUniqueFileName(file.FileName);
                    var uploads = Path.Combine(_hostingEnvironment.ContentRootPath, "Uploads");
                    var filePath = Path.Combine(uploads, uniqueFileName);
                    file.CopyTo(new FileStream(filePath, FileMode.Create));
                    return Ok(uniqueFileName);
                }
                else
                {
                    BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        private string GetUniqueFileName(string fileName)
        {
            fileName = Path.GetFileName(fileName);
            return Path.GetFileNameWithoutExtension(fileName)
                      + "_"
                      + Guid.NewGuid().ToString().Substring(0, 4)
                      + Path.GetExtension(fileName);
        }
        #endregion
    }
}

using TOE.TOEIC.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace TOE.TOEIC.ApplicationCore.Interfaces
{
    public interface IBookService : IBaseService<BookItem>
    {
        Task<string> GetNextBookCode();

        Task<long> GetTotalBook();
    }
}

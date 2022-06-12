using TOE.TOEIC.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace TOE.TOEIC.ApplicationCore.Interfaces
{
    public interface IBookOrderService : IBaseService<BookOrder>
    {
        Task<ServiceResult> InsertBookOrder(BookOrder bookOrder);

        Task<string> GetNextBookOrderCode();


        Task<long> GetTotalBookOrdered();
    }
}

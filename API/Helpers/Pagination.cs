
namespace API.Helpers
{
    public class Pagination<T> where T : class
    {


        public Pagination(int PageSize, int pageIndex, int count, IEnumerable<T> Data)
        {
            this.PageSize = PageSize;
            this.PageIndex = pageIndex;
            this.Count = count;
            this.Data = Data;

        }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int Count { get; set; }

        public IEnumerable<T> Data { get; set; }
    }
}
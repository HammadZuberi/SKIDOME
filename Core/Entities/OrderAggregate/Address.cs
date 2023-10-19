namespace Core.Entities.OrderAggregate
{
    public class Address


    {
//for entity framework empty 
        public Address()
        {

        }

        //order ows int and resides in the same table
        public Address(string firstName, string street, string state, string zipCode)
        {
            this.FirstName = firstName;
            this.Street = street;
            this.State = state;
            this.ZipCode = zipCode;

        }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }

        public string ZipCode { get; set; }
    }
}
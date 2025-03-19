const transactions = [
    { id: 1, name: "Groceries", amount: "$150", date: "March 15" },
    { id: 2, name: "Rent", amount: "$1000", date: "March 1" },
    { id: 3, name: "Electricity Bill", amount: "$120", date: "March 10" },
  ];
  
  export default function ExpenseList() {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id} className="flex justify-between p-2 border-b">
              <span>{transaction.name}</span>
              <span className="font-semibold">{transaction.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
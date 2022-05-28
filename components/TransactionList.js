export default function TransactionList({ transactions }) {
    if (transactions.length === 0) return null;
  
    return (
      <>
        {transactions.map((item) => (
          <div key={item} className="alert alert-info mt-5">
            <div className="flex-1">
              <label>{item.hash}</label>
            </div>
          </div>
        ))}
      </>
    );
  }
  
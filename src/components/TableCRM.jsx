const TableCRM = ({
  bizNumber,
  name,
  phone,
  email,
  street,
  houseNumber,
  takeAway,
  orderStatus,
  createdAt,
  city,
  onInfo,
  id,
}) => {
  const handleIdOrder = () => {
    onInfo(id);
  };
  return (
    <tr onClick={handleIdOrder}>
        <td>{bizNumber}</td>
        <td className="medieCrm">{name}</td>
        <td>{phone}</td>
        <td className="medieCrm"> {email}</td>
        <td className="medieCrm">{city}</td>
        <td className="medieCrm">{street}</td>
        <td className="medieCrm">{houseNumber}</td>
        {takeAway ? <td>✔️</td> : <td>❌</td>}
        {orderStatus ? <td>✔️</td> : <td>❌</td>}
        <td className="medieCrm">{createdAt}</td>
      </tr>
  );
};

export default TableCRM;

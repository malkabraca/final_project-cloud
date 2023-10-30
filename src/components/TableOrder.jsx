const TableOrder = ({ imageUrl, title, price, amount }) => {
  return (
    <tr>
      <td style={{ width: "150px" }}>
        <img
          src={imageUrl}
          alt="Product Image"
          className="imagealert"
          style={{ maxWidth: "200%", maxHeight: "200%" }}
        />
      </td>
      <td>{title}</td>
      <td>{amount}</td>
      <td>{price}$</td>
      <td>{amount * price}$</td>
    </tr>
  );
};

export default TableOrder;

import { Button } from "react-bootstrap";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";


const TableUsers = ({
  name,
  phone,
  email,
  city,
  street,
  houseNumber,
  createdAt,
  isAdmin,
  id,
  onDelete,
  onEdit,
}) => {
  const handleDeleteBtnClick = () => {
    onDelete(id);
  };

  const handleEditBtnClick = () => {
    onEdit(id);
  };
  return (
    <tr>
      <td>{name}</td>
      <td>{phone}</td>
      <td className="medieCrm"> {email}</td>
      <td className="medieCrm">{city}</td>
      <td className="medieCrm">{street}</td>
      <td className="medieCrm">{houseNumber}</td>
      <td className="medieCrm">{createdAt}</td>
      {isAdmin ? (
        <td>
          ✔️
          <Button variant="warning" onClick={handleEditBtnClick}>
          <BsPencilFill />
          </Button>
        </td>
      ) : (
        <td>
          ❌
          <Button variant="warning" onClick={handleEditBtnClick}>
          <BsPencilFill />
          </Button>
        </td>
      )}
      <td>
        <Button variant="warning" onClick={handleDeleteBtnClick}>
          <BsTrashFill />
        </Button>
      </td>
    </tr>
  );
};
export default TableUsers;

import { FaCheckCircle, FaPencilAlt, FaTrash } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";

export default function ModuleControlButtons({
  onEdit, onDelete,
}: {
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {onEdit && <FaPencilAlt
        className="cursor-pointer text-blue-600"
        onClick={onEdit}
        title="Edit module"
      />}
      {onDelete && <FaTrash
        className="cursor-pointer text-red-600"
        onClick={onDelete}
        title="Delete module"
      />}
      <FaCheckCircle className="text-green-600" />
      <BsPlus className="text-3xl" />
      <IoEllipsisVertical className="text-xl" />
    </div>
  );
}

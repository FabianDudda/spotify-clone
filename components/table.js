import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { getComments } from "../lib/helper";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { isVisibleState, formIdState, deleteIdState } from "../atoms/formAtom";

export default function Table() {
  const { isLoading, isError, data, error } = useQuery("comments", getComments);

  if (isLoading) return <div>Comments is Loading...</div>;
  if (isError) return <div>Got Error {error}</div>;

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-16 py-2">
            <span className="text-gray-200">SpotifyId</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Username</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Text</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Date</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {data.map((obj, i) => (
          <Tr {...obj} key={i} />
        ))}
      </tbody>
    </table>
  );
}

function Tr({ _id, spotifyId, username, text, date }) {
  const [isVisible, setIsVisible] = useRecoilState(isVisibleState);
  const [formId, setFormId] = useRecoilState(formIdState);
  const [deleteId, setDeleteId] = useRecoilState(deleteIdState);

  const onUpdate = () => {
    console.log(isVisible);

    setIsVisible(!isVisible);
    if (isVisible) {
      setFormId(_id);
    }
  };

  const onDelete = () => {
    if (!isVisible) {
      setDeleteId(_id);
    }
  };

  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2 flex flex-row items-center">
        {/* <img
          src={avatar || "#"}
          alt=""
          className="h-8 w-8 rounded-full object-cover"
        /> */}
        <span className="text-center ml-2 font-semibold">
          {spotifyId || "Unknown"}
        </span>
      </td>
      <td className="px-16 py-2">
        <span>{username || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>{text || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>{date || "Unknown"}</span>
      </td>

      <td className="px-16 py-2 flex justify-around gap-5">
        <button className="cursor" onClick={onUpdate}>
          <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
        </button>
        <button className="cursor" onClick={onDelete}>
          <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
        </button>
      </td>
    </tr>
  );
}

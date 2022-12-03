import { BiBrush } from "react-icons/bi";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getComment, getComments, updateComment } from "../lib/helper";

export default function UpdateCommentForm({ formId, formData, setFormData }) {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    ["comments", formId],
    () => getComment(formId)
  );
  const UpdateMutation = useMutation(
    (newData) => updateComment(formId, newData),
    {
      onSuccess: async (data) => {
        // queryClient.setQueryData('comments', (old) => [data])
        queryClient.prefetchQuery("comments", getComments);
      },
    }
  );

  if (isLoading) return <div>Loading...!</div>;
  if (isError) return <div>Error</div>;
  const { spotifyId, username, text, date } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updated = Object.assign({}, data, formData);
    await UpdateMutation.mutate(updated);
  };

  return (
    <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={spotifyId}
          name="spotifyId"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="spotifyId"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={username}
          name="username"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="username"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={text}
          name="text"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="text"
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          onChange={setFormData}
          defaultValue={date}
          name="date"
          className="border px-5 py-3 focus:outline-none rounded-md"
          placeholder="Date"
        />
      </div>

      <button className="flex justify-center text-md w-2/6 bg-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
        Update{" "}
        <span className="px-1">
          <BiBrush size={24}></BiBrush>
        </span>
      </button>
    </form>
  );
}

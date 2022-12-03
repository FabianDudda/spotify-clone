import { BiPlus } from "react-icons/bi";
import Success from "./success";
import Bug from "./bug";
import { useQueryClient, useMutation } from "react-query";
import { addComment, getComments } from "../lib/helper";
import { useRecoilValue } from "recoil";
import { spotifyIdState } from "../atoms/userAtom";

export default function AddCommentForm({ formData, setFormData }) {
  const spotifyId = useRecoilValue(spotifyIdState);
  console.log(spotifyId);
  const queryClient = useQueryClient();
  const addMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.prefetchQuery("comments", getComments);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formData).length == 0)
      return console.log("Don't have Form Data");
    let { username, text, date } = formData;

    const model = {
      // avatar: `https://randomuser.me/api/portraits/men/${Math.floor(
      //   Math.random() * 10
      // )}.jpg`,
      spotifyId: spotifyId ?? "123spotifyId456",
      username,
      text,
      date,
    };

    addMutation.mutate(model);
  };

  if (addMutation.isLoading) return <div>Loading!</div>;
  if (addMutation.isError)
    return <Bug message={addMutation.error.message}></Bug>;
  if (addMutation.isSuccess)
    return <Success message={"Added Successfully"}></Success>;

  return (
    <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="spotifyId"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="spotifyId"
          disabled
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="username"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="username"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="text"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="text"
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          onChange={setFormData}
          name="date"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="date"
        />
      </div>

      <button
        type="submit"
        className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500"
      >
        Add{" "}
        <span className="px-1">
          <BiPlus size={24}></BiPlus>
        </span>
      </button>
    </form>
  );
}

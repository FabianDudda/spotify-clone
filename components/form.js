import UpdateCommentForm from "./updateCommentForm";
import addCommentForm from "./addCommentForm";
import { useReducer } from "react";
import { useRecoilValue } from "recoil";
import { formIdState } from "../atoms/formAtom";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function Form() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const formId = useRecoilValue(formIdState);
  console.log(formId);

  return (
    <div className="container mx-auto py-5">
      {formId
        ? UpdateCommentForm({ formId, formData, setFormData })
        : addCommentForm({ formData, setFormData })}
    </div>
  );
}

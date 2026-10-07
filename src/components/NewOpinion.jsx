import { useActionState, use } from "react";

import { OpinionsContext } from "../store/opinions-context.jsx";
import SubmitButton from "./SubmitButton.jsx";

export function NewOpinion() {
  const {addOpinion} = use(OpinionsContext);
  
  async function handleFormSubmit(prevFormState, formData) {
    const name = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    let errors = [];

    if (name.trim() === "") {
      errors.push("Please enter your name.");
    }

    if (title.trim() === "") {
      errors.push("Please enter a title.");
    }

    if (body.trim() === "") {
      errors.push("Please enter your opinion.");
    }

    if (errors.length) {
      return {
        errors,
        enteredValues: {
          name,
          title,
          body,
        },
      };
    }

    await addOpinion({userName: name, title, body});

    return { errors: null };
  }

  const [formState, formAction] = useActionState(handleFormSubmit, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.name}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>
        <div className="errors">
          <ul>
            {formState.errors?.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}

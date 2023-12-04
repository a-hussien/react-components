import { useState, lazy, Fragment } from "react";
import parse from "html-react-parser";

const Tiptap = lazy(() => import('../components/Tiptap'));

const TextEditorPage = () => {

  const [content, setContent] = useState("Compose your content");

  return (
    <Fragment>
      <Tiptap content={content} setContent={setContent} />
      {content !== '' ? (
        <div>
          <h3 className="mx-auto underline text-2xl text-center font-black text-indigo-600">
            The Result
          </h3>
          <div className="p-4 m-4 bg-stone-100 tiptap rounded-md">
            {parse(content)}
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default TextEditorPage;

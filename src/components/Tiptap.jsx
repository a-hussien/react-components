import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import ListItem from '@tiptap/extension-list-item';
import StarterKit from '@tiptap/starter-kit';

const MenuBar = () => {
    const { editor } = useCurrentEditor()
  
    if (!editor) {
      return null
    }
  
    return (
      <div className='p-4 mx-4 mt-4 text-center px-4 space-x-2 bg-slate-100'>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'font-bold' : ''}
        >
          bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'font-bold' : ''}
        >
          italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? 'font-bold' : ''}
        >
          strike
        </button>
        
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'font-bold' : ''}
        >
          paragraph
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'font-bold' : ''}
        >
          h1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'font-bold' : ''}
        >
          h2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'font-bold' : ''}
        >
          h3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? 'font-bold' : ''}
        >
          h4
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive('heading', { level: 5 }) ? 'font-bold' : ''}
        >
          h5
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive('heading', { level: 6 }) ? 'font-bold' : ''}
        >
          h6
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'font-bold' : ''}
        >
          bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'font-bold' : ''}
        >
          ordered list
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'font-bold' : ''}
        >
          blockquote
        </button>

        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          horizontal rule
        </button>

        <button onClick={() => editor.chain().focus().setHardBreak({keepMarks: true}).run()}>
          hard break
        </button>

        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          redo
        </button>

        <button
          onClick={() => editor.chain().focus().setColor('#235784').run()}
          className={editor.isActive('textStyle', { color: '#235784' }) ? 'font-bold' : ''}
        >
          Primary
        </button>

        <button
          onClick={() => editor.chain().focus().setColor('#47a4c0').run()}
          className={editor.isActive('textStyle', { color: '#47a4c0' }) ? 'font-bold' : ''}
        >
          Secondary
        </button>

        <input
        type="color"
        onInput={event => editor.chain().focus().setColor(event.target.value).run()}
        value={editor.getAttributes('textStyle').color ?? "#000000"}
        data-testid="setColor"
        />
        <button
        onClick={() => editor.chain().focus().unsetColor().run()}
        data-testid="unsetColor"
        >
        unsetColor
        </button>
        
      </div>
    )
  }
  
  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
    }),
  ];

  const editorProps = {
        attributes: {
          class: 'mx-4 mb-4 p-4 focus:outline-none border-2 border-slate-100',
        },
    }

  
  const content = `Compose your content`;

  export default ({ setContent }) => {
    return (
      <EditorProvider 
      slotBefore={<MenuBar />} 
      extensions={extensions} 
      content={content}
      editorProps={editorProps}
      onUpdate={({ editor }) => {
          const html = editor.getHTML();
          setContent(html);
      }}
      />
    )
  }
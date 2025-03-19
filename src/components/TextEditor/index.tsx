import React from 'react';

import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { Editor, EditorContent, EditorProvider, useCurrentEditor, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import './style.scss';

interface MenuBarProp {
  editor: Editor | null
}

// component: Text Editor Menu Bar 컴포넌트 //
function MenuBar({ editor }: MenuBarProp) {

  if (!editor) return null;

  // render: Text Editor Menu Bar 컴포넌트 렌더링 //
  return (
    <div className="control-group">
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          굵게
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
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          기울임꼴
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
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          취소선
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          문단
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          제목1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          제목2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
          제목3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          순서 없는 리스트
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          순서 리스트
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          가로 구분선
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
          이전
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
          이후
        </button>
      </div>
    </div>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
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
]


// render: tiptap Text Editor 컴포넌트 속성 //
interface Props {
  content: string;
  setContent: (content: string) => void;
}

// component: tiptap Text Editor 컴포넌트 //
export default function TextEditor({ content, setContent }: Props) {

  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    }
  })

  // render: tiptap Text Editor 컴포넌트 렌더링 //
  return (
    <>
    <MenuBar editor={editor} />
    <EditorContent editor={editor}></EditorContent>
    </>
  )
}

import { RichTextEditor } from 'mui-tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Box } from '@mui/material';

interface RichTextEditorProps {
  content?: string;
  onChange: (content: string) => void;
}

export const PostEditor = ({ content = '', onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image.configure({ HTMLAttributes: { class: 'editor-image' } }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  return (
    <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
      <RichTextEditor
        editor={editor}
        contentEditableClassName="prose max-w-none focus:outline-none p-4"
        extensions={[
          RichTextEditor.ControlsBubble,
          RichTextEditor.LinkBubbleButton,
          RichTextEditor.ImageControl({
            onUpload: async (file: File) => {
              const formData = new FormData();
              formData.append('image', file);
              const { url } = await api.post('/upload/image/', formData);
              return url;
            },
          }),
        ]}
      />
    </Box>
  );
};
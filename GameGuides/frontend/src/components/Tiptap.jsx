import React from "react";
import { useEditor, EditorContent, generateJSON } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button, ButtonGroup, IconButton,Box, Typography } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import { Grid } from "@mui/material";
import "./Tiptap_styles.css";
import { FormatStrikethrough } from "@mui/icons-material";
import CodeIcon from "@mui/icons-material/Code";
import FormatClearIcon from "@mui/icons-material/FormatClear";
import AbcIcon from "@mui/icons-material/Abc";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <Grid display="flex" justifyContent="center">
        <ButtonGroup size="small">
          <IconButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
          >
            <FormatBoldIcon
              sx={editor.isActive("bold") ? { color: "#2196f3" } : {color: "#6D9886"}}
            ></FormatBoldIcon>
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            sx={editor.isActive("italic") ?{ color: "#2196f3" } : {color: "#6D9886"}}
          >
            <FormatItalicIcon></FormatItalicIcon>
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            sx={editor.isActive("strike")? { color: "#2196f3" } : {color: "#6D9886"}}
            >
            <FormatStrikethrough></FormatStrikethrough>
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            sx={editor.isActive("code")?{ color: "#2196f3" } : {color: "#6D9886"}}
          >
            <CodeIcon></CodeIcon>
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
            sx={{color:"#6D9886"}}
          >
            <FormatClearIcon></FormatClearIcon>
          </IconButton>
          <IconButton onClick={() => editor.chain().focus().clearNodes().run()}
          sx={{color:"#6D9886"}}
          >
            <ClearAllIcon></ClearAllIcon>
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive("paragraph") ? "is-active" : ""}
            sx={editor.isActive("paragraph")?{ color: "#2196f3" } : {color: "#6D9886"}}
          >
            <AbcIcon></AbcIcon>
          </IconButton>
          <IconButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
            sx={editor.isActive("heading",{level:1})?{ color: "#2196f3" } : {color: "#6D9886"}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="25"
              fill="currentColor"
              class="bi bi-type-h1"
              viewBox="0 0 16 16"
            >
              <path d="M8.637 13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329 0V3.669h-1.244L10.5 5.316v1.265l2.16-1.565h.062V13h1.244z" />
            </svg>
          </IconButton>
          <IconButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()  
            }
            sx={editor.isActive("heading",{level:2})?{ color: "#2196f3" } : {color: "#6D9886"}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="25"
              fill="currentColor"
              class="bi bi-type-h2"
              viewBox="0 0 16 16"
            >
              <path d="M7.638 13V3.669H6.38V7.62H1.759V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.022-6.733v-.048c0-.889.63-1.668 1.716-1.668.957 0 1.675.608 1.675 1.572 0 .855-.554 1.504-1.067 2.085l-3.513 3.999V13H15.5v-1.094h-4.245v-.075l2.481-2.844c.875-.998 1.586-1.784 1.586-2.953 0-1.463-1.155-2.556-2.919-2.556-1.941 0-2.966 1.326-2.966 2.74v.049h1.223z" />
            </svg>
          </IconButton>
          <IconButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            sx={editor.isActive("heading",{level:3})?{ color: "#2196f3" } : {color: "#6D9886"}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="25"
              fill="currentColor"
              class="bi bi-type-h3"
              viewBox="0 0 16 16"
            >
              <path d="M7.637 13V3.669H6.379V7.62H1.758V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.625-4.272h1.018c1.142 0 1.935.67 1.949 1.674.013 1.005-.78 1.737-2.01 1.73-1.08-.007-1.853-.588-1.935-1.32H9.108c.069 1.327 1.224 2.386 3.083 2.386 1.935 0 3.343-1.155 3.309-2.789-.027-1.51-1.251-2.16-2.037-2.249v-.068c.704-.123 1.764-.91 1.723-2.229-.035-1.353-1.176-2.4-2.954-2.385-1.873.006-2.857 1.162-2.898 2.358h1.196c.062-.69.711-1.299 1.696-1.299.998 0 1.695.622 1.695 1.525.007.922-.718 1.592-1.695 1.592h-.964v1.074z" />
            </svg>
          </IconButton>
          {/* <IconButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={
              editor.isActive("heading", { level: 4 }) ? "is-active" : ""
            }
          >
            h4
          </IconButton>
          <IconButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={
              editor.isActive("heading", { level: 5 }) ? "is-active" : ""
            }
          >
            h5
          </IconButton>
          <IconButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
            className={
              editor.isActive("heading", { level: 6 }) ? "is-active" : ""
            }
          >
            h6
          </IconButton> */}
          <IconButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
            sx={editor.isActive("bulletList")?{ color: "#2196f3" } : {color: "#6D9886"}}
          >
            <FormatListBulletedIcon></FormatListBulletedIcon>
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
            sx={editor.isActive("orderedList")?{ color: "#2196f3" } : {color: "#6D9886"}}
          >
            <FormatListNumberedIcon></FormatListNumberedIcon>
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "is-active" : ""}
            sx={editor.isActive("codeBlock")?{ color: "#2196f3" } : {color: "#6D9886"}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="25"
              fill="currentColor"
              class="bi bi-code-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M6.854 4.646a.5.5 0 0 1 0 .708L4.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0zm2.292 0a.5.5 0 0 0 0 .708L11.793 8l-2.647 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708 0z" />
            </svg>
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "is-active" : ""}
            sx={editor.isActive("blockquote")?{ color: "#2196f3" } : {color: "#6D9886"}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="25"
              fill="currentColor"
              class="bi bi-blockquote-left"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm5 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6zm0 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6zm-5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm.79-5.373c.112-.078.26-.17.444-.275L3.524 6c-.122.074-.272.17-.452.287-.18.117-.35.26-.51.428a2.425 2.425 0 0 0-.398.562c-.11.207-.164.438-.164.692 0 .36.072.65.217.873.144.219.385.328.72.328.215 0 .383-.07.504-.211a.697.697 0 0 0 .188-.463c0-.23-.07-.404-.211-.521-.137-.121-.326-.182-.568-.182h-.282c.024-.203.065-.37.123-.498a1.38 1.38 0 0 1 .252-.37 1.94 1.94 0 0 1 .346-.298zm2.167 0c.113-.078.262-.17.445-.275L5.692 6c-.122.074-.272.17-.452.287-.18.117-.35.26-.51.428a2.425 2.425 0 0 0-.398.562c-.11.207-.164.438-.164.692 0 .36.072.65.217.873.144.219.385.328.72.328.215 0 .383-.07.504-.211a.697.697 0 0 0 .188-.463c0-.23-.07-.404-.211-.521-.137-.121-.326-.182-.568-.182h-.282a1.75 1.75 0 0 1 .118-.492c.058-.13.144-.254.257-.375a1.94 1.94 0 0 1 .346-.3z" />
            </svg>
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            sx={{color:"#6D9886"}}
          >
            <HorizontalRuleIcon></HorizontalRuleIcon>
          </IconButton>
          {/* <IconButton
            onClick={() => editor.chain().focus().setHardBreak().run()}
          >
            hard break
          </IconButton> */}
          <IconButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            sx={{color:"#6D9886"}}
          >
            <UndoIcon></UndoIcon>
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            sx={{color:"#6D9886"}}
          >
            <RedoIcon></RedoIcon>
          </IconButton>
        </ButtonGroup>
      </Grid>
    </>
  );
};

function TipTap({ content, setContent }) {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {},
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    content: "",
  });
  return (
    <Box>
      <MenuBar editor={editor} />
      <EditorContent editor={editor}></EditorContent>
    </Box>
  );
}

export default TipTap;

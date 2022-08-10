import styles from "../../styles/wrapper.css";
import { useNavigate } from "@remix-run/react";
import { NavigateFunction } from "@remix-run/react";
import { Form } from "@remix-run/react";
import { ActionArgs, redirect } from "@remix-run/node";
import { TypedResponse } from "@remix-run/node";

// TYPES
import { FormData } from "~/model";

// MUI COMPONENTS
import { TextField, Box, Button, styled, Stack } from "@mui/material";
import { ActionFunction } from "@remix-run/node";

// APIS
import { createNewPost } from "~/apis/fetch_post";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

interface FormDataValue {
  [key: string]: FormDataEntryValue
}

export const action: ActionFunction = async ({ request }: ActionArgs): Promise<TypedResponse<never>> => {
  const data = await request.formData();
  const prepareObj: FormDataValue  = Object.fromEntries(data);
  const tags: string[] = (prepareObj.tags as string).split(',')
  const {title, description, auther } = prepareObj;
  await createNewPost({title, description, auther, tags});
  return redirect('/');
};

export default function (): JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  return (
    <div className="container">
      <Box sx={{ mr: "auto" }}>
        <Button onClick={() => navigate("/")} variant="outlined">
          Back
        </Button>
      </Box>
      <Form method="post" style={{ width: "100%" }}>
        <Stack
          spacing={2}
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <TextField
            id="outlined-multiline-flexible"
            label="Title"
            fullWidth={true}
            style={{ width: "100%" }}
            name="title"
            type="text"
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Your Name"
            fullWidth={true}
            style={{ width: "100%" }}
            name="auther"
            type="text"
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            rows={4}
            fullWidth={true}
            style={{ width: "100%" }}
            name="description"
            type="text"
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Tags"
            fullWidth={true}
            style={{ width: "100%" }}
            name="tags"
            type="text"
            helperText="Comma Seperated i.e. news, game, etc"
          />
          <Box>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </Stack>
      </Form>
    </div>
  );
}

import { Fragment, useState } from "react";
import { Button, Flex, Stack, TextInput, Textarea, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ListComponent from "./components/List";
import { trpc } from "./utils";

interface Post {
  title: string;
  content: string;
}

const Page = () => {
  const [post, setPost] = useState<Post>({ title: "", content: "" });
  const [opened, { open, close }] = useDisclosure(false);
  const { data, isLoading } = trpc.getPosts.useQuery();
  const createPosts = trpc.createPost.useMutation();
  const context = trpc.useContext();
  if (isLoading) return <div>Loading...</div>;
  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { content, title } = post;
    await createPosts.mutateAsync({
      title,
      content,
      authorId: 1,
      published: true,
    });
    context.getPosts.invalidate();
    setPost({ title: "", content: "" });
    close();
  };
  return (
    <Fragment>
      <Button onClick={open}>Add Post</Button>
      <Modal opened={opened} onClose={close} title="Create Post" centered>
        <form onSubmit={handleCreate}>
          <Stack>
            <TextInput
              placeholder="1984"
              label="Title"
              required
              onChange={({ target }) =>
                setPost((previous) => ({ ...previous, title: target.value }))
              }
            />
            <Textarea
              placeholder="The book is set in 1984 in Oceania, one of three perpetually warring totalitarian states (the other two are Eurasia and Eastasia)."
              label="Content"
              required
              minRows={6}
              onChange={({ target }) =>
                setPost((previous) => ({ ...previous, content: target.value }))
              }
            />
            <Button type="submit">Create Post</Button>
          </Stack>
        </form>
      </Modal>
      <Flex direction="column" align="center">
        <ListComponent items={data} />
      </Flex>
    </Fragment>
  );
};

export default Page;

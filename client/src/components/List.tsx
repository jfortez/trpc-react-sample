import { List, ThemeIcon } from "@mantine/core";
import { IconArticle } from "@tabler/icons-react";
interface ListProps {
  items?: { title: string; id: number }[];
}
export default function ListComponent({ items }: ListProps) {
  return (
    <List
      spacing="xs"
      size="sm"
      center
      icon={
        <ThemeIcon color="teal" size={24} radius="xl">
          <IconArticle size="1rem" />
        </ThemeIcon>
      }
    >
      {items?.map((item) => {
        return <List.Item key={item.id}>{item.title}</List.Item>;
      })}
    </List>
  );
}

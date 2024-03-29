import {
  AdminSideBar,
  ManageUsers as ManageUsersComponent,
} from "../../components";
import { Flex } from "@mantine/core";

const ManageUsers: React.FC = () => {
  return (
    <Flex
      gap="xs"
      justify="space-between"
      align="flex-start"
      direction="row"
      wrap="wrap"
      style={{ height: "100vh" }}
    >
      <AdminSideBar />
      <ManageUsersComponent />
    </Flex>
  );
};

export default ManageUsers;

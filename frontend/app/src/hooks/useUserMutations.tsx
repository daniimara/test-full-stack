import { omit } from "lodash";
import { useMutation } from "@apollo/client";
import { queryListUsers } from "graphql-client/queries/get-users";
import { mutationCreateUser } from "graphql-client/mutations/create-user";
import { mutationUpdateUser } from "graphql-client/mutations/update-user";
import { DEFAULT_PAGE_SIZE } from "config/constants";

interface UseUserMutationsProps {
  page: number;
  exclusiveStartKey: ExclusiveStartKey | undefined;
  onCompleted?: () => void;
  onError?: () => void;
}

const useUserMutations = (props: UseUserMutationsProps) => {
  const { page, exclusiveStartKey } = props;
  const exclusiveStartKeyParam = page > 1 ? exclusiveStartKey : undefined;

  const queryListUsersInput: ListUsersInput = {
    pageSize: DEFAULT_PAGE_SIZE,
    exclusiveStartKey: exclusiveStartKeyParam,
  };

  const [doCreateUser, { loading: createUserLoading }] = useMutation<Mutation>(
    mutationCreateUser,
    {
      onCompleted: async () => {
        if (props && props.onCompleted) {
          props.onCompleted();
        }
      },
      onError: props.onError,
    }
  );

  const createUser = async (user: User) => {
    await doCreateUser({
      variables: {
        user: omit(user, ["id"]),
      },
      update: (cache, result) => {
        const cachedData: Query | null = cache.readQuery({
          query: queryListUsers,
          variables: {
            input: queryListUsersInput,
          },
        });

        const newUserList = [
          ...(cachedData?.listUsers.items || []),
          result?.data?.createUser,
        ];

        cache.writeQuery({
          query: queryListUsers,
          variables: {
            input: queryListUsersInput,
          },
          data: {
            listUsers: {
              exclusiveStartKey: cachedData?.listUsers.exclusiveStartKey,
              items: [...newUserList],
            },
          },
        });
      },
    });
  };

  const [doUpdateUser, { loading: updateUserLoading }] = useMutation<Mutation>(
    mutationUpdateUser,
    {
      onCompleted: async () => {
        if (props && props.onCompleted) {
          props.onCompleted();
        }
      },
      onError: props.onError,
    }
  );

  const updateUser = async (user: User) => {
    await doUpdateUser({
      variables: {
        user: { ...user },
      },
      update: (cache, result) => {
        const cachedData: Query | null = cache.readQuery({
          query: queryListUsers,
          variables: {
            input: queryListUsersInput,
          },
        });

        const newUserList =
          cachedData?.listUsers?.items.map((user) => {
            if (user.id === result?.data?.updateUser.id) {
              return result?.data?.updateUser;
            } else {
              return user;
            }
          }) || [];

        cache.writeQuery({
          query: queryListUsers,
          variables: {
            input: queryListUsersInput,
          },
          data: {
            listUsers: {
              exclusiveStartKey: cachedData?.listUsers.exclusiveStartKey,
              items: [...newUserList],
            },
          },
        });
      },
    });
  };

  return {
    createUser: createUser,
    updateUser: updateUser,
    createUserLoading,
    updateUserLoading,
  };
};

export default useUserMutations;

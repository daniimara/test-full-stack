import { FC, Fragment, useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { sortBy } from "lodash";
import "./styles.scss";
import TextField from "components/TextField";
import Button from "components/Button";
import Card from "components/Card";
import Snackbar, { SnackbarProps } from "components/Snackbar";
import Spinner from "components/Spinner";
import UserEdit from "./UserEdit";

import {
  useQuery,
  useLazyQuery,
  NetworkStatus,
  ApolloError,
} from "@apollo/client";
import { queryListUsers } from "graphql-client/queries/get-users";
import { queryGetUserByName } from "graphql-client/queries/get-user-by-name";

import useUserMutations from "hooks/useUserMutations";

import actionMessages from "resources/messages-actions.json";
import serviceMessages from "resources/messages-services.json";
import userMessages from "resources/messages-user.json";
import { DEFAULT_PAGE_SIZE, DEFAULT_SEARCH_CHARACTER } from "config/constants";

export interface UserListProps {
  listUsers: User[];
  exclusiveStartKey: ExclusiveStartKey | undefined;
  shouldLoadMore: boolean;
  listUsersLoading: boolean;
  listUsersError: ApolloError | undefined;
  onLoadMore: (page: number) => void;
}

export const UserList: FC<UserListProps> = ({
  listUsers,
  exclusiveStartKey,
  shouldLoadMore,
  listUsersLoading,
  listUsersError,
  onLoadMore,
}) => {
  const url = new URL(window.location.href);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [stateExclusiveStartKey, setStateExclusiveStartKey] = useState<
    ExclusiveStartKey | undefined
  >(undefined);
  const [stateUser, setStateUser] = useState<User | undefined>(undefined);
  const [openUserDialog, setOpenUserDialog] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarProps>({
    open: false,
    type: "info",
    message: "",
  });

  useEffect(() => {
    if (listUsersError) {
      setSnackbar({
        open: true,
        type: "error",
        message: serviceMessages.somethingWentWrong,
      });
    }
  }, [listUsersError]);

  const handleLoadMore = () => {
    setURLSearchParams(page + 1);
    setPage(page + 1);
    onLoadMore(page + 1);
  };

  const setURLSearchParams = (pageSize: number) => {
    url.searchParams.set("page", pageSize.toString());
    window.history.pushState({}, "", url.href);
  };

  const handleCreateUser = () => {
    setStateUser({} as User);
    setOpenUserDialog(true);
  };

  const handleEditUser = (user: User) => {
    setStateUser(user);
    setOpenUserDialog(true);
  };

  useEffect(() => {
    setStateExclusiveStartKey(exclusiveStartKey);
  }, [exclusiveStartKey]);

  useEffect(() => {
    if (!openUserDialog) {
      setTimeout(() => setStateUser(undefined), 2000);
    }
  }, [openUserDialog]);

  const { updateUser, updateUserLoading } = useUserMutations({
    exclusiveStartKey: stateExclusiveStartKey,
    page: page,
    onCompleted: () => {
      setSnackbar({
        open: true,
        type: "info",
        message: serviceMessages.userUpdatedSuccess,
      });
    },
    onError: () => {
      setSnackbar({
        open: true,
        type: "error",
        message: serviceMessages.somethingWentWrong,
      });
    },
  });

  const { createUser, createUserLoading } = useUserMutations({
    exclusiveStartKey: stateExclusiveStartKey,
    page: page,
    onCompleted: () => {
      setSnackbar({
        open: true,
        type: "info",
        message: serviceMessages.userCreatedSuccess,
      });
    },
    onError: () => {
      setSnackbar({
        open: true,
        type: "error",
        message: serviceMessages.somethingWentWrong,
      });
    },
  });

  const handleSubmitUser = async (user: User) => {
    setOpenUserDialog(false);
    if (user.id) {
      await updateUser(user);
    } else {
      // TODO - Add a new field to upload image at the editUser
      const id = uuidv4();
      user.imageUrl = `https://source.unsplash.com/168x168/?portrait,face,${id}`;
      await createUser(user);
    }
  };

  const [getUserByName, { loading: getUserByNameLoading }] = useLazyQuery(
    queryGetUserByName,
    {
      onCompleted: (data: Query) => {
        setSearchResult(data?.getUserByName);
      },
      onError: () => {
        setSnackbar({
          open: true,
          type: "error",
          message: serviceMessages.somethingWentWrong,
        });
      },
    }
  );

  useEffect(() => {
    if (!!searchValue && searchValue.length > DEFAULT_SEARCH_CHARACTER) {
      getUserByName({ variables: { userName: searchValue } });
    } else {
      setSearchResult([]);
    }
  }, [getUserByName, searchValue]);

  const loading = listUsersLoading || createUserLoading || updateUserLoading;

  const userCard = (user: User) => {
    return (
      <Fragment key={user.id}>
        <Card
          imageUrl={`https://source.unsplash.com/168x168/?portrait,face,${user.id}`}
          title={user.name}
          description={user.description}
          createdAt={user.createdAt}
          onEdit={() => handleEditUser(user)}
        />
      </Fragment>
    );
  };

  return (
    <>
      {stateUser && (
        <UserEdit
          {...stateUser}
          open={openUserDialog}
          onClose={() => setOpenUserDialog(false)}
          onSubmit={handleSubmitUser}
        />
      )}
      {(loading || getUserByNameLoading) && <Spinner />}
      <div className="user-list">
        <div className="user-list-header">
          <h1>{userMessages.listTitle}</h1>
          {!loading && (
            <TextField
              name="search"
              value={searchValue}
              placeholder={userMessages.searchPlaceHolder}
              onChange={({ target: { value } }) => setSearchValue(value)}
            />
          )}
        </div>
        <div className="user-list-create">
          {!loading && (
            <Button
              value={userMessages.createUser}
              onClick={handleCreateUser}
            />
          )}
        </div>
        <div className="user-list-cards">
          {searchResult.length > 0 ? (
            <>
              {sortBy(searchResult, [(user) => user.createdAt]).map((user) => {
                return userCard(user);
              })}
            </>
          ) : (
            <>
              {sortBy(listUsers, [(user) => user.createdAt]).map((user) => {
                return userCard(user);
              })}
            </>
          )}
        </div>
        <div className="user-list-actions">
          {!loading && shouldLoadMore && (
            <Button value={actionMessages.loadMore} onClick={handleLoadMore} />
          )}
        </div>
      </div>
      <Snackbar
        type={snackbar.type}
        open={snackbar.open}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
      >
        {snackbar.message}
      </Snackbar>
    </>
  );
};

UserList.defaultProps = {};

const ListUsersServerSide = () => {
  const url = new URL(window.location.href);

  const pageSize = url.searchParams.get("page")
    ? Number(url.searchParams.get("page"))
    : 1;

  const {
    data: { listUsers } = {} as Query,
    loading: listUsersLoading,
    error: listUsersError,
    networkStatus,
    fetchMore,
  } = useQuery<Query>(queryListUsers, {
    variables: {
      input: {
        pageSize: pageSize * DEFAULT_PAGE_SIZE,
        exclusiveStartKey: undefined,
      },
    },
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });

  const onLoadMore = useCallback(
    (page: number) => {
      fetchMore({
        variables: {
          input: {
            pageSize: DEFAULT_PAGE_SIZE,
            exclusiveStartKey: listUsers?.exclusiveStartKey,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (networkStatus === NetworkStatus.fetchMore || !fetchMoreResult) {
            return {} as Query;
          }

          return {
            listUsers: {
              exclusiveStartKey: fetchMoreResult.listUsers.exclusiveStartKey,
              items: [
                ...prev.listUsers.items,
                ...fetchMoreResult.listUsers.items,
              ],
            },
          } as Query;
        },
      });
    },
    [networkStatus, listUsers, fetchMore]
  );

  return (
    <UserList
      listUsers={listUsers?.items ?? []}
      exclusiveStartKey={listUsers?.exclusiveStartKey}
      shouldLoadMore={Boolean(listUsers?.exclusiveStartKey)}
      listUsersLoading={listUsersLoading}
      listUsersError={listUsersError}
      onLoadMore={onLoadMore}
    />
  );
};

export default ListUsersServerSide;

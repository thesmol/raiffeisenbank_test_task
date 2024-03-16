import { FC, FormEvent, useEffect, useState } from "react";
import FilterTable from "../components/FilterTable";
import { IFilterState, ITableFields, IUser } from "../types/types";
import UsersTable from "../components/UsersTable";
import { Alert, Card, Flex, Heading, Pagination, Spinner } from "vienna-ui";
import { useUsers } from "../hooks/useUsers";
import UserService from "../API/UserService";
import { useFetching } from "../hooks/useFetching";

const MainPage: FC = () => {
    const [filter, setFilter] = useState<IFilterState>({ sort: '', query: '' });
    const [limit, setLimit] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [users, setUsers] = useState<IUser[]>([]);

    const tableFields: ITableFields = {
        id: '№',
        name: "Имя",
        username: "Никнейм",
        email: "Почта",
        phone: "Телефон",
        address: "Адрес",
    };

    const filterFields = Object.keys(tableFields);

    const sortedAndSearchedUsers = useUsers(users, filter.sort, filter.query, filterFields);

    const [fetchUsers, isUsersLoading, usersError] = useFetching(async (limit: number, page: number) => {
        const response = await UserService.getAll(limit, page);
        setTotalCount(response.headers['x-total-count']);
        setUsers([...response.data]);
    });

    useEffect(() => {
        fetchUsers(limit, page);
    }, [limit, page]);

    const handlePageChange = (e: FormEvent | null, data: { pageIndex: number; pageSize: number; }) => {
        if (data) {
            setPage(data.pageIndex + 1);
        }
    };

    const showPagination = Math.ceil(totalCount / limit) > 1 ? true : false;


    return (
        <Flex
            flow="column"
            style={{ width: "90%" }}
            marginTop="s10"
        >
            <Heading align="center" margin="m">
                Таблица пользователей с JSONPlaceholder
            </Heading>

            <Card
                header={
                    <FilterTable
                        filter={filter}
                        setFilter={setFilter}
                        setLimit={setLimit}
                        tableFields={tableFields}
                        setPage={setPage}
                    />
                }
            >

                {usersError &&
                    <Alert compactBelow={1024} title='Ошибка!' design='error'>
                        {usersError}
                    </Alert>
                }

                {isUsersLoading
                    ?
                    <Flex center>
                        <Spinner />
                    </Flex>
                    :
                    <UsersTable
                        users={sortedAndSearchedUsers}
                        tableFields={tableFields}
                    />
                }

                {showPagination &&
                    <Pagination
                        align="center"
                        pageSize={limit}
                        totalItemsCount={totalCount}
                        onChange={handlePageChange}
                    />
                }
            </Card>

        </Flex>
    )
}

export default MainPage
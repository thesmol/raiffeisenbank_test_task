import { FC } from "react";
import { CustomTable } from "vienna-ui";
import { IUser } from '../types/types';

interface UserTableProps {
    title: string;
    users: IUser[];
    onUserClick?: () => void;
}

const UsersTable: FC<UserTableProps> = ({ users, onUserClick }) => {
    return (
        <CustomTable>
            <CustomTable.Head>
                <CustomTable.Row>
                    <CustomTable.Header>
                        №
                    </CustomTable.Header>
                    <CustomTable.Header>
                        Имя
                    </CustomTable.Header>
                    <CustomTable.Header>
                        Никнейм
                    </CustomTable.Header>
                    <CustomTable.Header>
                        Email
                    </CustomTable.Header>
                    <CustomTable.Header>
                        Адрес
                    </CustomTable.Header>
                </CustomTable.Row>
            </CustomTable.Head>
            <CustomTable.Body>
                {users.map(user => (
                    <CustomTable.Row key={user.id} onClick={onUserClick}>
                        <CustomTable.Data>
                            {user.id}
                        </CustomTable.Data>
                        <CustomTable.Data>
                            {user.name}
                        </CustomTable.Data>
                        <CustomTable.Data>
                            {user.username}
                        </CustomTable.Data>
                        <CustomTable.Data>
                            {user.email}
                        </CustomTable.Data>
                        <CustomTable.Data>
                            {`${user.address.city}, ${user.address.street}, ${user.address.suite}`}
                        </CustomTable.Data>
                    </CustomTable.Row>
                ))}
            </CustomTable.Body>
        </CustomTable>
    )
}

export default UsersTable;
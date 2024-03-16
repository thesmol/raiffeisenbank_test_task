import { FC } from "react";
import { CustomTable } from "vienna-ui";
import { IAddress, ICompany, IUser } from '../types/types';

interface UserTableProps {
    users: IUser[];
    headers?: (keyof IUser)[];
    onUserClick?: () => void;
}

/**
 * Обрабатывает сложные типы, такие как IAddress и ICompany, преобразуя их в строку.
 *
 * @param fieldValue - Значение поля, которое может быть примитивом или объектом.
 * @returns Возвращает строку, если fieldValue является объектом типа IAddress или ICompany. 
 * В противном случае возвращает исходное значение поля.
 */
const handleComplexType = (fieldValue: unknown) => {
    if (typeof fieldValue === 'object' && fieldValue !== null) {
        if ('street' in fieldValue
            && 'suite' in fieldValue
            && 'city' in fieldValue
            && 'zipcode' in fieldValue
        ) {
            const address = fieldValue as IAddress;
            return `${address.city}, ${address.street}, ${address.suite}, ${address.zipcode}`;
        }
        else if ('name' in fieldValue && 'catchPhrase' in fieldValue) {
            const company = fieldValue as ICompany;
            return `${company.name}, ${company.catchPhrase}`;
        }
    }
    return fieldValue;
}

const UsersTable: FC<UserTableProps> = ({
    users,
    headers = ['id', 'name', 'email', 'address'],
    onUserClick
}) => {
    return (
        <CustomTable>
            <CustomTable.Head>
                <CustomTable.Row>
                    {headers.map((header, index) => (
                        <CustomTable.Header key={index}>
                            {header}
                        </CustomTable.Header>
                    ))}
                </CustomTable.Row>
            </CustomTable.Head>
            <CustomTable.Body>
                {users.map(user => (
                    <CustomTable.Row key={user.id} onClick={onUserClick}>
                        {headers.map((header, index) => (
                            <CustomTable.Data key={index}>
                                {handleComplexType(user[header]) as React.ReactNode}
                            </CustomTable.Data>
                        ))}
                    </CustomTable.Row>
                ))}
            </CustomTable.Body>
        </CustomTable>
    )
}

export default UsersTable;

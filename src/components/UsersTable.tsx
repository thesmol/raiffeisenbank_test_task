import { FC, ReactNode } from "react";
import { CustomTable } from "vienna-ui";
import { IAddress, ICompany, ITableFields, IUser } from '../types/types';

interface UserTableProps {
    users: IUser[];
    tableFields: ITableFields;
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
    return fieldValue as ReactNode;
}

const UsersTable: FC<UserTableProps> = ({ users, tableFields, onUserClick }) => {
    const headers = Object.keys(tableFields);

    return (
        <CustomTable>
            <CustomTable.Head>
                <CustomTable.Row>
                    {headers.map((header, index) => (
                        <CustomTable.Header key={index}>
                            {tableFields[header]}
                        </CustomTable.Header>
                    ))}
                </CustomTable.Row>
            </CustomTable.Head>
            <CustomTable.Body>
                {users.map(user => (
                    <CustomTable.Row key={user.id} onClick={onUserClick}>
                        {headers.map((header, index) => (
                            <CustomTable.Data key={index}>
                                {handleComplexType(user[header as keyof IUser])}
                            </CustomTable.Data>
                        ))}
                    </CustomTable.Row>
                ))}
            </CustomTable.Body>
        </CustomTable>
    )
}

export default UsersTable;

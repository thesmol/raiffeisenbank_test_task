import { useMemo } from "react";
import { IAddress, IUser } from "../types/types";


/**
 * Хук для сортировки пользователей по заданному полю.
 *
 * @param users - Массив пользователей для сортировки.
 * @param sort - Поле для сортировки.
 * @returns Отсортированный массив пользователей.
 */
export const useSortedUsers = (users: IUser[], sort: string): IUser[] => {
    const sortedUsers = useMemo(() => {
        if (sort) {
            return [...users].sort((a: IUser, b: IUser) => {
                if (typeof a[sort] === 'string' && typeof b[sort] === 'string') {
                    return (a[sort] as string).localeCompare(b[sort] as string);
                }
                return 0;
            });
        }
        return users;
    }, [sort, users]);

    return sortedUsers;
}

/**
 * Фильтрует пользователей по строковым полям.
 *
 * @param user - Пользователь для фильтрации.
 * @param field - Поле для фильтрации.
 * @param query - Строка запроса для фильтрации.
 * @returns Возвращает true, если пользователь соответствует запросу, иначе false.
 */
const filterByStringField = (
    user: IUser,
    field: keyof IUser,
    query: string
) => {
    if (typeof user[field] === 'string') {
        return (user[field] as string)
            .toLowerCase()
            .includes(query.toLowerCase())
    }
    return false;
}

/**
 * Фильтрует пользователей по полям адреса.
 *
 * @param user - Пользователь для фильтрации.
 * @param field - Поле для фильтрации.
 * @param query - Строка запроса для фильтрации.
 * @returns {boolean} Возвращает true, если пользователь соответствует запросу, иначе false.
 */
const filterByAddressField = (
    user: IUser,
    field: keyof IUser,
    query: string
) => {
    if (typeof user[field] === 'object' && field === 'address') {
        const addressFields: (keyof IAddress)[] = ['street', 'city', 'suite', 'zipcode'];
        return addressFields.some(addressField => {
            return user[field][addressField]
                .toLowerCase()
                .includes(query.toLowerCase())
        });
    }
    return false;
}

/**
 * Хук для фильтрации и сортировки пользователей.
 *
 * @param users - Массив пользователей для фильтрации и сортировки.
 * @param sort - Поле для сортировки.
 * @param query - Строка запроса для фильтрации пользователей.
 * @param filterFields - Массив полей, по которым происходит поиск
 * @returns Отфильтрованный и отсортированный массив пользователей.
 */
// Вспомогательная функция для фильтрации по строковым полям
export const useUsers = (users: IUser[], sort: string, query: string, filterFields: (keyof IUser)[] = ['name']): IUser[] => {
    const sortedUsers = useSortedUsers(users, sort)
    const sortedAndSearchedUsers = useMemo(() => {
        return sortedUsers.filter(user => {
            return filterFields.some(field => {
                return filterByStringField(user, field, query) || filterByAddressField(user, field, query);
            });
        })
    }, [query, sortedUsers, filterFields]);

    return sortedAndSearchedUsers;
};

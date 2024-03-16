import axios, { AxiosResponse } from "axios";
import { IUser } from "../types/types";

/**
 * Сервис для работы с пользователями.
 */
export default class UserService {
    /**
     * Получить всех пользователей с пагинацией.
     *
     * @param limit - Количество пользователей на странице (по умолчанию 10).
     * @param page - Номер страницы (по умолчанию 1).
     * @returns Промис с ответом от сервера, содержащим массив пользователей.
     */
    static async getAll(limit: number = 10, page: number = 1): Promise<AxiosResponse<IUser[]>> {
        const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users', {
            params: {
                _limit: limit,
                _page: page
            }
        });

        return response;
    }

    /**
     * Получить пользователя по идентификатору.
     *
     * @param Идентификатор пользователя.
     * @returns Промис с ответом от сервера, содержащим информацию о пользователе.
     */
    static async getById(id: string): Promise<AxiosResponse<IUser>> {
        const response = await axios.get<IUser>('https://jsonplaceholder.typicode.com/users/' + id);

        return response;
    }
}
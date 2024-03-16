import { useState, useRef, useEffect } from "react";

/**
 * Хук для выполнения асинхронного запроса с обработкой состояния загрузки и ошибок.
 * В случае ошибки запрос будет повторяться каждые 5 секунд.
 *
 * @template T - Тип аргументов функции обратного вызова.
 * @param callback - Функция обратного вызова, которая будет выполнена.
 * @returns Возвращает функцию для выполнения запроса, состояние загрузки и ошибку.
 */
export const useFetching = <T extends unknown[]>(
    callback: (...args: T) => Promise<void>
): [(...args: T) => Promise<void>, boolean, string | null] => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const fetching = async (...args: T) => {
        try {
            setIsLoading(true);
            setError(null);
            await callback(...args);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
                if (!intervalRef.current) {
                    intervalRef.current = setInterval(() => fetching(...args), 5000);
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return [fetching, isLoading, error] as const;
};


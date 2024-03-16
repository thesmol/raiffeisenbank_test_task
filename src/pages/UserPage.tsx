import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "../types/types";
import { useFetching } from "../hooks/useFetching";
import UserService from "../API/UserService";
import { Alert, Button, Card, Flex, Groups, H5, Heading, Span, Spinner } from "vienna-ui";

interface UserPageParams {
  id: string;
  [key: string]: string | undefined;
}

const UserPage: FC = () => {
  const params = useParams<UserPageParams>();
  const [user, setUser] = useState<IUser | null>(null);
  const router = useNavigate();

  useEffect(() => {
    fetchUserByID();
  }, []);

  const [fetchUserByID, isUserLoading, userError] = useFetching(async () => {
    if (params.id) {
      const response = await UserService.getById(params.id);
      setUser(response.data);
    }
  });

  return (
    <Flex
      flow="column"
      style={{ width: "80%" }}
      marginTop="s10"
    >
      {userError &&
        <Alert compactBelow={1024} title='Ошибка!' design='error'>
          {userError}
        </Alert>
      }

      {isUserLoading
        ?
        <Flex center>
          <Spinner />
        </Flex>
        :
        <Flex center flow="column">
          <Heading align="center" margin="l">
            Страница пользователя {user?.id} - {user?.name}
          </Heading>
          <Card
            style={{ width: "50%" }}
            header={
              <Groups justifyContent='space-between' alignItems='baseline'>
                <Groups alignItems='baseline'>
                  <Card.Title>{user?.name}</Card.Title>
                  <Card.Subtitle>{user?.username}</Card.Subtitle>
                </Groups>
                <Button onClick={() => router('/users')}>Выйти</Button>
              </Groups>
            }>
            <H5 margin="s">Почта: {user?.email}</H5>
            <H5 margin="s">Телефон: {user?.phone}</H5>

            <H5 margin="s">
              Адрес
            </H5>
            <Span size="xxl">
              {`${user?.address?.city}, 
              ${user?.address?.street}, 
              ${user?.address?.suite}, 
              ${user?.address?.zipcode}`}
            </Span>

            <H5 margin="s">
              Компания
            </H5>
            <Span size="xxl">
              {`${user?.company?.name}:  
              ${user?.company?.catchPhrase}`}
            </Span>
          </Card>
        </Flex>
      }
    </Flex>
  )
}

export default UserPage;

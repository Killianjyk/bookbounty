import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from .users import UserOutPassword, UserIn, UserOut
from queries.users import UserQueries


class Auth(Authenticator):
    async def get_account_data(
        self,
        username: str,
        users: UserQueries,
    ):
        return users.get(username)

    def get_account_getter(
        self,
        users: UserQueries = Depends(),
    ):
        return users

    def get_hashed_password(self, user: UserOutPassword):
        return user.password

    def get_user_data_for_cookie(self, user: UserOut):
        return user.username, UserOut(**user.dict())


authenticator = Auth(os.environ["SIGNING_KEY"])

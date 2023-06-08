import {
  useGetFavoriteStatusQuery,
  useRemoveFavoriteStatusMutation,
  useAddFavoriteStatusMutation,
  useGetNextStatusQuery,
  useRemoveNextStatusMutation,
  useAddNextStatusMutation,
  useGetPreviousStatusQuery,
  useRemovePreviousStatusMutation,
  useAddPreviousStatusMutation,
} from "../app/listApiSlice";
import { useGetUserQuery } from "../app/authApiSlice";

const Buttons = ({ work_id }) => {
  const { data: user } = useGetUserQuery();
  const { data: favorited, refetch: favoriteRefetch } =
    useGetFavoriteStatusQuery({ username: user.username, work_id });
  const { data: queued, refetch: nextRefetch } = useGetNextStatusQuery({
    username: user.username,
    work_id,
  });
  const { data: logged, refetch: prevRefetch } = useGetPreviousStatusQuery({
    username: user.username,
    work_id,
  });
  const [favorite] = useAddFavoriteStatusMutation();
  const [unFavorite] = useRemoveFavoriteStatusMutation();
  const [addNext] = useAddNextStatusMutation();
  const [removeNext] = useRemoveNextStatusMutation();
  const [addPrevious] = useAddPreviousStatusMutation();
  const [removePrevious] = useRemovePreviousStatusMutation();
  return (
    <>
      {favorited ? (
        <button
          onClick={async (event) => {
            event.preventDefault();
            await unFavorite({ username: user.username, work_id });
            favoriteRefetch();
          }}
          className="btn"
        >
          Unfavorite
        </button>
      ) : (
        <button
          onClick={async (event) => {
            event.preventDefault();
            await favorite("/books/" + work_id);
            favoriteRefetch();
          }}
          className="btn"
        >
          Favorite
        </button>
      )}
      {queued ? (
        <button
          onClick={async (event) => {
            event.preventDefault();
            await removeNext({ username: user.username, work_id });
            nextRefetch();
          }}
          className="btn"
        >
          Remove from Next
        </button>
      ) : (
        <button
          onClick={async (event) => {
            event.preventDefault();
            await addNext("/books/" + work_id);
            nextRefetch();
          }}
          className="btn"
        >
          Read Next
        </button>
      )}
      {logged ? (
        <button
          onClick={async (event) => {
            event.preventDefault();
            await removePrevious({ username: user.username, work_id });
            prevRefetch();
          }}
          className="btn"
        >
          Mark unread
        </button>
      ) : (
        <button
          onClick={async (event) => {
            event.preventDefault();
            await addPrevious("/books/" + work_id);
            prevRefetch();
          }}
          className="btn"
        >
          Mark Read
        </button>
      )}
    </>
  );
};

export default Buttons;

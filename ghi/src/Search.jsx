import { search, reset } from "./app/SearchSlice";
import { useDispatch } from 'react-redux';
import { useState } from 'react';


const Search = ({ type }) => {
    const dispatch = useDispatch();
    const [searchCriteria, setSearchCriteria] = useState(""); //initializes as empty string
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(search(searchCriteria));
    }

    return (
        <form className="row" onSubmit={handleSubmit}>
            <div className="mb-3">
                <input className="form-control" type="text" placeholder={`Search ${type}`} value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)} />
            </div>
            <div className="text-center">
                <button className="btn btn-success" type="submit">Search</button>
                <button className="btn btn-link" type="button" onClick={() => {dispatch(reset); setSearchCriteria('');}}>Reset</button>
            </div>
        </form>
    );
};
export default Search;

//We want this search component to make it to the list.jsx that holds the list of all the books
//useDispatch: function you need if you are triggering changes (actions from SearchSlice)
//useSelector: to use state component
//When to use redux and when to use useState: When you are not passing into multiple componenets use useState. Otherwise.
//Once you submit form other components need to care about that thats why we use both redux and react here

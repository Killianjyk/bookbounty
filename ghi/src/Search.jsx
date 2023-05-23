import { useDispatch } from 'react-redux';
import { reset, search } from './app/SearchSlice';
import { useState } from 'react';


const Search = () => {
    const dispatch = useDispatch();
    const [searchCriteria, setSearchCriteria] = useState(''); //initializes as empty string
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(search(searchCriteria));
    }

    return (
        <form className="row" onSubmit={handleSubmit}>
        <div className="col">
            <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Search books"
                value={searchCriteria}
                onChange={(e) => setSearchCriteria(e.target.value)}
            />
        </div>
        <div className="col">
            <button className="btn btn-lg btn-success"
            type="submit">
            Search
            </button>
            <button
                className="btn btn-lg btn-link"
                type="button"
                onClick={() => {
                    dispatch(reset)
                    setSearchCriteria('')
                }}>
                Reset
            </button>
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

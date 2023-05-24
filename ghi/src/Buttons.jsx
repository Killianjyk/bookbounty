

const Button = () => {
    const favorite = (event) =>{
        event.preventDefault()
    }
    const next = (event) =>{
        event.preventDefault()
    }
    const previous = (event) =>{
        event.preventDefault()
    }
    return (<>
        <button onClick={favorite} className="btn">Favorite</button>
        <button onClick={next} className="btn">Read Next</button>
        <button onClick={previous} className="btn">Previously Read</button>
    </>);
}
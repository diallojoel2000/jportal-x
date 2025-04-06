
const Card =({title, children, size=6})=>{
    return <>
        <div className={`col-md-${size}`}>
            <div className="card card-primary card-outline mb-4">
                <div className="card-header">
                    <div className="card-title">{title}</div>
                </div>
                <div className="card-body">
                {children}
                </div>
            </div>
        </div>
    </>
}

export default Card;
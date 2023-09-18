
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light Fgreen shadow-lg">

            <img src='/kushman.png' alt='weed leaf' className=' col-md-1 mx-auto d-block mw-100' />
            <a className="navbar-brand Lgreen d-inline-flex fs-1 pacifico" href="/home">Kush Kourier</a>

            <button className="navbar-toggler ps-sm-2" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-form ml-auto">
                <form className="d-flex my-2 my-lg-0 ">
                    <div className="input-group">
                        <input className="form-control rounded" type="text" placeholder="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-light my-2 my-sm-0 text-light me-sm-2 ms-sm-1" type="submit">
                                <img src={'/search.svg'} width='20' height={20} alt="Search Icon" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Services</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar
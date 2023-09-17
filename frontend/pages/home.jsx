import { useEffect } from 'react';


const Home = () => {
    useEffect(() => {

        import('../node_modules/bootstrap/dist/js/bootstrap.bundle')
            .catch(err => console.error('Error importing Bootstrap', err));
    }, []);




    return (

        <>
            <link rel="stylesheet" href="/main.css"></link>

            <nav className="navbar navbar-expand-lg navbar-light Fgreen shadow-lg">

                <img src='/kushman.png' alt='weed leaf' className=' col-md-1 mx-auto d-block mw-100' />
                <a className="navbar-brand Lgreen d-inline-flex fs-1" href="/home">Kush Kourier</a>

                <button className="navbar-toggler ps-sm-2" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-form ml-auto">
                    <form className="d-flex my-2 my-lg-0 ">
                        <div className="input-group">
                            <input className="form-control " type="text" placeholder="Search" />
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
            <div className="container mt-5 w-25 h-25">
                <div className="justify-content-center">
                    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img class="d-block w-100" src="https://i.ibb.co/CwsqWsZ/raern.png" alt="First slide" />
                            </div>
                            <div class="carousel-item">
                                <img class="d-block w-100" src="https://i.ibb.co/CwsqWsZ/raern.png" alt="Second slide" />
                            </div>
                            <div class="carousel-item">
                                <img class="d-block w-100" src="https://i.ibb.co/CwsqWsZ/raern.png" alt="Third slide" />
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon Fgreen" aria-hidden="true"></span>
                            <span class="sr-only"></span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span class="carousel-control-next-icon Fgreen" aria-hidden="true"></span>
                            <span class="sr-only"></span>
                        </a>
                    </div>
                </div>

            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="d-flex justify-content-center">
                        <h1>Shop by category</h1>

                    </div>
                    <div className="col-md-6">
                        <img src="https://via.placeholder.com/400" alt="Placeholder Image" className="img-fluid" />
                    </div>
                </div>
            </div>

            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        </>
    );
};

export default Home;
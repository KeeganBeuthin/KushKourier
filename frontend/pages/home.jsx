import { useEffect } from 'react';
import ('../node_modules/bootstrap/dist/css/bootstrap.min.css');
import('../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');

const Home = () => {
    useEffect(() => {
      
      import('../node_modules/bootstrap/dist/js/bootstrap.bundle')
        .catch(err => console.error('Error importing Bootstrap', err));
    }, []);
  
    return (
        
<>


<nav className="navbar navbar-expand-lg navbar-light bg-light">

    <img src='/kushman.png' alt='weed leaf' height={150} width={200} className='d-inline-flex '/>
    <a className="navbar-brand text-success d-inline-flex fs-2" href="#">Kush Kourier</a>

    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
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

<div className="container mt-5">
    <div className="row">
        <div className="col-md-6">
            <h1>Welcome to My Website</h1>
            <p>default</p>
            <a href="#" className="btn btn-primary">Learn More</a>
        </div>
        <div className="col-md-6">
            <img src="https://via.placeholder.com/400" alt="Placeholder Image" className="img-fluid"/>
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
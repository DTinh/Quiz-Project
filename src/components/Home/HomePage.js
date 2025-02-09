import videoHomepage from '../../assets/video.mp4'

const HomePage = (props) => {
    return(
    <div className="homepage-container">
        <video autoPlay muted loop width="500" height="400" >
            <source src={videoHomepage} type="video/mp4"/>
        </video>
        <div className='homepage-content'>
            <div className='title-1'>Get to know your customers with forms worth filling out</div>
            <div className='title-2'>Collect all the data you need to <b>understand customers</b> with forms designed to be refreshingly different.</div>
            <div>
                <button>Get's start. It's free</button>
            </div>
        </div>
    </div>
    )
}
export default HomePage;
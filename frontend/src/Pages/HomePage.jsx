import mainAbout from '../images/about2.png'

const HomePage = () => {
    return (
        <div className="homePage_about">
            <div className="about_content">
                <div className="img_container">
                    <img src={mainAbout} alt="" />
                </div>
                <div className="desc">
                <b>Flesh Loan Dapp</b><br></br>
Flash loans platform for DeFi markets on Ethereum and tokens. Start your first step here
                </div>
            </div>
        </div>
    )
}

export default HomePage
import Xlogo from "../../assets/Xlogo.svg";
import instaLogo from "../../assets/instaLogo.svg";
import youtubelogo from "../../assets/youtubelogo.svg";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-700 via-gray-900 to-gray-950 py-20">
      <div className="container mx-auto flex justify-between items-start">
        
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl text-white font-medium mb-4">Cracked Devs Academy</h2>
          <p className="text-white text-lg leading-relaxed max-w-prose ">
            CrackedDevsAcademy is an initiative by Codewickk to mentor aspiring developers in mastering the art of programming. At CrackedDevsAcademy, we believe you’re either an average developer or a cracked one — capable of solving the toughest coding challenges and standing out in the tech world. There’s no middle ground;  
          </p>
        </div>

        <div className="flex flex-col items-start">
          <h3 className="text-white text-xl mb-4">Get in Touch</h3>
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={Xlogo} alt="Twitter logo" className="h-8 w-8" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={instaLogo} alt="Instagram logo" className="h-8 w-8" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <img src={youtubelogo} alt="YouTube logo" className="h-8 w-8" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;


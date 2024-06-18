
import logo from '../logo-softline.svg';

/**
 * Adds a basic header to the website with the Softline Logo and the software name "InSight"
 * 
 * @author [Anna Liepelt] https://gitlab.dit.htwk-leipzig.de/anna.liepelt
 */
function Header() {
    return (
      <>
        <header className="sticky fixed top-0 left-0 w-full bg-white shadow-md flex items-center justify-between p-4 z-10">
            <div className="flex items-center">
                <img id="softline-logo" src={logo} alt="Softline Logo" className="mr-3 h-6 sm:h-9" />
                <h1 className="text-xl font-bold">InSight</h1>
            </div>
        </header>
      </>
    )
  }

export default Header;

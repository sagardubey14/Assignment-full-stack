

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-900 to-purple-900 text-white py-8">
      <div className="container mx-auto flex justify-center items-center">
        <div className="grid grid-cols-1 gap-4 text-center">
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          {/* Add more sections if needed */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;

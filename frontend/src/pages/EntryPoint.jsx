//My imports
import "../styles/EntryPoint/EntryPoint.css";
import QRSafeBackground from '../components/QRSafeBackground';

//The main entry point which defines the entire app itself
const EntryPoint = () => {
	return (
		<div className="entry-point-container">
			<div className="entry-point-container-background">
				<QRSafeBackground />
			</div>
			
      <div className="entry-point-container-content">
        <h1>Welcome to QR-Safe</h1>
      </div>
    </div>
	);
}

export default EntryPoint;
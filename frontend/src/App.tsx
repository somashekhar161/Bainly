// Define the main App component

import Button from "./components/Button";
import Card from "./components/Card";
import PlusIcon from "./icons/PlusIcon";
import ShareIcon from "./icons/ShareIcon";

function App() {
  // Return a div element with a class name of "h-96 p-1 py-2" and the text "App"
  return (
    <div className="">
      <div className="flex justify-end gap-4 p-2">
        <Button startIcon={<PlusIcon />} text="Add content" variant="primary" />
        <Button
          startIcon={<ShareIcon />}
          text="Share brain"
          variant="secondary"
        />
      </div>
      <div className="flex gap-2">
        <Card
          link="https://x.com/worldcoin/status/1891409532787535988"
          title="about world coin"
          type="twitter"
        />
        <Card
          link="https://youtu.be/XRazptXFb0c?si=tzv1I4HRAIZQc8RF"
          title="NMS"
          type="youtube"
        />
      </div>
    </div>
  );
}

// Export the App component as the default export
export default App;

// "use client"; // not needed here bc it is in the child <todo> element!

// Import the ToDo Component
import ToDo from "./components/ToDo";

import "./../app/app.css";



export default function App() {
  

  return (
    <main>
      
      {/* Call the ToDo Componenet */}
      <ToDo />
    </main>
  );
}

import React, { useState } from 'react';
import { Configuration, DefaultApi } from './generated/client-ts-axios';

const config = new Configuration({
  basePath: 'http://localhost:8080',  // Set the base URL to the running server
});
const api = new DefaultApi(config);

const App: React.FC = () => {
  const [name, setName] = useState<string>("Linux User 🐧");
  const [greeting, setGreeting] = useState<string>("");
  const [events, setEvents] = useState<Array<any>>([]);
  const [eventsLoaded, setEventsLoaded] = useState<boolean>(false);
  const [feedbackName, setFeedbackName] = useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [feedbackResponse, setFeedbackResponse] = useState<string>("");

  // Function to handle form submission for greeting
  const handleGreetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await api.getGreeting(name); // Call the /greet endpoint
      setGreeting(result.data.message ?? 'ERROR'); // Set the response message
    } catch (error) {
      console.error('Error fetching greeting:', error);
    }
  };

  // Function to handle fetching events when the button is clicked
  const handleFetchEvents = async () => {
    try {
      const result = await api.getEvents(); // Call the /events endpoint
      setEvents(result.data); // Set the list of events
      setEventsLoaded(true);  // Mark events as loaded
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Function to handle feedback submission
  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const feedback = {
        name: feedbackName,
        message: feedbackMessage,
      };
      const result = await api.postFeedback(feedback); // Call the /feedback endpoint
      setFeedbackResponse(result.data.status ?? 'ERROR');
      setFeedbackName(""); // Clear the name input
      setFeedbackMessage(""); // Clear the feedback message input
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setFeedbackResponse("Failed to submit feedback.");
    }
  };

  return (
    <div>
      <h1>Welcome to LinuxDay!</h1>

      {/* Form to submit a name and get a personalized greeting */}
      <form onSubmit={handleGreetSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          defaultValue= "🐧LinuxUser🐧"
        />
        <button type="submit">Get Greeting</button>
      </form>

      {/* Display the personalized greeting */}
      {greeting && <p>{greeting}</p>}

      <h2>Upcoming Linux Day Events</h2>

      {/* Button to fetch the events */}
      <button onClick={handleFetchEvents}>Get Events</button>

      {/* List the events returned by the /events endpoint */}
      {eventsLoaded ? (
        <ul>
          {events.length > 0 ? (
            events.map((event) => (
              <li key={event.id}>
                <h3>{event.name}</h3>
                <p>Date: {event.date}</p>
                <p>Location: {event.location}</p>
                <p>{event.description}</p>
              </li>
            ))
          ) : (
            <p>No events available</p>
          )}
        </ul>
      ) : (
        <p>Click "Get Events" to load the list of events.</p>
      )}

      <h2>Submit Your Feedback</h2>
      {/* Form to submit feedback */}
      <form onSubmit={handleFeedbackSubmit}>
        <input
          type="text"
          value={feedbackName}
          onChange={(e) => setFeedbackName(e.target.value)}
          placeholder="Your Name"
          required
        />
        <br></br>
        <br></br>
        <textarea
          value={feedbackMessage}
          onChange={(e) => setFeedbackMessage(e.target.value)}
          placeholder="Your feedback here..."
          maxLength={500}
          required
        />
        <button type="submit">Submit Feedback</button>
      </form>

      {/* Display feedback response message */}
      {feedbackResponse && <p>{feedbackResponse}</p>}
    </div>
  );
};

export default App;

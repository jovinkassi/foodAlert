import React from 'react';

const Notifications = ({ notifications }) => {
  return (
    <div className="p-4 bg-yellow-100 border border-yellow-300 rounded">
      <h3 className="font-bold mb-2">Notifications</h3>
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <ul className="list-disc ml-5">
          {notifications.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
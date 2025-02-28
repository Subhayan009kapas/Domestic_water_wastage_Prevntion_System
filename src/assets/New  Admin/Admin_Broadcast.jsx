import { useState } from 'react';
import './Admin_Broadcast.css';

const Admin_Broadcast = () => {
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('📢');

  const predefinedMessages = [
    {
      purpose: 'Payment Reminder',
      message: 'Friendly reminder: Your water bill payment is due in 3 days. Please ensure timely payment to avoid service disruption.',
      icon: '💳'
    },
    {
      purpose: 'Usage Alert',
      message: 'Alert: Your water consumption has exceeded 80% of monthly limit. Please conserve water to avoid penalties.',
      icon: '🚨'
    },
    {
      purpose: 'Maintenance Notice',
      message: 'Scheduled maintenance on 25th March 10PM-2AM. Water supply may be intermittent during this period.',
      icon: '🔧'
    },
    {
      purpose: 'Service Update',
      message: 'New feature: Track real-time water usage in your dashboard. Update your app to latest version!',
      icon: '🆕'
    }
  ];

  const handlePurposeChange = (e) => {
    const purpose = e.target.value;
    setSelectedPurpose(purpose);
    const selected = predefinedMessages.find(msg => msg.purpose === purpose);
    if (selected) {
      setCustomMessage(selected.message);
      setSelectedIcon(selected.icon);
    }
  };

  const handleSendMessage = () => {
    if (!selectedPurpose) return;
    
    const messageData = {
      purpose: selectedPurpose,
      message: customMessage,
      icon: selectedIcon,
      timestamp: new Date().toISOString()
    };

    // Add API call here
    console.log('Sending message:', messageData);
    alert('Message sent successfully!');
    
    // Reset form
    setSelectedPurpose('');
    setCustomMessage('');
    setSelectedIcon('📢');
  };

  return (
    <div className="broadcast-container">
      <h1 className="broadcast-title">User Notifications</h1>
      
      <div className="broadcast-card">
        <div className="form-group">
          <label>Select Purpose</label>
          <select
            className="purpose-select"
            value={selectedPurpose}
            onChange={handlePurposeChange}
          >
            <option value="">Choose notification purpose</option>
            {predefinedMessages.map((msg, index) => (
              <option key={index} value={msg.purpose}>
                {msg.icon} {msg.purpose}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Message Content</label>
          <div className="message-box">
            <div className="message-header">
              <span className="message-icon">{selectedIcon}</span>
              <input
                type="text"
                className="icon-input"
                value={selectedIcon}
                onChange={(e) => setSelectedIcon(e.target.value)}
                maxLength="2"
              />
            </div>
            <textarea
              className="message-input"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Compose your message..."
              rows="5"
            />
          </div>
        </div>

        <button
          className="send-button"
          onClick={handleSendMessage}
          disabled={!selectedPurpose}
        >
          📤 Send Notification
        </button>
      </div>
    </div>
  );
};

export default Admin_Broadcast;




